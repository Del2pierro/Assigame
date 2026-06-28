package com.esgis2026.assigame.services;

import com.esgis2026.assigame.dto.MessageRequest;
import com.esgis2026.assigame.dto.MessageResponse;
import com.esgis2026.assigame.entities.Conversation;
import com.esgis2026.assigame.entities.Message;
import com.esgis2026.assigame.entities.SenderType;
import com.esgis2026.assigame.exceptions.ForbiddenException;
import com.esgis2026.assigame.mappers.MessageMapper;
import com.esgis2026.assigame.repositories.MessageRepository;
import com.esgis2026.assigame.security.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for message management business logic.
 * <p>
 * Handles message persistence and validates access security for conversation participants (buyers and sellers).
 * Messages are exchanged within conversations between buyers and sellers.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Service
@Transactional
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final MessageMapper messageMapper;

    /**
     * Constructor for dependency injection.
     * 
     * @param messageRepository Repository for message data access
     * @param conversationService Service for conversation business logic
     * @param messageMapper Mapper for converting message entities to DTOs
     */
    public MessageService(MessageRepository messageRepository, ConversationService conversationService, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
        this.messageMapper = messageMapper;
    }

    /**
     * Saves a new message in a conversation after validating that the sender
     * is one of the authorized participants.
     * 
     * @param request The DTO containing the message information to save
     * @return The saved message converted to response DTO
     * @throws ForbiddenException if the sender is not a conversation participant
     */
    public MessageResponse saveMessage(MessageRequest request) {
        Conversation conversation = conversationService.getConversationById(request.getConversationId());

        // Logique business critique: valider que l'expéditeur fait partie de la conversation
        validateSenderParticipant(conversation, request.getSenderType(), request.getSenderId());

        Message message = new Message();
        message.setConversation(conversation);
        message.setSenderType(request.getSenderType());
        message.setSenderId(request.getSenderId());
        message.setContenu(request.getContent());

        Message saved = messageRepository.save(message);
        return messageMapper.toResponse(saved);
    }

    /**
     * Retrieves the complete list of messages for a conversation (chronological order).
     * 
     * @param conversationId The conversation ID
     * @return List of messages as DTOs
     * @throws ForbiddenException if the requester is not a conversation participant
     */
    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(Long conversationId) {
        Conversation conversation = conversationService.getConversationById(conversationId);

        // Logique business critique: seuls les participants peuvent accéder aux messages
        validateAccess(conversation);

        List<Message> messages = messageRepository.findByConversationIdConversationOrderByDateEnvoiAsc(conversationId);
        return messages.stream()
                .map(messageMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves messages for a conversation in a paginated format (reverse chronological order).
     * 
     * @param conversationId The conversation ID
     * @param page The requested page index
     * @param size The number of elements per page
     * @return Page of messages as DTOs
     * @throws ForbiddenException if the requester is not a conversation participant
     */
    @Transactional(readOnly = true)
    public Page<MessageResponse> getMessagesPaginated(Long conversationId, int page, int size) {
        Conversation conversation = conversationService.getConversationById(conversationId);

        // Logique business critique: seuls les participants peuvent accéder aux messages
        validateAccess(conversation);

        Pageable pageable = PageRequest.of(page, size);
        Page<Message> messagePage = messageRepository.findByConversationIdConversationOrderByDateEnvoiDesc(conversationId, pageable);
        return messagePage.map(messageMapper::toResponse);
    }

    /**
     * Validates whether the requesting user has the right to access the conversation.
     * Uses SecurityContextHolder to retrieve the authenticated user.
     * 
     * @param conversation The conversation to validate access for
     * @throws ForbiddenException if the user is not the seller of the conversation
     */
    private void validateAccess(Conversation conversation) {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        
        // Vérifier si l'utilisateur est le vendeur de la conversation
        boolean isSeller = currentUserId != null && currentUserId.equals(conversation.getSeller().getIdUtilisateur());
        
        // Note: La logique guest/acheteur est désactivée en faveur de l'authentification JWT
        // Si nécessaire, cette logique peut être étendue pour gérer les acheteurs authentifiés
        
        if (!isSeller) {
            throw new ForbiddenException("Accès refusé. Vous ne faites pas partie de cette conversation.");
        }
    }

    /**
     * Validates whether the declared sender corresponds to the buyer or seller of the conversation.
     * 
     * @param conversation The conversation entity
     * @param senderType The type of sender (BUYER or SELLER)
     * @param senderId The sender identifier
     * @throws ForbiddenException if the sender ID does not match the conversation
     */
    private void validateSenderParticipant(Conversation conversation, SenderType senderType, String senderId) {
        if (senderType == SenderType.BUYER) {
            if (!senderId.equals(conversation.getBuyerId())) {
                throw new ForbiddenException("L'identifiant de l'acheteur ne correspond pas à la conversation.");
            }
        } else if (senderType == SenderType.SELLER) {
            try {
                Long userId = Long.valueOf(senderId);
                if (!userId.equals(conversation.getSeller().getIdUtilisateur())) {
                    throw new ForbiddenException("L'identifiant du vendeur ne correspond pas à la conversation.");
                }
            } catch (NumberFormatException e) {
                throw new ForbiddenException("Identifiant de vendeur invalide.");
            }
        }
    }
}


