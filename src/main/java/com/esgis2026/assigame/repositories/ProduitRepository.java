package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for product data access.
 * <p>
 * Provides methods for querying product data including filtering by user,
 * category, and status.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    
    /**
     * Finds all products published by a specific user.
     * 
     * @param idUtilisateur The user ID
     * @return List of products published by the user
     */
    List<Produit> findByUtilisateurIdUtilisateur(Long idUtilisateur);
    
    /**
     * Finds all products belonging to a specific category.
     * 
     * @param idCategorie The category ID
     * @return List of products in the category
     */
    List<Produit> findByCategorieProduitIdCategorie(Long idCategorie);
    
    /**
     * Finds all products with a specific status.
     * Common statuses: DISPONIBLE, RÉSERVÉ, VENDU.
     * 
     * @param statut The product status
     * @return List of products with the specified status
     */
    List<Produit> findByStatut(String statut);
}
