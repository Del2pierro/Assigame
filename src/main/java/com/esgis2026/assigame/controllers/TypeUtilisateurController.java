package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.TypeUtilisateurRequest;
import com.esgis2026.assigame.dto.TypeUtilisateurResponse;
import com.esgis2026.assigame.entities.TypeUtilisateur;
import com.esgis2026.assigame.mappers.TypeUtilisateurMapper;
import com.esgis2026.assigame.services.TypeUtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for user type (role) management operations.
 * <p>
 * Handles user type creation, retrieval, update, and deletion.
 * User types determine user roles and permissions (e.g., VENDEUR, ADMIN).
 * Most operations require ADMIN role.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@RestController
@RequestMapping("/api/types-utilisateurs")
public class TypeUtilisateurController {

    private final TypeUtilisateurService typeUtilisateurService;
    private final TypeUtilisateurMapper typeUtilisateurMapper;

    /**
     * Constructor for dependency injection.
     * 
     * @param typeUtilisateurService Service for user type business logic
     * @param typeUtilisateurMapper Mapper for converting user type entities to DTOs
     */
    public TypeUtilisateurController(TypeUtilisateurService typeUtilisateurService, TypeUtilisateurMapper typeUtilisateurMapper) {
        this.typeUtilisateurService = typeUtilisateurService;
        this.typeUtilisateurMapper = typeUtilisateurMapper;
    }

    /**
     * Creates a new user type.
     * <p>
     * Requires ADMIN role. Only administrators can create new user types.
     * </p>
     * 
     * @param request The user type creation request
     * @return ResponseEntity containing the created user type information
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TypeUtilisateurResponse> createTypeUtilisateur(@Valid @RequestBody TypeUtilisateurRequest request) {
        TypeUtilisateur type = typeUtilisateurMapper.toEntity(request);
        TypeUtilisateur created = typeUtilisateurService.createTypeUtilisateur(type);
        return new ResponseEntity<>(typeUtilisateurMapper.toResponse(created), HttpStatus.CREATED);
    }

    /**
     * Retrieves a user type by ID.
     * <p>
     * Requires authentication. Any authenticated user can view user types.
     * </p>
     * 
     * @param id The user type ID
     * @return ResponseEntity containing the user type information
     */
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TypeUtilisateurResponse> getTypeUtilisateurById(@PathVariable Long id) {
        TypeUtilisateur type = typeUtilisateurService.getTypeUtilisateurById(id);
        return ResponseEntity.ok(typeUtilisateurMapper.toResponse(type));
    }

    /**
     * Retrieves a user type by label.
     * <p>
     * Requires authentication. Any authenticated user can search user types by label.
     * </p>
     * 
     * @param libelle The user type label (e.g., "VENDEUR", "ADMIN")
     * @return ResponseEntity containing the user type information
     */
    @GetMapping("/libelle/{libelle}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TypeUtilisateurResponse> getTypeUtilisateurByLibelle(@PathVariable String libelle) {
        TypeUtilisateur type = typeUtilisateurService.getTypeUtilisateurByLibelle(libelle);
        return ResponseEntity.ok(typeUtilisateurMapper.toResponse(type));
    }

    /**
     * Retrieves all user types.
     * <p>
     * Requires ADMIN role. Only administrators can list all user types.
     * </p>
     * 
     * @return ResponseEntity containing list of all user types
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TypeUtilisateurResponse>> getAllTypeUtilisateurs() {
        List<TypeUtilisateur> types = typeUtilisateurService.getAllTypeUtilisateurs();
        List<TypeUtilisateurResponse> dtos = types.stream()
                .map(typeUtilisateurMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * Updates a user type's information.
     * <p>
     * Requires ADMIN role. Only administrators can modify user types.
     * </p>
     * 
     * @param id The user type ID to update
     * @param request The updated user type information
     * @return ResponseEntity containing the updated user type information
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TypeUtilisateurResponse> updateTypeUtilisateur(@PathVariable Long id, @Valid @RequestBody TypeUtilisateurRequest request) {
        TypeUtilisateur details = typeUtilisateurMapper.toEntity(request);
        TypeUtilisateur updated = typeUtilisateurService.updateTypeUtilisateur(id, details);
        return ResponseEntity.ok(typeUtilisateurMapper.toResponse(updated));
    }

    /**
     * Deletes a user type.
     * <p>
     * Requires ADMIN role. Only administrators can delete user types.
     * This action is irreversible.
     * </p>
     * 
     * @param id The user type ID to delete
     * @return ResponseEntity with no content
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTypeUtilisateur(@PathVariable Long id) {
        typeUtilisateurService.deleteTypeUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}


