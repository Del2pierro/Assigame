package com.esgis2026.assigame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for JWT authentication response.
 * <p>
 * Contains the JWT token and user information returned after successful authentication.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    /**
     * JWT token for authentication.
     * Valid for 24 hours.
     */
    private String token;
    
    /**
     * User information.
     * Excludes sensitive data like password.
     */
    private UtilisateurResponse user;
}
