package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.TypeUtilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TypeUtilisateurRepository extends JpaRepository<TypeUtilisateur, Long> {
    Optional<TypeUtilisateur> findByLibelle(String libelle);
}
