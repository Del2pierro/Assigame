package com.esgis2026.assigame.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when a user attempts to access a resource they don't have permission for.
 * <p>
 * This exception is typically thrown when a user tries to access or modify
 * a resource that belongs to another user or when they lack the required role.
 * Results in HTTP 403 Forbidden response.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends RuntimeException {
    /**
     * Constructs a new ForbiddenException with the specified message.
     * 
     * @param message The detail message explaining why access was forbidden
     */
    public ForbiddenException(String message) {
        super(message);
    }
}
