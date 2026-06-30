package com.esgis2026.assigame.dto;

import com.esgis2026.assigame.entities.SenderType;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for message response.
 * <p>
 * Contains message information returned to the client after sending or retrieving messages.
 * Includes message ID, conversation ID, sender information, content, and timestamp.
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
public class MessageResponse {
    /**
     * Unique message identifier.
     */
    private Long idMessage;
    
    /**
     * The conversation ID this message belongs to.
     */
    private Long conversationId;
    
    /**
     * The type of sender (BUYER or SELLER).
     */
    private SenderType senderType;
    
    /**
     * The identifier of the sender.
     */
    private String senderId;
    
    /**
     * The message content.
     */
    private String contenu;
    
    /**
     * Date and time when the message was sent.
     */
    private LocalDateTime dateEnvoi;
}
