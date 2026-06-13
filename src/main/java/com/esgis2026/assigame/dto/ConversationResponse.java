package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {
    private Long idConversation;
    private String buyerId;
    private UtilisateurResponse seller;
    private ProduitResponse product;
    private LocalDateTime dateCreation;
}
