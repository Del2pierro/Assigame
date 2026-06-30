package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.MessageRequest;
import com.esgis2026.assigame.dto.MessageResponse;
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
        // Permettre aux guest users d'envoyer des messages
        // La validation est faite au niveau du service via validateSenderParticipant
        
        // Enregistrement du message
        MessageResponse response = messageService.saveMessage(request);
        
        // Diffusion en temps réel à la conversation
        messagingTemplate.convertAndSend("/topic/conversation/" + response.getConversationId(), response);
    }
}
