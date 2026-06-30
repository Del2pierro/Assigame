package com.esgis2026.assigame.security;

import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility class for security operations.
 * Provides methods to retrieve the current authenticated user from SecurityContextHolder.
 */
public class SecurityUtils {

    private static UtilisateurRepository utilisateurRepository;

    /**
     * Sets the utilisateur repository (called by Spring).
     */
    public static void setUtilisateurRepository(UtilisateurRepository repository) {
        utilisateurRepository = repository;
    }

    /**
     * Gets the current authenticated user from SecurityContextHolder.
     * Handles both cases: principal is Utilisateur or principal is String (username).
     * 
     * @return the current authenticated Utilisateur, or null if not authenticated
     */
    public static Utilisateur getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        
        // Case 1: principal is already a Utilisateur object
        if (principal instanceof Utilisateur) {
            return (Utilisateur) principal;
        }
        
        // Case 2: principal is a String (username), fetch user from repository
        if (principal instanceof String && !"anonymousUser".equals(principal)) {
            String username = (String) principal;
            if (utilisateurRepository != null) {
                return utilisateurRepository.findByLoginWithTypeUtilisateur(username)
                        .or(() -> utilisateurRepository.findByEmailWithTypeUtilisateur(username))
                        .orElse(null);
            }
        }
        
        return null;
    }

    /**
     * Gets the ID of the current authenticated user.
     * 
     * @return the ID of the current user, or null if not authenticated
     */
    public static Long getCurrentUserId() {
        Utilisateur user = getCurrentUser();
        return user != null ? user.getIdUtilisateur() : null;
    }

    /**
     * Checks if the current user is authenticated.
     * 
     * @return true if authenticated, false otherwise
     */
    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated() 
                && !"anonymousUser".equals(authentication.getPrincipal());
    }
}
