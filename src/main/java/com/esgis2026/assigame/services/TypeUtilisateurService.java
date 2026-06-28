package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.TypeUtilisateur;
import com.esgis2026.assigame.repositories.TypeUtilisateurRepository;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for user type (role) management business logic.
 * <p>
 * Handles user type creation, retrieval, update, and deletion.
 * Includes uniqueness validation for user type labels.
 * User types determine user roles and permissions.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Service
@Transactional
public class TypeUtilisateurService {

    private final TypeUtilisateurRepository typeUtilisateurRepository;

    /**
     * Constructor for dependency injection.
     * 
     * @param typeUtilisateurRepository Repository for user type data access
     */
    public TypeUtilisateurService(TypeUtilisateurRepository typeUtilisateurRepository) {
        this.typeUtilisateurRepository = typeUtilisateurRepository;
    }

    /**
     * Creates a new user type.
     * <p>
     * Validates that the user type label is unique.
     * </p>
     * 
     * @param type The user type entity to create
     * @return The created user type entity
     * @throws IllegalArgumentException if user type label already exists
     */
    public TypeUtilisateur createTypeUtilisateur(TypeUtilisateur type) {
        if (typeUtilisateurRepository.findByLibelle(type.getLibelle()).isPresent()) {
            throw new IllegalArgumentException("Ce type d'utilisateur existe déjà.");
        }
        return typeUtilisateurRepository.save(type);
    }

    /**
     * Retrieves a user type by ID.
     * 
     * @param id The user type ID
     * @return The user type entity
     * @throws ResourceNotFoundException if user type is not found
     */
    @Transactional(readOnly = true)
    public TypeUtilisateur getTypeUtilisateurById(Long id) {
        return typeUtilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Type utilisateur non trouvé avec l'ID : " + id));
    }

    /**
     * Retrieves a user type by label.
     * 
     * @param libelle The user type label (e.g., "VENDEUR", "ADMIN")
     * @return The user type entity
     * @throws ResourceNotFoundException if user type is not found
     */
    @Transactional(readOnly = true)
    public TypeUtilisateur getTypeUtilisateurByLibelle(String libelle) {
        return typeUtilisateurRepository.findByLibelle(libelle)
                .orElseThrow(() -> new ResourceNotFoundException("Type utilisateur non trouvé avec le libellé : " + libelle));
    }

    /**
     * Retrieves all user types.
     * 
     * @return List of all user types
     */
    @Transactional(readOnly = true)
    public List<TypeUtilisateur> getAllTypeUtilisateurs() {
        return typeUtilisateurRepository.findAll();
    }

    /**
     * Updates a user type's information.
     * <p>
     * Validates label uniqueness if changed.
     * </p>
     * 
     * @param id The user type ID to update
     * @param details The updated user type information
     * @return The updated user type entity
     * @throws IllegalArgumentException if user type label already exists
     */
    public TypeUtilisateur updateTypeUtilisateur(Long id, TypeUtilisateur details) {
        TypeUtilisateur type = getTypeUtilisateurById(id);
        
        if (!type.getLibelle().equalsIgnoreCase(details.getLibelle()) &&
            typeUtilisateurRepository.findByLibelle(details.getLibelle()).isPresent()) {
            throw new IllegalArgumentException("Ce type d'utilisateur existe déjà.");
        }
        
        type.setLibelle(details.getLibelle());
        type.setDescription(details.getDescription());
        return typeUtilisateurRepository.save(type);
    }

    /**
     * Deletes a user type.
     * <p>
     * This action is irreversible.
     * </p>
     * 
     * @param id The user type ID to delete
     */
    public void deleteTypeUtilisateur(Long id) {
        TypeUtilisateur type = getTypeUtilisateurById(id);
        typeUtilisateurRepository.delete(type);
    }
}
