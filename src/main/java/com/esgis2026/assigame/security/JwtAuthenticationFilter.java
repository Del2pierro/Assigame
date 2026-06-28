package com.esgis2026.assigame.security;

import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

/**
 * JWT Authentication Filter for processing JWT tokens in HTTP requests.
 * <p>
 * Extends OncePerRequestFilter to execute once per request.
 * Extracts JWT token from Authorization header, validates it,
 * and sets the authentication in SecurityContextHolder if valid.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UtilisateurRepository utilisateurRepository;

    /**
     * Constructor for dependency injection.
     * 
     * @param jwtUtils Utility class for JWT operations
     * @param utilisateurRepository Repository for user data access
     */
    public JwtAuthenticationFilter(JwtUtils jwtUtils, UtilisateurRepository utilisateurRepository) {
        this.jwtUtils = jwtUtils;
        this.utilisateurRepository = utilisateurRepository;
    }

    /**
     * Filters incoming HTTP requests to extract and validate JWT tokens.
     * <p>
     * Parses the JWT from the Authorization header, validates it,
     * retrieves the user, and sets the authentication in the security context
     * if the token is valid and the user is active.
     * </p>
     * 
     * @param request The HTTP request
     * @param response The HTTP response
     * @param filterChain The filter chain
     * @throws ServletException if a servlet error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                Utilisateur user = utilisateurRepository.findByLoginWithTypeUtilisateur(username)
                        .or(() -> utilisateurRepository.findByEmailWithTypeUtilisateur(username))
                        .orElse(null);

                if (user != null && user.isActif()) {
                    List<SimpleGrantedAuthority> authorities = getAuthorities(user);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, authorities);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            System.err.println("Cannot set user authentication: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Parses the JWT token from the Authorization header.
     * <p>
     * Expects the header to be in the format "Bearer {token}".
     * </p>
     * 
     * @param request The HTTP request
     * @return The JWT token, or null if not found or invalid format
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

    /**
     * Converts TypeUtilisateur to Spring Security roles.
     * <p>
     * Maps user types to ROLE_* format for Spring Security.
     * For example, VENDEUR becomes ROLE_VENDEUR.
     * </p>
     * 
     * @param user The user entity
     * @return List of SimpleGrantedAuthority for the user's role
     */
    private List<SimpleGrantedAuthority> getAuthorities(Utilisateur user) {
        if (user.getTypeUtilisateur() == null || user.getTypeUtilisateur().getLibelle() == null) {
            return Collections.emptyList();
        }

        String role = user.getTypeUtilisateur().getLibelle().toUpperCase();
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
}
