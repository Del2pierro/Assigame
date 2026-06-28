package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.MessageRequest;
import com.esgis2026.assigame.dto.MessageResponse;
import com.esgis2026.assigame.services.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for message management operations.
 * <p>
 * Handles message sending and retrieval. Messages are broadcast in real-time
 * via WebSocket STOMP to subscribed participants.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Constructor for dependency injection.
     * 
     * @param messageService Service for message business logic
     * @param messagingTemplate Template for WebSocket message broadcasting
     */
    public MessageController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Sends a message to a conversation.
     * <p>
     * Requires authentication. The message is saved to the database and
     * broadcast in real-time via WebSocket to all participants subscribed
     * to the conversation topic.
     * </p>
     * 
     * @param request The message request containing conversation ID, sender info, and content
     * @return ResponseEntity containing the sent message information
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody MessageRequest request) {
        MessageResponse response = messageService.saveMessage(request);
        // Diffusion temps réel via WebSocket STOMP
        messagingTemplate.convertAndSend("/topic/conversation/" + response.getConversationId(), response);
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves messages for a specific conversation.
     * <p>
     * Requires authentication. Supports pagination via query parameters.
     * If page parameter is provided, returns paginated results.
     * Otherwise, returns all messages for the conversation.
     * </p>
     * 
     * @param conversationId The conversation ID
     * @param page Optional page number for pagination
     * @param size Page size (default: 20)
     * @return ResponseEntity containing message list (paginated or full)
     */
    @GetMapping("/{conversationId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getMessages(
            @PathVariable Long conversationId,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "20") Integer size) {
        
        if (page != null) {
            return ResponseEntity.ok(messageService.getMessagesPaginated(conversationId, page, size));
        }
        return ResponseEntity.ok(messageService.getMessages(conversationId));
    }
}
