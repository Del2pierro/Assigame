package com.esgis2026.assigame.dto;

import com.esgis2026.assigame.entities.SenderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for message sending requests.
 * <p>
 * Contains the information required to send a message in a conversation.
 * Includes conversation ID, sender type, sender ID, and message content.
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
public class MessageRequest {

    /**
     * The conversation ID where the message will be sent.
     */
    @NotNull(message = "L'identifiant de la conversation est obligatoire.")
    private Long conversationId;

    /**
     * The type of sender (BUYER or SELLER).
     */
    @NotNull(message = "Le type d'expéditeur (BUYER/SELLER) est obligatoire.")
    private SenderType senderType;

    /**
     * The identifier of the sender.
     * Can be a guest ID (for unauthenticated buyers) or a user ID.
     */
    @NotBlank(message = "L'identifiant de l'expéditeur est obligatoire.")
    private String senderId;

    /**
     * The message content.
     * Must not be blank.
     */
    @NotBlank(message = "Le contenu du message ne peut pas être vide.")
    private String content;
}

