package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.ProduitRequest;
import com.esgis2026.assigame.dto.ProduitResponse;
import com.esgis2026.assigame.entities.Produit;
import com.esgis2026.assigame.mappers.ProduitMapper;
import com.esgis2026.assigame.services.ProduitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;
    private final ProduitMapper produitMapper;

    public ProduitController(ProduitService produitService, ProduitMapper produitMapper) {
        this.produitService = produitService;
        this.produitMapper = produitMapper;
    }

    @PostMapping("/utilisateur/{idUtilisateur}/categorie/{idCategorie}")
    public ResponseEntity<ProduitResponse> createProduit(@Valid @RequestBody ProduitRequest request, 
                                                 @PathVariable Long idUtilisateur, 
                                                 @PathVariable Long idCategorie) {
        Produit produit = produitMapper.toEntity(request);
        Produit created = produitService.createProduit(produit, idUtilisateur, idCategorie);
        return new ResponseEntity<>(produitMapper.toResponse(created), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProduitResponse> getProduitById(@PathVariable Long id) {
        Produit produit = produitService.getProduitById(id);
        return ResponseEntity.ok(produitMapper.toResponse(produit));
    }

    @GetMapping
    public ResponseEntity<List<ProduitResponse>> getAllProduits() {
        List<Produit> produits = produitService.getAllProduits();
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/utilisateur/{idUtilisateur}")
    public ResponseEntity<List<ProduitResponse>> getProduitsByUtilisateur(@PathVariable Long idUtilisateur) {
        List<Produit> produits = produitService.getProduitsByUtilisateur(idUtilisateur);
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/categorie/{idCategorie}")
    public ResponseEntity<List<ProduitResponse>> getProduitsByCategorie(@PathVariable Long idCategorie) {
        List<Produit> produits = produitService.getProduitsByCategorie(idCategorie);
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
 
    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<ProduitResponse>> getProduitsByStatut(@PathVariable String statut) {
        List<Produit> produits = produitService.getProduitsByStatut(statut);
        List<ProduitResponse> dtos = produits.stream()
                .map(produitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProduitResponse> updateProduit(@PathVariable Long id, @Valid @RequestBody ProduitRequest request) {
        Produit details = produitMapper.toEntity(request);
        Produit updated = produitService.updateProduit(id, details);
        return ResponseEntity.ok(produitMapper.toResponse(updated));
    }

    @PatchMapping("/{id}/statut/{nouveauStatut}")
    public ResponseEntity<ProduitResponse> changerStatutProduit(@PathVariable Long id, @PathVariable String nouveauStatut) {
        Produit updated = produitService.changerStatutProduit(id, nouveauStatut);
        return ResponseEntity.ok(produitMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }
}

