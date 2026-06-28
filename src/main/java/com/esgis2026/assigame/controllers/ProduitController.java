package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.ProduitRequest;
import com.esgis2026.assigame.dto.ProduitResponse;
import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.mappers.ProduitMapper;
import com.esgis2026.assigame.services.ProduitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for product management operations.
 * <p>
 * Handles product creation, retrieval, update, status change, and deletion.
 * Public endpoints allow browsing without authentication.
 * Modification operations require authentication.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;
    private final ProduitMapper produitMapper;

    /**
     * Constructor for dependency injection.
     * 
     * @param produitService Service for product business logic
     * @param produitMapper Mapper for converting product entities to DTOs
     */
    public ProduitController(ProduitService produitService, ProduitMapper produitMapper) {
        this.produitService = produitService;
        this.produitMapper = produitMapper;
    }

    /**
     * Creates a new product for a specific user and category.
     * <p>
     * Requires authentication. Only authenticated users can publish products.
     * The product is associated with the specified user and category.
     * </p>
     * 
     * @param request The product creation request
     * @param idUtilisateur The user ID (seller)
     * @param idCategorie The category ID
     * @return ResponseEntity containing the created product information
     */
    @PostMapping("/utilisateur/{idUtilisateur}/categorie/{idCategorie}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProduitResponse> createProduit(@Valid @RequestBody ProduitRequest request, 
                                                 @PathVariable Long idUtilisateur, 
                                                 @PathVariable Long idCategorie) {
        Produit produit = produitMapper.toEntity(request);
        Produit created = produitService.createProduit(produit, idUtilisateur, idCategorie);
        return new ResponseEntity<>(produitMapper.toResponse(created), HttpStatus.CREATED);
    }

    /**
     * Retrieves a product by ID.
     * <p>
     * Public endpoint - no authentication required.
     * Anyone can view product details.
     * </p>
     * 
     * @param id The product ID
     * @return ResponseEntity containing the product information
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProduitResponse> getProduitById(@PathVariable Long id) {
        Produit produit = produitService.getProduitById(id);
        return ResponseEntity.ok(produitMapper.toResponse(produit));
    }

    /**
     * Retrieves all products.
     * <p>
     * Public endpoint - no authentication required.
     * Returns all products regardless of status.
     * </p>
     * 
     * @return ResponseEntity containing list of all products
     */
    @GetMapping
    public ResponseEntity<List<ProduitResponse>> getAllProduits() {
        List<Produit> produits = produitService.getAllProduits();
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Retrieves all products for a specific user.
     * <p>
     * Public endpoint - no authentication required.
     * Returns all products published by the specified user.
     * </p>
     * 
     * @param idUtilisateur The user ID
     * @return ResponseEntity containing list of user's products
     */
    @GetMapping("/utilisateur/{idUtilisateur}")
    public ResponseEntity<List<ProduitResponse>> getProduitsByUtilisateur(@PathVariable Long idUtilisateur) {
        List<Produit> produits = produitService.getProduitsByUtilisateur(idUtilisateur);
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Retrieves all products for a specific category.
     * <p>
     * Public endpoint - no authentication required.
     * Returns all products belonging to the specified category.
     * </p>
     * 
     * @param idCategorie The category ID
     * @return ResponseEntity containing list of category products
     */
    @GetMapping("/categorie/{idCategorie}")
    public ResponseEntity<List<ProduitResponse>> getProduitsByCategorie(@PathVariable Long idCategorie) {
        List<Produit> produits = produitService.getProduitsByCategorie(idCategorie);
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
 
    /**
     * Retrieves all products with a specific status.
     * <p>
     * Public endpoint - no authentication required.
     * Filters products by status (e.g., DISPONIBLE, RÉSERVÉ, VENDU).
     * </p>
     * 
     * @param statut The product status
     * @return ResponseEntity containing list of products with the specified status
     */
    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<ProduitResponse>> getProduitsByStatut(@PathVariable String statut) {
        List<Produit> produits = produitService.getProduitsByStatut(statut);
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Updates a product's information.
     * <p>
     * Requires authentication. Only the product owner can update it.
     * </p>
     * 
     * @param id The product ID to update
     * @param request The updated product information
     * @return ResponseEntity containing the updated product information
     */
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProduitResponse> updateProduit(@PathVariable Long id, @Valid @RequestBody ProduitRequest request) {
        Produit details = produitMapper.toEntity(request);
        Produit updated = produitService.updateProduit(id, details);
        return ResponseEntity.ok(produitMapper.toResponse(updated));
    }

    /**
     * Changes a product's status.
     * <p>
     * Requires authentication. Only the product owner can change its status.
     * Common status transitions: DISPONIBLE → RÉSERVÉ → VENDU.
     * </p>
     * 
     * @param id The product ID
     * @param nouveauStatut The new status
     * @return ResponseEntity containing the updated product information
     */
    @PatchMapping("/{id}/statut/{nouveauStatut}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProduitResponse> changerStatutProduit(@PathVariable Long id, @PathVariable String nouveauStatut) {
        Produit updated = produitService.changerStatutProduit(id, nouveauStatut);
        return ResponseEntity.ok(produitMapper.toResponse(updated));
    }

    /**
     * Deletes a product.
     * <p>
     * Requires authentication. Only the product owner can delete it.
     * This action is irreversible.
     * </p>
     * 
     * @param id The product ID to delete
     * @return ResponseEntity with no content
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }
}

