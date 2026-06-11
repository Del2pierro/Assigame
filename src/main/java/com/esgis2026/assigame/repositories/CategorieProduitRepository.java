package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.CategorieProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CategorieProduitRepository extends JpaRepository<CategorieProduit, Long> {
    Optional<CategorieProduit> findByNomCategorie(String nomCategorie);
}
