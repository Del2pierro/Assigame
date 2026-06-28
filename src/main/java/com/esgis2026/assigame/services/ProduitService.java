package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.exceptions.ForbiddenException;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import com.esgis2026.assigame.repositories.ProduitRepository;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import com.esgis2026.assigame.repositories.CategorieProduitRepository;
import com.esgis2026.assigame.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for product management business logic.
 * <p>
 * Handles product creation, retrieval, update, status change, and deletion.
 * Includes ownership validation to ensure only product owners can modify their products.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Service
@Transactional
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final CategorieProduitRepository categorieProduitRepository;

    /**
     * Constructor for dependency injection.
     * 
     * @param produitRepository Repository for product data access
     * @param utilisateurRepository Repository for user data access
     * @param categorieProduitRepository Repository for category data access
     */
    public ProduitService(ProduitRepository produitRepository, 
                          UtilisateurRepository utilisateurRepository,
                          CategorieProduitRepository categorieProduitRepository) {
        this.produitRepository = produitRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.categorieProduitRepository = categorieProduitRepository;
    }

    /**
     * Creates a new product for a specific user and category.
     * <p>
     * Validates that the user is active, associates the product with the user and category,
     * and sets the default status to DISPONIBLE.
     * </p>
     * 
     * @param produit The product entity to create
     * @param idUtilisateur The user ID (seller)
     * @param idCategorie The category ID
     * @return The created product entity
     * @throws ResourceNotFoundException if user or category is not found
     * @throws IllegalStateException if user is inactive
     */
    public Produit createProduit(Produit produit, Long idUtilisateur, Long idCategorie) {
        Utilisateur utilisateur = utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur non trouvé avec l'ID : " + idUtilisateur));
        
        // Règle de gestion : Seul un utilisateur actif peut publier un produit
        if (!utilisateur.isActif()) {
            throw new IllegalStateException("Un utilisateur inactif ne peut pas publier de produit.");
        }

        CategorieProduit categorie = categorieProduitRepository.findById(idCategorie)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée avec l'ID : " + idCategorie));

        produit.setUtilisateur(utilisateur);
        produit.setCategorieProduit(categorie);
        produit.setStatut("DISPONIBLE"); // Statut par défaut à la création

        return produitRepository.save(produit);
    }

    /**
     * Retrieves a product by ID.
     * 
     * @param id The product ID
     * @return The product entity
     * @throws ResourceNotFoundException if product is not found
     */
    @Transactional(readOnly = true)
    public Produit getProduitById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'ID : " + id));
    }

    /**
     * Retrieves all products.
     * 
     * @return List of all products
     */
    @Transactional(readOnly = true)
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    /**
     * Retrieves all products for a specific user.
     * 
     * @param idUtilisateur The user ID
     * @return List of user's products
     */
    @Transactional(readOnly = true)
    public List<Produit> getProduitsByUtilisateur(Long idUtilisateur) {
        return produitRepository.findByUtilisateurIdUtilisateur(idUtilisateur);
    }

    /**
     * Retrieves all products for a specific category.
     * 
     * @param idCategorie The category ID
     * @return List of category products
     */
    @Transactional(readOnly = true)
    public List<Produit> getProduitsByCategorie(Long idCategorie) {
        return produitRepository.findByCategorieProduitIdCategorie(idCategorie);
    }

    /**
     * Retrieves all products with a specific status.
     * 
     * @param statut The product status
     * @return List of products with the specified status
     */
    @Transactional(readOnly = true)
    public List<Produit> getProduitsByStatut(String statut) {
        return produitRepository.findByStatut(statut);
    }

    /**
     * Updates a product's information.
     * <p>
     * Only the product owner can update it. Image is only updated if provided.
     * </p>
     * 
     * @param id The product ID to update
     * @param details The updated product information
     * @return The updated product entity
     * @throws ForbiddenException if current user is not the product owner
     */
    public Produit updateProduit(Long id, Produit details) {
        Produit produit = getProduitById(id);
        
        // Ownership validation: only the product owner can update it
        validateProductOwnership(produit);

        produit.setNomProduit(details.getNomProduit());
        produit.setDescription(details.getDescription());
        produit.setPrix(details.getPrix());
        if (details.getImage() != null) {
            produit.setImage(details.getImage());
        }

        return produitRepository.save(produit);
    }

    /**
     * Changes a product's status.
     * <p>
     * Only the product owner can change its status.
     * Common transitions: DISPONIBLE → RÉSERVÉ → VENDU.
     * </p>
     * 
     * @param id The product ID
     * @param nouveauStatut The new status
     * @return The updated product entity
     * @throws ForbiddenException if current user is not the product owner
     */
    public Produit changerStatutProduit(Long id, String nouveauStatut) {
        Produit produit = getProduitById(id);
        
        // Ownership validation: only the product owner can change its status
        validateProductOwnership(produit);
        
        produit.setStatut(nouveauStatut);
        return produitRepository.save(produit);
    }

    /**
     * Deletes a product.
     * <p>
     * Only the product owner can delete it. This action is irreversible.
     * </p>
     * 
     * @param id The product ID to delete
     * @throws ForbiddenException if current user is not the product owner
     */
    public void deleteProduit(Long id) {
        Produit produit = getProduitById(id);
        
        // Ownership validation: only the product owner can delete it
        validateProductOwnership(produit);
        
        produitRepository.delete(produit);
    }

    /**
     * Validates that the current authenticated user is the owner of the product.
     * Uses SecurityContextHolder to get the current user ID.
     * 
     * @param produit The product to validate ownership for
     * @throws ForbiddenException if current user is not the product owner
     */
    private void validateProductOwnership(Produit produit) {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        Long productOwnerId = produit.getUtilisateur().getIdUtilisateur();
        
        if (currentUserId == null || !currentUserId.equals(productOwnerId)) {
            throw new ForbiddenException("Accès refusé. Vous n'êtes pas le propriétaire de ce produit.");
        }
    }
}
