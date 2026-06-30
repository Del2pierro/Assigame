package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository interface for user data access.
 * <p>
 * Provides methods for querying user data including authentication-related queries
 * and filtering by active status.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    
    /**
     * Finds a user by email address.
     * Useful for authentication and email uniqueness validation.
     * 
     * @param email The email address to search for
     * @return Optional containing the user if found
     */
    Optional<Utilisateur> findByEmail(String email);
    
    /**
     * Finds a user by login identifier.
     * Useful for authentication and login uniqueness validation.
     * 
     * @param login The login identifier to search for
     * @return Optional containing the user if found
     */
    Optional<Utilisateur> findByLogin(String login);
    
    /**
     * Finds users by their active status.
     * 
     * @param actif The active status (true for active, false for inactive)
     * @return List of users with the specified status
     */
    List<Utilisateur> findByActif(boolean actif);
    
    /**
     * Finds a user by login identifier with their typeUtilisateur eagerly loaded.
     * This method uses JOIN FETCH to avoid lazy loading issues in the JWT filter.
     * 
     * @param login The login identifier to search for
     * @return Optional containing the user with typeUtilisateur loaded if found
     */
    @Query("SELECT u FROM Utilisateur u LEFT JOIN FETCH u.typeUtilisateur WHERE u.login = :login")
    Optional<Utilisateur> findByLoginWithTypeUtilisateur(@Param("login") String login);
    
    /**
     * Finds a user by email address with their typeUtilisateur eagerly loaded.
     * This method uses JOIN FETCH to avoid lazy loading issues in the JWT filter.
     * 
     * @param email The email address to search for
     * @return Optional containing the user with typeUtilisateur loaded if found
     */
    @Query("SELECT u FROM Utilisateur u LEFT JOIN FETCH u.typeUtilisateur WHERE u.email = :email")
    Optional<Utilisateur> findByEmailWithTypeUtilisateur(@Param("email") String email);
}
