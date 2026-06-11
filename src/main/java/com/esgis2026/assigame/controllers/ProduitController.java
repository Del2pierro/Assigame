package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.services.ProduitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @PostMapping("/utilisateur/{idUtilisateur}/categorie/{idCategorie}")
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit, 
                                                 @PathVariable Long idUtilisateur, 
                                                 @PathVariable Long idCategorie) {
        Produit created = produitService.createProduit(produit, idUtilisateur, idCategorie);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Produit produit = produitService.getProduitById(id);
        return ResponseEntity.ok(produit);
    }

    @GetMapping
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = produitService.getAllProduits();
        return ResponseEntity.ok(produits);
    }

    @GetMapping("/utilisateur/{idUtilisateur}")
    public ResponseEntity<List<Produit>> getProduitsByUtilisateur(@PathVariable Long idUtilisateur) {
        List<Produit> produits = produitService.getProduitsByUtilisateur(idUtilisateur);
        return ResponseEntity.ok(produits);
    }

    @GetMapping("/categorie/{idCategorie}")
    public ResponseEntity<List<Produit>> getProduitsByCategorie(@PathVariable Long idCategorie) {
        List<Produit> produits = produitService.getProduitsByCategorie(idCategorie);
        return ResponseEntity.ok(produits);
    }
 
    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Produit>> getProduitsByStatut(@PathVariable String statut) {
        List<Produit> produits = produitService.getProduitsByStatut(statut);
        return ResponseEntity.ok(produits);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit details) {
        Produit updated = produitService.updateProduit(id, details);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/statut/{nouveauStatut}")
    public ResponseEntity<Produit> changerStatutProduit(@PathVariable Long id, @PathVariable String nouveauStatut) {
        Produit updated = produitService.changerStatutProduit(id, nouveauStatut);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }
}
