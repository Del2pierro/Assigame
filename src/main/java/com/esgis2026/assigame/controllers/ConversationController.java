package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.ConversationRequest;
import com.esgis2026.assigame.dto.ConversationResponse;
import com.esgis2026.assigame.entities.Conversation;
import com.esgis2026.assigame.exceptions.ForbiddenException;
import com.esgis2026.assigame.mappers.ConversationMapper;
import com.esgis2026.assigame.services.ConversationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;
    private final ConversationMapper conversationMapper;

    public ConversationController(ConversationService conversationService, ConversationMapper conversationMapper) {
        this.conversationService = conversationService;
        this.conversationMapper = conversationMapper;
    }

    @PostMapping
    public ResponseEntity<ConversationResponse> getOrCreateConversation(@Valid @RequestBody ConversationRequest request) {
        Conversation conversation = conversationService.getOrCreateConversation(
                request.getBuyerId(),
                request.getSellerId(),
                request.getProductId()
        );
        return ResponseEntity.ok(conversationMapper.toResponse(conversation));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ConversationResponse>> getConversationsBySeller(
            @PathVariable Long sellerId,
            @RequestHeader(value = "X-User-Id", required = false) Long requestorUserId) {
        
        if (requestorUserId == null || !requestorUserId.equals(sellerId)) {
            throw new ForbiddenException("Accès refusé. Vous ne pouvez consulter que vos propres conversations.");
        }
        
        List<Conversation> conversations = conversationService.getConversationsBySeller(sellerId);
        List<ConversationResponse> responses = conversations.stream()
                .map(conversationMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
}

