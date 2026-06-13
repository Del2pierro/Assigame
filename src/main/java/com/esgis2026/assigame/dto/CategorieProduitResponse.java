package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategorieProduitResponse {
    private Long idCategorie;
    private String nomCategorie;
    private String description;
}
