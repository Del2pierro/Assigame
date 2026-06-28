package com.esgis2026.assigame.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when a requested resource is not found.
 * <p>
 * This exception is typically thrown when attempting to retrieve
 * an entity (user, product, category, etc.) that does not exist in the database.
 * Results in HTTP 404 Not Found response.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    /**
     * Constructs a new ResourceNotFoundException with the specified message.
     * 
     * @param message The detail message explaining why the resource was not found
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
