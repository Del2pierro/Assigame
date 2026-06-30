package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.UtilisateurRequest;
import com.esgis2026.assigame.dto.UtilisateurResponse;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.mappers.UtilisateurMapper;
import com.esgis2026.assigame.services.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for user management operations.
 * <p>
 * Handles user registration, retrieval, update, activation/deactivation, and deletion.
 * Most operations require authentication, and some are restricted to admins.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    private final UtilisateurMapper utilisateurMapper;

    /**
     * Constructor for dependency injection.
     * 
     * @param utilisateurService Service for user business logic
     * @param utilisateurMapper Mapper for converting user entities to DTOs
     */
    public UtilisateurController(UtilisateurService utilisateurService, UtilisateurMapper utilisateurMapper) {
        this.utilisateurService = utilisateurService;
        this.utilisateurMapper = utilisateurMapper;
    }

    /**
     * Registers a new user with a specific user type.
     * <p>
     * Public endpoint - no authentication required.
     * Creates a new user account with the specified user type (role).
     * </p>
     * 
     * @param request The user registration request
     * @param idTypeUtilisateur The user type ID (role)
     * @return ResponseEntity containing the created user information
     */
    @PostMapping("/register/{idTypeUtilisateur}")
    public ResponseEntity<UtilisateurResponse> registerUtilisateur(@Valid @RequestBody UtilisateurRequest request,
            @PathVariable Long idTypeUtilisateur) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(request);
        Utilisateur registered = utilisateurService.registerUtilisateur(utilisateur, idTypeUtilisateur);
        return new ResponseEntity<>(utilisateurMapper.toResponse(registered), HttpStatus.CREATED);
    }

    /**
     * Retrieves a user by ID.
     * <p>
     * Requires authentication. Any authenticated user can retrieve user information.
     * </p>
     * 
     * @param id The user ID
     * @return ResponseEntity containing the user information
     */
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UtilisateurResponse> getUtilisateurById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
        return ResponseEntity.ok(utilisateurMapper.toResponse(utilisateur));
    }

    /**
     * Retrieves a user by email.
     * <p>
     * Requires ADMIN role. Only administrators can search users by email.
     * </p>
     * 
     * @param email The user email
     * @return ResponseEntity containing the user information
     */
    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UtilisateurResponse> getUtilisateurByEmail(@PathVariable String email) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(email);
        return ResponseEntity.ok(utilisateurMapper.toResponse(utilisateur));
    }

    /**
     * Retrieves all users.
     * <p>
     * Requires ADMIN role. Only administrators can list all users.
     * </p>
     * 
     * @return ResponseEntity containing list of all users
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UtilisateurResponse>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        List<UtilisateurResponse> dtos = utilisateurs.stream()
                .map(utilisateurMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Retrieves users by active status.
     * <p>
     * Requires ADMIN role. Only administrators can filter users by status.
     * </p>
     * 
     * @param actif The active status (true for active, false for inactive)
     * @return ResponseEntity containing list of users with the specified status
     */
    @GetMapping("/actif/{actif}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UtilisateurResponse>> getUtilisateursByActif(@PathVariable boolean actif) {
        List<Utilisateur> utilisateurs = utilisateurService.getUtilisateursByActif(actif);
        List<UtilisateurResponse> dtos = utilisateurs.stream()
                .map(utilisateurMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Updates a user's information.
     * <p>
     * Requires authentication. Users can update their own information.
     * </p>
     * 
     * @param id The user ID to update
     * @param request The updated user information
     * @return ResponseEntity containing the updated user information
     */
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UtilisateurResponse> updateUtilisateur(@PathVariable Long id, @Valid @RequestBody UtilisateurRequest request) {
        Utilisateur details = utilisateurMapper.toEntity(request);
        Utilisateur updated = utilisateurService.updateUtilisateur(id, details);
        return ResponseEntity.ok(utilisateurMapper.toResponse(updated));
    }

    /**
     * Toggles a user's active status.
     * <p>
     * Requires ADMIN role. Only administrators can activate/deactivate accounts.
     * </p>
     * 
     * @param id The user ID
     * @return ResponseEntity containing the updated user information
     */
    @PatchMapping("/{id}/toggle-actif")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UtilisateurResponse> toggleUtilisateurActif(@PathVariable Long id) {
        Utilisateur updated = utilisateurService.toggleUtilisateurActif(id);
        return ResponseEntity.ok(utilisateurMapper.toResponse(updated));
    }

    /**
     * Deletes a user.
     * <p>
     * Requires ADMIN role. Only administrators can delete user accounts.
     * This action is irreversible.
     * </p>
     * 
     * @param id The user ID to delete
     * @return ResponseEntity with no content
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}

