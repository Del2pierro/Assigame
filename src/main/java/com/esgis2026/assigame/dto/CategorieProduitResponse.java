package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for product category response.
 * <p>
 * Contains category information returned to the client.
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
public class CategorieProduitResponse {
    /**
     * Unique category identifier.
     */
    private Long idCategorie;
    
    /**
     * Category name.
     */
    private String nomCategorie;
    
    /**
     * Category description.
     */
    private String description;
}
