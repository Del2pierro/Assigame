package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.MessageRequest;
import com.esgis2026.assigame.dto.MessageResponse;
import com.esgis2026.assigame.services.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody MessageRequest request) {
        MessageResponse response = messageService.saveMessage(request);
        // Diffusion temps réel via WebSocket STOMP
        messagingTemplate.convertAndSend("/topic/conversation/" + response.getConversationId(), response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<?> getMessages(
            @PathVariable Long conversationId,
            @RequestHeader(value = "X-Guest-Id", required = false) String guestId,
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "20") Integer size) {
        
        if (page != null) {
            return ResponseEntity.ok(messageService.getMessagesPaginated(conversationId, guestId, userId, page, size));
        }
        return ResponseEntity.ok(messageService.getMessages(conversationId, guestId, userId));
    }
}
