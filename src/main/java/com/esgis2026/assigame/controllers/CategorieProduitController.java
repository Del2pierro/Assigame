package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.CategorieProduitRequest;
import com.esgis2026.assigame.dto.CategorieProduitResponse;
import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.mappers.CategorieProduitMapper;
import com.esgis2026.assigame.services.CategorieProduitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for product category management operations.
 * <p>
 * Handles category creation, retrieval, update, and deletion.
 * Categories are used to organize and classify products.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/categories")
public class CategorieProduitController {

    private final CategorieProduitService categorieProduitService;
    private final CategorieProduitMapper categorieProduitMapper;

    /**
     * Constructor for dependency injection.
     * 
     * @param categorieProduitService Service for category business logic
     * @param categorieProduitMapper Mapper for converting category entities to DTOs
     */
    public CategorieProduitController(CategorieProduitService categorieProduitService, CategorieProduitMapper categorieProduitMapper) {
        this.categorieProduitService = categorieProduitService;
        this.categorieProduitMapper = categorieProduitMapper;
    }

    /**
     * Creates a new product category.
     * <p>
     * Public endpoint - no authentication required.
     * Creates a new category for organizing products.
     * </p>
     * 
     * @param request The category creation request
     * @return ResponseEntity containing the created category information
     */
    @PostMapping
    public ResponseEntity<CategorieProduitResponse> createCategorie(@Valid @RequestBody CategorieProduitRequest request) {
        CategorieProduit categorie = categorieProduitMapper.toEntity(request);
        CategorieProduit created = categorieProduitService.createCategorie(categorie);
        return new ResponseEntity<>(categorieProduitMapper.toResponse(created), HttpStatus.CREATED);
    }

    /**
     * Retrieves a category by ID.
     * <p>
     * Public endpoint - no authentication required.
     * </p>
     * 
     * @param id The category ID
     * @return ResponseEntity containing the category information
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategorieProduitResponse> getCategorieById(@PathVariable Long id) {
        CategorieProduit categorie = categorieProduitService.getCategorieById(id);
        return ResponseEntity.ok(categorieProduitMapper.toResponse(categorie));
    }

    /**
     * Retrieves all product categories.
     * <p>
     * Public endpoint - no authentication required.
     * Returns all categories available on the platform.
     * </p>
     * 
     * @return ResponseEntity containing list of all categories
     */
    @GetMapping
    public ResponseEntity<List<CategorieProduitResponse>> getAllCategories() {
        List<CategorieProduit> categories = categorieProduitService.getAllCategories();
        List<CategorieProduitResponse> dtos = categories.stream()
                .map(categorieProduitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Updates a category's information.
     * <p>
     * Public endpoint - no authentication required.
     * </p>
     * 
     * @param id The category ID to update
     * @param request The updated category information
     * @return ResponseEntity containing the updated category information
     */
    @PutMapping("/{id}")
    public ResponseEntity<CategorieProduitResponse> updateCategorie(@PathVariable Long id, @Valid @RequestBody CategorieProduitRequest request) {
        CategorieProduit details = categorieProduitMapper.toEntity(request);
        CategorieProduit updated = categorieProduitService.updateCategorie(id, details);
        return ResponseEntity.ok(categorieProduitMapper.toResponse(updated));
    }

    /**
     * Deletes a category.
     * <p>
     * Public endpoint - no authentication required.
     * This action is irreversible if the category has no associated products.
     * </p>
     * 
     * @param id The category ID to delete
     * @return ResponseEntity with no content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        categorieProduitService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }
}


