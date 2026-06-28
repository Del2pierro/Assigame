package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for user creation/update requests.
 * <p>
 * Contains user information for registration or profile updates.
 * All fields are validated according to the constraints.
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
public class UtilisateurRequest {

    /**
     * User's last name.
     * Maximum length: 100 characters.
     */
    @NotBlank(message = "Le nom est obligatoire.")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères.")
    private String nom;

    /**
     * User's first name.
     * Maximum length: 100 characters.
     */
    @NotBlank(message = "Le prénom est obligatoire.")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères.")
    private String prenom;

    /**
     * User's email address.
     * Must be a valid email format.
     * Maximum length: 150 characters.
     */
    @NotBlank(message = "L'adresse email est obligatoire.")
    @Email(message = "L'adresse email doit être valide.")
    @Size(max = 150, message = "L'email ne peut pas dépasser 150 caractères.")
    private String email;

    /**
     * User's login identifier.
     * Maximum length: 50 characters.
     */
    @NotBlank(message = "Le login est obligatoire.")
    @Size(max = 50, message = "Le login ne peut pas dépasser 50 caractères.")
    private String login;

    /**
     * User's password.
     * Minimum length: 6 characters.
     * Maximum length: 100 characters.
     */
    @NotBlank(message = "Le mot de passe est obligatoire.")
    @Size(min = 6, max = 100, message = "Le mot de passe doit faire entre 6 et 100 caractères.")
    private String motDePasse;

    /**
     * User's phone number.
     * Optional field.
     * Maximum length: 20 characters.
     */
    @Size(max = 20, message = "Le numéro de téléphone ne peut pas dépasser 20 caractères.")
    private String telephone;

    /**
     * User's physical address.
     * Optional field.
     * Maximum length: 255 characters.
     */
    @Size(max = 255, message = "L'adresse ne peut pas dépasser 255 caractères.")
    private String adresse;
}

