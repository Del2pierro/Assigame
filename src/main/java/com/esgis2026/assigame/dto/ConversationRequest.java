package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for conversation creation/retrieval requests.
 * <p>
 * Contains the information required to create or retrieve a conversation
 * between a buyer and a seller about a specific product.
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
public class ConversationRequest {

    /**
     * The buyer identifier.
     * Can be a guest ID (for unauthenticated buyers) or a user ID.
     */
    @NotBlank(message = "L'identifiant de l'acheteur (buyerId) est obligatoire.")
    private String buyerId;

    /**
     * The seller (user) ID.
     */
    @NotNull(message = "L'identifiant du vendeur (sellerId) est obligatoire.")
    private Long sellerId;

    /**
     * The product ID that is the subject of the conversation.
     */
    @NotNull(message = "L'identifiant du produit (productId) est obligatoire.")
    private Long productId;
}

