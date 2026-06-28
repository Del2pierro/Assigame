package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for user type (role) creation/update requests.
 * <p>
 * Contains user type information for creating or updating user roles.
 * User types determine user permissions (e.g., VENDEUR, ADMIN).
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
public class TypeUtilisateurRequest {

    /**
     * User type label (e.g., "VENDEUR", "ADMIN").
     * Maximum length: 50 characters.
     */
    @NotBlank(message = "Le libellé du type d'utilisateur est obligatoire.")
    @Size(max = 50, message = "Le libellé ne peut pas dépasser 50 caractères.")
    private String libelle;

    /**
     * User type description.
     * Optional field.
     * Maximum length: 255 characters.
     */
    @Size(max = 255, message = "La description ne peut pas dépasser 255 caractères.")
    private String description;
}

