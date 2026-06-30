package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for user type (role) response.
 * <p>
 * Contains user type information returned to the client.
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
public class TypeUtilisateurResponse {
    /**
     * Unique user type identifier.
     */
    private Long idTypeUtilisateur;
    
    /**
     * User type label (e.g., "VENDEUR", "ADMIN").
     */
    private String libelle;
    
    /**
     * User type description.
     */
    private String description;
}
