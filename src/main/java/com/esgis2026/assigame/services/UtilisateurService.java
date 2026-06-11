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

@Service
@Transactional
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final TypeUtilisateurRepository typeUtilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurService(UtilisateurRepository utilisateurRepository, 
                              TypeUtilisateurRepository typeUtilisateurRepository,
                              PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.typeUtilisateurRepository = typeUtilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

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

    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'ID : " + id));
    }

    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'email : " + email));
    }

    @Transactional(readOnly = true)
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Utilisateur> getUtilisateursByActif(boolean actif) {
        return utilisateurRepository.findByActif(actif);
    }

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

    public Utilisateur toggleUtilisateurActif(Long id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        utilisateur.setActif(!utilisateur.isActif());
        return utilisateurRepository.save(utilisateur);
    }

    public void deleteUtilisateur(Long id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        utilisateurRepository.delete(utilisateur);
    }
}
