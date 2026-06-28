package com.esgis2026.assigame.security;

import com.esgis2026.assigame.entities.Utilisateur;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility class for security operations.
 * Provides methods to retrieve the current authenticated user from SecurityContextHolder.
 */
public class SecurityUtils {

    /**
     * Gets the current authenticated user from SecurityContextHolder.
     * 
     * @return the current authenticated Utilisateur, or null if not authenticated
     */
    public static Utilisateur getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Utilisateur) {
            return (Utilisateur) authentication.getPrincipal();
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
