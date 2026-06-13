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
public class CategorieProduitRequest {
    
    @NotBlank(message = "Le nom de la catégorie est obligatoire.")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères.")
    private String nomCategorie;
    
    @Size(max = 255, message = "La description ne peut pas dépasser 255 caractères.")
    private String description;
}

