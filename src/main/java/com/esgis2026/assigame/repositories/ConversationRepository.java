package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByBuyerIdAndSellerIdUtilisateurAndProductIdProduit(String buyerId, Long idUtilisateur, Long idProduit);
    List<Conversation> findBySellerIdUtilisateur(Long idUtilisateur);
}
