package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProduitRequest {

    @NotBlank(message = "Le nom du produit est obligatoire.")
    @Size(max = 150, message = "Le nom du produit ne peut pas dépasser 150 caractères.")
    private String nomProduit;

    @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères.")
    private String description;

    @NotNull(message = "Le prix du produit est obligatoire.")
    @PositiveOrZero(message = "Le prix doit être supérieur ou égal à zéro.")
    private BigDecimal prix;

    private byte[] image;
}

