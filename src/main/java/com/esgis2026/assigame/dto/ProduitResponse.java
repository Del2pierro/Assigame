package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProduitResponse {
    private Long idProduit;
    private String nomProduit;
    private String description;
    private BigDecimal prix;
    private byte[] image;
    private LocalDateTime dateAjout;
    private String statut;
    private Long idUtilisateur;
    private CategorieProduitResponse categorie;
}
