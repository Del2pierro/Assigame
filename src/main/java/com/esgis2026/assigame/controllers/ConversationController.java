package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.ConversationRequest;
import com.esgis2026.assigame.dto.ConversationResponse;
import com.esgis2026.assigame.entities.Conversation;
import com.esgis2026.assigame.mappers.ConversationMapper;
import com.esgis2026.assigame.services.ConversationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for conversation management operations.
 * <p>
 * Handles conversation creation/retrieval and seller conversation listing.
 * Conversations are unique per buyer-seller-product triplet.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/conversations")
@Transactional
public class ConversationController {

    private final ConversationService conversationService;
    private final ConversationMapper conversationMapper;

    /**
     * Constructor for dependency injection.
     * 
     * @param conversationService Service for conversation business logic
     * @param conversationMapper Mapper for converting conversation entities to DTOs
     */
    public ConversationController(ConversationService conversationService, ConversationMapper conversationMapper) {
        this.conversationService = conversationService;
        this.conversationMapper = conversationMapper;
    }

    /**
     * Retrieves an existing conversation or creates a new one.
     * <p>
     * Requires authentication. If a conversation already exists for the
     * buyer-seller-product triplet, it is returned. Otherwise, a new one is created.
     * </p>
     * 
     * @param request The conversation request containing buyer, seller, and product IDs
     * @return ResponseEntity containing the conversation information
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ConversationResponse> getOrCreateConversation(@Valid @RequestBody ConversationRequest request) {
        Conversation conversation = conversationService.getOrCreateConversation(
                request.getBuyerId(),
                request.getSellerId(),
                request.getProductId()
        );
        return ResponseEntity.ok(conversationMapper.toResponse(conversation));
    }

    /**
     * Retrieves all conversations for a specific seller.
     * <p>
     * Requires authentication. Returns all conversations where the specified
     * user is the seller. The X-User-Id header must match the sellerId.
     * </p>
     * 
     * @param sellerId The seller ID
     * @return ResponseEntity containing list of seller's conversations
     */
    @GetMapping("/seller/{sellerId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ConversationResponse>> getConversationsBySeller(
            @PathVariable Long sellerId) {
        
        List<Conversation> conversations = conversationService.getConversationsBySeller(sellerId);
        List<ConversationResponse> responses = conversations.stream()
                .map(conversationMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
}

