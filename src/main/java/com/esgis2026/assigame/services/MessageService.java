package com.esgis2026.assigame.services;

import com.esgis2026.assigame.dto.MessageRequest;
import com.esgis2026.assigame.dto.MessageResponse;
import com.esgis2026.assigame.entities.Conversation;
import com.esgis2026.assigame.entities.Message;
import com.esgis2026.assigame.entities.SenderType;
import com.esgis2026.assigame.exceptions.ForbiddenException;
import com.esgis2026.assigame.mappers.MessageMapper;
import com.esgis2026.assigame.repositories.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service de gestion des messages échangés au sein des conversations de la marketplace.
 * Assure la persistence des messages et valide la sécurité d'accès des participants (acheteur et vendeur).
 */
@Service
@Transactional
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final MessageMapper messageMapper;

    public MessageService(MessageRepository messageRepository, ConversationService conversationService, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
        this.messageMapper = messageMapper;
    }

    /**
     * Enregistre un nouveau message dans une conversation après avoir validé
     * que l'expéditeur est bien l'un des participants autorisés.
     *
     * @param request Le DTO contenant les informations du message à sauvegarder
     * @return Le message sauvegardé transformé en DTO de réponse
     * @throws ForbiddenException Si l'expéditeur ne fait pas partie de la conversation
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
     * Récupère la liste complète des messages d'une conversation (ordre chronologique).
     *
     * @param conversationId Identifiant de la conversation
     * @param requestorGuestId Identifiant d'acheteur du demandeur (si c'est un acheteur)
     * @param requestorUserId Identifiant d'utilisateur du demandeur (si c'est un vendeur)
     * @return Liste de messages sous forme de DTO
     * @throws ForbiddenException Si le demandeur ne participe pas à la conversation
     */
    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(Long conversationId, String requestorGuestId, Long requestorUserId) {
        Conversation conversation = conversationService.getConversationById(conversationId);

        // Logique business critique: seuls les participants peuvent accéder aux messages
        validateAccess(conversation, requestorGuestId, requestorUserId);

        List<Message> messages = messageRepository.findByConversationIdConversationOrderByDateEnvoiAsc(conversationId);
        return messages.stream()
                .map(messageMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Récupère de façon paginée les messages d'une conversation (ordre chronologique inverse).
     *
     * @param conversationId Identifiant de la conversation
     * @param requestorGuestId Identifiant d'acheteur du demandeur (si c'est un acheteur)
     * @param requestorUserId Identifiant d'utilisateur du demandeur (si c'est un vendeur)
     * @param page Index de la page demandée
     * @param size Nombre d'éléments par page
     * @return Page de messages sous forme de DTO
     * @throws ForbiddenException Si le demandeur ne participe pas à la conversation
     */
    @Transactional(readOnly = true)
    public Page<MessageResponse> getMessagesPaginated(Long conversationId, String requestorGuestId, Long requestorUserId, int page, int size) {
        Conversation conversation = conversationService.getConversationById(conversationId);

        // Logique business critique: seuls les participants peuvent accéder aux messages
        validateAccess(conversation, requestorGuestId, requestorUserId);

        Pageable pageable = PageRequest.of(page, size);
        Page<Message> messagePage = messageRepository.findByConversationIdConversationOrderByDateEnvoiDesc(conversationId, pageable);
        return messagePage.map(messageMapper::toResponse);
    }

    /**
     * Vérifie si l'utilisateur demandeur a le droit d'accéder à la conversation.
     */
    private void validateAccess(Conversation conversation, String requestorGuestId, Long requestorUserId) {
        boolean isBuyer = requestorGuestId != null && requestorGuestId.equals(conversation.getBuyerId());
        boolean isSeller = requestorUserId != null && requestorUserId.equals(conversation.getSeller().getIdUtilisateur());

        if (!isBuyer && !isSeller) {
            throw new ForbiddenException("Accès refusé. Vous ne faites pas partie de cette conversation.");
        }
    }

    /**
     * Vérifie si l'expéditeur déclaré correspond bien à l'acheteur ou au vendeur de la conversation.
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


