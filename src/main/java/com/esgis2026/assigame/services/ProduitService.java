package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.repositories.ProduitRepository;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import com.esgis2026.assigame.repositories.CategorieProduitRepository;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final CategorieProduitRepository categorieProduitRepository;

    public ProduitService(ProduitRepository produitRepository, 
                          UtilisateurRepository utilisateurRepository,
                          CategorieProduitRepository categorieProduitRepository) {
        this.produitRepository = produitRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.categorieProduitRepository = categorieProduitRepository;
    }

    public Produit createProduit(Produit produit, Long idUtilisateur, Long idCategorie) {
        Utilisateur utilisateur = utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur non trouvé avec l'ID : " + idUtilisateur));
        
        // Règle de gestion : Seul un utilisateur actif peut publier un produit
        if (!utilisateur.isActif()) {
            throw new IllegalStateException("Un utilisateur inactif ne peut pas publier de produit.");
        }

        CategorieProduit categorie = categorieProduitRepository.findById(idCategorie)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée avec l'ID : " + idCategorie));

        produit.setUtilisateur(utilisateur);
        produit.setCategorieProduit(categorie);
        produit.setStatut("DISPONIBLE"); // Statut par défaut à la création

        return produitRepository.save(produit);
    }

    @Transactional(readOnly = true)
    public Produit getProduitById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'ID : " + id));
    }

    @Transactional(readOnly = true)
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Produit> getProduitsByUtilisateur(Long idUtilisateur) {
        return produitRepository.findByUtilisateurIdUtilisateur(idUtilisateur);
    }

    @Transactional(readOnly = true)
    public List<Produit> getProduitsByCategorie(Long idCategorie) {
        return produitRepository.findByCategorieProduitIdCategorie(idCategorie);
    }

    @Transactional(readOnly = true)
    public List<Produit> getProduitsByStatut(String statut) {
        return produitRepository.findByStatut(statut);
    }

    public Produit updateProduit(Long id, Produit details) {
        Produit produit = getProduitById(id);

        produit.setNomProduit(details.getNomProduit());
        produit.setDescription(details.getDescription());
        produit.setPrix(details.getPrix());
        if (details.getImage() != null) {
            produit.setImage(details.getImage());
        }

        return produitRepository.save(produit);
    }

    public Produit changerStatutProduit(Long id, String nouveauStatut) {
        Produit produit = getProduitById(id);
        produit.setStatut(nouveauStatut);
        return produitRepository.save(produit);
    }

    public void deleteProduit(Long id) {
        Produit produit = getProduitById(id);
        produitRepository.delete(produit);
    }
}
