package com.esgis2026.assigame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationRequest {

    @NotBlank(message = "L'identifiant de l'acheteur (buyerId) est obligatoire.")
    private String buyerId;

    @NotNull(message = "L'identifiant du vendeur (sellerId) est obligatoire.")
    private Long sellerId;

    @NotNull(message = "L'identifiant du produit (productId) est obligatoire.")
    private Long productId;
}

