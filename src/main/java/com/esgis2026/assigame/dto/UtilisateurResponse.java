package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for user response.
 * <p>
 * Contains user information returned to the client.
 * Excludes sensitive data like password.
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
public class UtilisateurResponse {
    /**
     * Unique user identifier.
     */
    private Long idUtilisateur;
    
    /**
     * User's last name.
     */
    private String nom;
    
    /**
     * User's first name.
     */
    private String prenom;
    
    /**
     * User's email address.
     */
    private String email;
    
    /**
     * User's login identifier.
     */
    private String login;
    
    /**
     * User's phone number.
     */
    private String telephone;
    
    /**
     * User's physical address.
     */
    private String adresse;
    
    /**
     * Date and time when the user registered.
     */
    private LocalDateTime dateInscription;
    
    /**
     * Flag indicating whether the user account is active.
     */
    private boolean actif;
    
    /**
     * The user's type/role.
     */
    private TypeUtilisateurResponse typeUtilisateur;
}
