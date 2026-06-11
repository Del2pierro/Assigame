package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    
    // Utile pour la sécurité et l'authentification
    Optional<Utilisateur> findByEmail(String email);
    Optional<Utilisateur> findByLogin(String login);
    
    // Trouver les utilisateurs actifs ou inactifs
    List<Utilisateur> findByActif(boolean actif);
}
