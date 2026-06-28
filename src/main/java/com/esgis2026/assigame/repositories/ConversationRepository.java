package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for conversation data access.
 * <p>
 * Provides methods for querying conversation data including finding conversations
 * by buyer-seller-product triplet and by seller.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    
    /**
     * Finds a conversation by the unique triplet of buyer ID, seller ID, and product ID.
     * Conversations are unique per this triplet.
     * 
     * @param buyerId The buyer identifier
     * @param idUtilisateur The seller (user) ID
     * @param idProduit The product ID
     * @return Optional containing the conversation if found
     */
    Optional<Conversation> findByBuyerIdAndSellerIdUtilisateurAndProductIdProduit(String buyerId, Long idUtilisateur, Long idProduit);
    
    /**
     * Finds all conversations associated with a specific seller.
     * 
     * @param idUtilisateur The seller (user) ID
     * @return List of conversations for the seller
     */
    List<Conversation> findBySellerIdUtilisateur(Long idUtilisateur);
}
