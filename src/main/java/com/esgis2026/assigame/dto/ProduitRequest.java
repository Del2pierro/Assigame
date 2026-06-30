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

/**
 * Data Transfer Object for product creation/update requests.
 * <p>
 * Contains product information for creating or updating product listings.
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
public class ProduitRequest {

    /**
     * Product name.
     * Maximum length: 150 characters.
     */
    @NotBlank(message = "Le nom du produit est obligatoire.")
    @Size(max = 150, message = "Le nom du produit ne peut pas dépasser 150 caractères.")
    private String nomProduit;

    /**
     * Product description.
     * Optional field.
     * Maximum length: 1000 characters.
     */
    @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères.")
    private String description;

    /**
     * Product price in FCFA.
     * Must be non-negative.
     */
    @NotNull(message = "Le prix du produit est obligatoire.")
    @PositiveOrZero(message = "Le prix doit être supérieur ou égal à zéro.")
    private BigDecimal prix;

    /**
     * Product image as binary data (base64-encoded).
     * Optional field.
     */
    private byte[] image;
}

