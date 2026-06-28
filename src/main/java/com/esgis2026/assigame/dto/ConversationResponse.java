package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for conversation response.
 * <p>
 * Contains conversation information returned to the client.
 * Includes conversation ID, buyer ID, seller information, product information, and creation date.
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
public class ConversationResponse {
    /**
     * Unique conversation identifier.
     */
    private Long idConversation;
    
    /**
     * The buyer identifier.
     */
    private String buyerId;
    
    /**
     * The seller (user) information.
     */
    private UtilisateurResponse seller;
    
    /**
     * The product information that is the subject of this conversation.
     */
    private ProduitResponse product;
    
    /**
     * Date and time when the conversation was created.
     */
    private LocalDateTime dateCreation;
}
