package com.esgis2026.assigame.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when a user is not authenticated or authentication fails.
 * <p>
 * This exception is typically thrown when a user attempts to access
 * a protected endpoint without valid authentication credentials.
 * Results in HTTP 401 Unauthorized response.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {
    /**
     * Constructs a new UnauthorizedException with the specified message.
     * 
     * @param message The detail message explaining why authentication failed
     */
    public UnauthorizedException(String message) {
        super(message);
    }
}
