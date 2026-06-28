package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for login requests.
 * <p>
 * Contains the credentials required for user authentication.
 * The login field can be either a username or email address.
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
public class LoginRequest {

    /**
     * Login identifier or email address.
     * Must not be blank.
     */
    @NotBlank(message = "Le login ou email est obligatoire.")
    private String login;

    /**
     * User password.
     * Must not be blank.
     */
    @NotBlank(message = "Le mot de passe est obligatoire.")
    private String password;
}

