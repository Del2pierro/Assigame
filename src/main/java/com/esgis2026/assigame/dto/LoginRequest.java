package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Le login ou email est obligatoire.")
    private String login;

    @NotBlank(message = "Le mot de passe est obligatoire.")
    private String password;
}

