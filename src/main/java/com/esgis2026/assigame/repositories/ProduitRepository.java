package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    
    // Trouver les produits publiés par un utilisateur spécifique
    List<Produit> findByUtilisateurIdUtilisateur(Long idUtilisateur);
    
    // Trouver les produits appartenant à une catégorie
    List<Produit> findByCategorieProduitIdCategorie(Long idCategorie);
    
    // Trouver les produits par statut (ex: "DISPONIBLE", "VENDU")
    List<Produit> findByStatut(String statut);
}
