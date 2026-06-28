package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.Conversation;
import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.exceptions.ForbiddenException;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import com.esgis2026.assigame.repositories.ConversationRepository;
import com.esgis2026.assigame.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for conversation management business logic.
 * <p>
 * Handles conversation creation, retrieval, and secure access to conversations
 * between buyers and sellers for specific products.
 * Conversations are unique per buyer-seller-product triplet.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Service
@Transactional
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UtilisateurService utilisateurService;
    private final ProduitService produitService;

    /**
     * Constructor for dependency injection.
     * 
     * @param conversationRepository Repository for conversation data access
     * @param utilisateurService Service for user business logic
     * @param produitService Service for product business logic
     */
    public ConversationService(ConversationRepository conversationRepository,
                               UtilisateurService utilisateurService,
                               ProduitService produitService) {
        this.conversationRepository = conversationRepository;
        this.utilisateurService = utilisateurService;
        this.produitService = produitService;
    }

    /**
     * Retrieves an existing conversation or creates a new one if it doesn't exist.
     * <p>
     * A conversation is unique per the triplet (buyerId, sellerId, productId).
     * If a conversation with these parameters exists, it is returned.
     * Otherwise, a new conversation is created.
     * </p>
     * 
     * @param buyerId The unique identifier of the buyer (can be guest ID or user ID)
     * @param sellerId The seller (user) ID
     * @param productId The product ID
     * @return The existing or newly created conversation
     */
    public Conversation getOrCreateConversation(String buyerId, Long sellerId, Long productId) {
        return conversationRepository.findByBuyerIdAndSellerIdUtilisateurAndProductIdProduit(buyerId, sellerId, productId)
                .orElseGet(() -> {
                    Utilisateur seller = utilisateurService.getUtilisateurById(sellerId);
                    Produit product = produitService.getProduitById(productId);

                    Conversation conversation = new Conversation();
                    conversation.setBuyerId(buyerId);
                    conversation.setSeller(seller);
                    conversation.setProduct(product);
                    return conversationRepository.save(conversation);
                });
    }

    /**
     * Retrieves all conversations associated with a seller.
     * <p>
     * Validates that the current authenticated user is the seller.
     * Only the seller can access their own conversations.
     * </p>
     * 
     * @param sellerId The seller (user) ID
     * @return List of conversations associated with the seller
     * @throws ForbiddenException if current user is not the seller
     */
    @Transactional(readOnly = true)
    public List<Conversation> getConversationsBySeller(Long sellerId) {
        utilisateurService.getUtilisateurById(sellerId);
        
        // Ownership validation: only the seller can access their conversations
        Long currentUserId = SecurityUtils.getCurrentUserId();
        if (currentUserId == null || !currentUserId.equals(sellerId)) {
            throw new ForbiddenException("Accès refusé. Vous ne pouvez consulter que vos propres conversations.");
        }
        
        return conversationRepository.findBySellerIdUtilisateur(sellerId);
    }

    /**
     * Retrieves a conversation by its unique ID.
     * 
     * @param id The conversation ID
     * @return The conversation entity
     * @throws ResourceNotFoundException if conversation is not found
     */
    @Transactional(readOnly = true)
    public Conversation getConversationById(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation non trouvée avec l'ID : " + id));
    }
}

