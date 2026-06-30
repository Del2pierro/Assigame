package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.TypeUtilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for user type (role) data access.
 * <p>
 * Provides methods for querying user type data including finding by label.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Repository
public interface TypeUtilisateurRepository extends JpaRepository<TypeUtilisateur, Long> {
    
    /**
     * Finds a user type by its label.
     * Useful for uniqueness validation and role lookup.
     * 
     * @param libelle The user type label (e.g., "VENDEUR", "ADMIN")
     * @return Optional containing the user type if found
     */
    Optional<TypeUtilisateur> findByLibelle(String libelle);
}
