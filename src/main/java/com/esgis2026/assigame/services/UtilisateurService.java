package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.entities.TypeUtilisateur;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import com.esgis2026.assigame.repositories.TypeUtilisateurRepository;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for user management business logic.
 * <p>
 * Handles user registration, retrieval, update, activation/deactivation, and deletion.
 * Includes password hashing and uniqueness validation for email and login.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Service
@Transactional
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final TypeUtilisateurRepository typeUtilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor for dependency injection.
     * 
     * @param utilisateurRepository Repository for user data access
     * @param typeUtilisateurRepository Repository for user type data access
     * @param passwordEncoder Password encoder for hashing passwords
     */
    public UtilisateurService(UtilisateurRepository utilisateurRepository, 
                              TypeUtilisateurRepository typeUtilisateurRepository,
                              PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.typeUtilisateurRepository = typeUtilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user with a specific user type.
     * <p>
     * Validates email and login uniqueness, hashes the password,
     * associates the user type, and sets the account as active.
     * </p>
     * 
     * @param utilisateur The user entity to register
     * @param idTypeUtilisateur The user type ID (role)
     * @return The registered user entity
     * @throws IllegalArgumentException if email or login already exists
     * @throws ResourceNotFoundException if user type is not found
     */
    public Utilisateur registerUtilisateur(Utilisateur utilisateur, Long idTypeUtilisateur) {
        // Validation unicité email
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Cet email est déjà associé à un compte.");
        }
        // Validation unicité login
        if (utilisateurRepository.findByLogin(utilisateur.getLogin()).isPresent()) {
            throw new IllegalArgumentException("Ce login est déjà pris.");
        }

        // Associer le type d'utilisateur
        TypeUtilisateur type = typeUtilisateurRepository.findById(idTypeUtilisateur)
                .orElseThrow(() -> new ResourceNotFoundException("Type utilisateur non trouvé avec l'ID : " + idTypeUtilisateur));
        utilisateur.setTypeUtilisateur(type);

        // Hachage du mot de passe (Règle de sécurité stricte)
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateur.setActif(true);

        return utilisateurRepository.save(utilisateur);
    }

    /**
     * Retrieves a user by ID.
     * 
     * @param id The user ID
     * @return The user entity
     * @throws ResourceNotFoundException if user is not found
     */
    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'ID : " + id));
    }

    /**
     * Retrieves a user by email.
     * 
     * @param email The user email
     * @return The user entity
     * @throws ResourceNotFoundException if user is not found
     */
    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'email : " + email));
    }

    /**
     * Retrieves all users.
     * 
     * @return List of all users
     */
    @Transactional(readOnly = true)
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    /**
     * Retrieves users by active status.
     * 
     * @param actif The active status (true for active, false for inactive)
     * @return List of users with the specified status
     */
    @Transactional(readOnly = true)
    public List<Utilisateur> getUtilisateursByActif(boolean actif) {
        return utilisateurRepository.findByActif(actif);
    }

    /**
     * Updates a user's information.
     * <p>
     * Validates email uniqueness if changed. Does not update password or user type.
     * </p>
     * 
     * @param id The user ID to update
     * @param details The updated user information
     * @return The updated user entity
     * @throws IllegalArgumentException if email already exists for another user
     */
    public Utilisateur updateUtilisateur(Long id, Utilisateur details) {
        Utilisateur utilisateur = getUtilisateurById(id);

        // Validation unicité email si modifié
        if (!utilisateur.getEmail().equalsIgnoreCase(details.getEmail()) &&
            utilisateurRepository.findByEmail(details.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Cet email est déjà associé à un autre compte.");
        }

        utilisateur.setNom(details.getNom());
        utilisateur.setPrenom(details.getPrenom());
        utilisateur.setEmail(details.getEmail());
        utilisateur.setTelephone(details.getTelephone());
        utilisateur.setAdresse(details.getAdresse());

        return utilisateurRepository.save(utilisateur);
    }

    /**
     * Toggles a user's active status.
     * <p>
     * If active, becomes inactive. If inactive, becomes active.
     * </p>
     * 
     * @param id The user ID
     * @return The updated user entity
     */
    public Utilisateur toggleUtilisateurActif(Long id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        utilisateur.setActif(!utilisateur.isActif());
        return utilisateurRepository.save(utilisateur);
    }

    /**
     * Deletes a user.
     * <p>
     * This action is irreversible.
     * </p>
     * 
     * @param id The user ID to delete
     */
    public void deleteUtilisateur(Long id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        utilisateurRepository.delete(utilisateur);
    }
}
