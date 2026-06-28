package com.esgis2026.assigame.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility class for JWT (JSON Web Token) operations.
 * <p>
 * Provides methods for generating, parsing, and validating JWT tokens.
 * Uses HS256 algorithm for signing tokens.
 * Tokens are valid for 24 hours by default.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Component
public class JwtUtils {

    @Value("${app.jwtSecret:assigameSuperSecretKey12345678901234567890}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs:86400000}") // 24 heures
    private int jwtExpirationMs;

    /**
     * Generates the signing key from the JWT secret.
     * 
     * @return The signing key for JWT operations
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Generates a JWT token for a given user login.
     * <p>
     * The token includes the login as the subject, issue date,
     * and expiration date (24 hours from now by default).
     * </p>
     * 
     * @param login The user login (or email) to include in the token
     * @return The generated JWT token
     */
    public String generateJwtToken(String login) {
        return Jwts.builder()
                .setSubject(login)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the username (login) from a JWT token.
     * 
     * @param token The JWT token
     * @return The username (login) from the token
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates a JWT token.
     * <p>
     * Checks if the token signature is valid and not expired.
     * </p>
     * 
     * @param authToken The JWT token to validate
     * @return true if the token is valid, false otherwise
     */
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            System.err.println("Invalid JWT signature: " + e.getMessage());
        }
        return false;
    }
}
