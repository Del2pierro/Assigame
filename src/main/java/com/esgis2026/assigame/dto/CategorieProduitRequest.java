package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for product category creation/update requests.
 * <p>
 * Contains category information for creating or updating product categories.
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
public class CategorieProduitRequest {
    
    /**
     * Category name.
     * Maximum length: 100 characters.
     */
    @NotBlank(message = "Le nom de la catégorie est obligatoire.")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères.")
    private String nomCategorie;
    
    /**
     * Category description.
     * Optional field.
     * Maximum length: 255 characters.
     */
    @Size(max = 255, message = "La description ne peut pas dépasser 255 caractères.")
    private String description;
}

