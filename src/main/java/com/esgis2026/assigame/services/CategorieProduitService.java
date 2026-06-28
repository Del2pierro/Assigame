package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.repositories.CategorieProduitRepository;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for product category management business logic.
 * <p>
 * Handles category creation, retrieval, update, and deletion.
 * Includes uniqueness validation for category names.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Service
@Transactional
public class CategorieProduitService {
    
    private final CategorieProduitRepository categorieProduitRepository;

    /**
     * Constructor for dependency injection.
     * 
     * @param categorieProduitRepository Repository for category data access
     */
    public CategorieProduitService(CategorieProduitRepository categorieProduitRepository) {
        this.categorieProduitRepository = categorieProduitRepository;
    }

    /**
     * Creates a new product category.
     * <p>
     * Validates that the category name is unique.
     * </p>
     * 
     * @param categorie The category entity to create
     * @return The created category entity
     * @throws IllegalArgumentException if category name already exists
     */
    public CategorieProduit createCategorie(CategorieProduit categorie) {
        if (categorieProduitRepository.findByNomCategorie(categorie.getNomCategorie()).isPresent()) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà.");
        }
        return categorieProduitRepository.save(categorie);
    }

    /**
     * Retrieves a category by ID.
     * 
     * @param id The category ID
     * @return The category entity
     * @throws ResourceNotFoundException if category is not found
     */
    @Transactional(readOnly = true)
    public CategorieProduit getCategorieById(Long id) {
        return categorieProduitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée avec l'ID : " + id));
    }

    /**
     * Retrieves all product categories.
     * 
     * @return List of all categories
     */
    @Transactional(readOnly = true)
    public List<CategorieProduit> getAllCategories() {
        return categorieProduitRepository.findAll();
    }

    /**
     * Updates a category's information.
     * <p>
     * Validates name uniqueness if changed.
     * </p>
     * 
     * @param id The category ID to update
     * @param details The updated category information
     * @return The updated category entity
     * @throws IllegalArgumentException if category name already exists
     */
    public CategorieProduit updateCategorie(Long id, CategorieProduit details) {
        CategorieProduit categorie = getCategorieById(id);
        
        // Validation unicité si le nom change
        if (!categorie.getNomCategorie().equalsIgnoreCase(details.getNomCategorie()) &&
            categorieProduitRepository.findByNomCategorie(details.getNomCategorie()).isPresent()) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà.");
        }
        
        categorie.setNomCategorie(details.getNomCategorie());
        categorie.setDescription(details.getDescription());
        return categorieProduitRepository.save(categorie);
    }

    /**
     * Deletes a category.
     * <p>
     * This action is irreversible.
     * </p>
     * 
     * @param id The category ID to delete
     */
    public void deleteCategorie(Long id) {
        CategorieProduit categorie = getCategorieById(id);
        categorieProduitRepository.delete(categorie);
    }
}
