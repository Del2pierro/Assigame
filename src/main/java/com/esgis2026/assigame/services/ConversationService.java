package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.Conversation;
import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import com.esgis2026.assigame.repositories.ConversationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service de gestion des conversations de la marketplace.
 * Permet la création, la récupération et l'accès sécurisé aux conversations
 * entre acheteurs et vendeurs pour des produits donnés.
 */
@Service
@Transactional
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UtilisateurService utilisateurService;
    private final ProduitService produitService;

    public ConversationService(ConversationRepository conversationRepository,
                               UtilisateurService utilisateurService,
                               ProduitService produitService) {
        this.conversationRepository = conversationRepository;
        this.utilisateurService = utilisateurService;
        this.produitService = produitService;
    }

    /**
     * Récupère une conversation existante ou en crée une nouvelle si elle n'existe pas encore.
     * Une conversation est unique par le triplet (buyerId, sellerId, productId).
     *
     * @param buyerId Identifiant unique de l'acheteur anonyme
     * @param sellerId Identifiant du vendeur
     * @param productId Identifiant du produit
     * @return La conversation existante ou nouvellement créée
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
     * Récupère la liste des conversations associées à un vendeur.
     *
     * @param sellerId Identifiant du vendeur
     * @return Liste des conversations associées au vendeur
     */
    @Transactional(readOnly = true)
    public List<Conversation> getConversationsBySeller(Long sellerId) {
        utilisateurService.getUtilisateurById(sellerId);
        return conversationRepository.findBySellerIdUtilisateur(sellerId);
    }

    /**
     * Récupère une conversation par son identifiant unique.
     *
     * @param id Identifiant de la conversation
     * @return La conversation correspondante
     * @throws ResourceNotFoundException Si aucune conversation n'est trouvée
     */
    @Transactional(readOnly = true)
    public Conversation getConversationById(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation non trouvée avec l'ID : " + id));
    }
}

