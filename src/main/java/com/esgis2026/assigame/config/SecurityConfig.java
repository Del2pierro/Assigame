package com.esgis2026.assigame.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import com.esgis2026.assigame.security.JwtAuthenticationFilter;

/**
 * Security configuration for the Assigame application.
 * <p>
 * Configures Spring Security with JWT-based authentication.
 * Defines public endpoints that don't require authentication and
 * sets up the security filter chain with JWT authentication filter.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    /**
     * Constructor for dependency injection.
     * 
     * @param jwtAuthFilter The JWT authentication filter
     */
    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }
    /**
     * Configures the password encoder bean.
     * Uses BCrypt for secure password hashing.
     * 
     * @return The BCrypt password encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the security filter chain.
     * <p>
     * Disables CSRF, uses stateless session management for JWT,
     * defines public endpoints, and adds the JWT authentication filter.
     * </p>
     * 
     * @param http The HttpSecurity object to configure
     * @return The configured security filter chain
     * @throws Exception if configuration fails
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints - authentication and registration
                .requestMatchers("/api/auth/login", "/api/utilisateurs/register/**").permitAll()
                
                // Public read-only access to products and categories
                .requestMatchers("/api/produits").permitAll()
                .requestMatchers("/api/produits/**").permitAll()
                .requestMatchers("/api/categories").permitAll()
                .requestMatchers("/api/categories/**").permitAll()
                
                // WebSocket endpoint
                .requestMatchers("/ws/**").permitAll()
                
                // All other endpoints require authentication
                // Role-based access is handled via @PreAuthorize on controllers
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    
}
