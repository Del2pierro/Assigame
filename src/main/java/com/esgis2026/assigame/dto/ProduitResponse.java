package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for product response.
 * <p>
 * Contains product information returned to the client.
 * Includes product details, seller ID, and category information.
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
public class ProduitResponse {
    /**
     * Unique product identifier.
     */
    private Long idProduit;
    
    /**
     * Product name.
     */
    private String nomProduit;
    
    /**
     * Product description.
     */
    private String description;
    
    /**
     * Product price in FCFA.
     */
    private BigDecimal prix;
    
    /**
     * Product image as binary data.
     */
    private byte[] image;
    
    /**
     * Date and time when the product was added.
     */
    private LocalDateTime dateAjout;
    
    /**
     * Product status (DISPONIBLE, RÉSERVÉ, VENDU).
     */
    private String statut;
    
    /**
     * ID of the user (seller) who published the product.
     * @deprecated Use utilisateur instead for complete seller information
     */
    @Deprecated
    private Long idUtilisateur;
    
    /**
     * Complete user (seller) information who published the product.
     */
    private UtilisateurResponse utilisateur;
    
    /**
     * Product category information.
     */
    private CategorieProduitResponse categorie;
}
