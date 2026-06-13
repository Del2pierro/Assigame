package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeUtilisateurRequest {

    @NotBlank(message = "Le libellé du type d'utilisateur est obligatoire.")
    @Size(max = 50, message = "Le libellé ne peut pas dépasser 50 caractères.")
    private String libelle;

    @Size(max = 255, message = "La description ne peut pas dépasser 255 caractères.")
    private String description;
}

