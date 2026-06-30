package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.CategorieProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for product category data access.
 * <p>
 * Provides methods for querying category data including finding by name.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Repository
public interface CategorieProduitRepository extends JpaRepository<CategorieProduit, Long> {
    
    /**
     * Finds a category by its name.
     * Useful for uniqueness validation.
     * 
     * @param nomCategorie The category name
     * @return Optional containing the category if found
     */
    Optional<CategorieProduit> findByNomCategorie(String nomCategorie);
}
