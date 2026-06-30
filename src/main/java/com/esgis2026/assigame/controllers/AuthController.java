package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.LoginRequest;
import com.esgis2026.assigame.dto.JwtAuthResponse;
import com.esgis2026.assigame.dto.UtilisateurResponse;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.exceptions.UnauthorizedException;
import com.esgis2026.assigame.mappers.UtilisateurMapper;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import com.esgis2026.assigame.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for authentication operations.
 * <p>
 * Handles user login and token generation for JWT-based authentication.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final UtilisateurMapper utilisateurMapper;
    private final JwtUtils jwtUtils;

    /**
     * Constructor for dependency injection.
     * 
     * @param utilisateurRepository Repository for user data access
     * @param passwordEncoder Password encoder for verifying credentials
     * @param utilisateurMapper Mapper for converting user entities to DTOs
     * @param jwtUtils Utility for JWT token generation
     */
    public AuthController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder, UtilisateurMapper utilisateurMapper, JwtUtils jwtUtils) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.utilisateurMapper = utilisateurMapper;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Authenticates a user and returns a JWT token.
     * <p>
     * Accepts login credentials (login or email + password), validates them,
     * and returns a JWT token along with user information if authentication succeeds.
     * </p>
     * 
     * @param request The login request containing login/email and password
     * @return ResponseEntity containing JWT token and user information
     * @throws UnauthorizedException if credentials are invalid or account is disabled
     */
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Utilisateur user = utilisateurRepository.findByLogin(request.getLogin())
                .or(() -> utilisateurRepository.findByEmail(request.getLogin()))
                .orElseThrow(() -> new UnauthorizedException("Identifiants incorrects"));

        if (!user.isActif()) {
            throw new UnauthorizedException("Ce compte est désactivé.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getMotDePasse())) {
            throw new UnauthorizedException("Identifiants incorrects");
        }

        String token = jwtUtils.generateJwtToken(user.getLogin());
        UtilisateurResponse utilisateurResponse = utilisateurMapper.toResponse(user);

        return ResponseEntity.ok(new JwtAuthResponse(token, utilisateurResponse));
    }
}

