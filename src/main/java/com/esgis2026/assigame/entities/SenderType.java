package com.esgis2026.assigame.entities;

/**
 * Enum representing the type of sender in a message.
 * <p>
 * Messages can be sent by either a buyer or a seller.
 * This enum is used to identify the sender type in the Message entity.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
public enum SenderType {
    /**
     * Represents a buyer (can be a guest or registered user).
     */
    BUYER,
    
    /**
     * Represents a seller (registered user).
     */
    SELLER
}
