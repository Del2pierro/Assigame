package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.MessageRequest;
import com.esgis2026.assigame.dto.MessageResponse;
import com.esgis2026.assigame.exceptions.UnauthorizedException;
import com.esgis2026.assigame.security.SecurityUtils;
import com.esgis2026.assigame.services.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatWebSocketController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.send")
    public void send(MessageRequest request) {
        // Security validation: user must be authenticated
        if (!SecurityUtils.isAuthenticated()) {
            throw new UnauthorizedException("Authentication required to send messages");
        }
        
        // Enregistrement du message
        MessageResponse response = messageService.saveMessage(request);
        
        // Diffusion en temps réel à la conversation
        messagingTemplate.convertAndSend("/topic/conversation/" + response.getConversationId(), response);
    }
}
