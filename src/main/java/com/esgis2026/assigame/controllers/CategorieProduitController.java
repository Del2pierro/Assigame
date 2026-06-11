package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.services.CategorieProduitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategorieProduitController {

    private final CategorieProduitService categorieProduitService;

    public CategorieProduitController(CategorieProduitService categorieProduitService) {
        this.categorieProduitService = categorieProduitService;
    }

    @PostMapping
    public ResponseEntity<CategorieProduit> createCategorie(@RequestBody CategorieProduit categorie) {
        CategorieProduit created = categorieProduitService.createCategorie(categorie);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategorieProduit> getCategorieById(@PathVariable Long id) {
        CategorieProduit categorie = categorieProduitService.getCategorieById(id);
        return ResponseEntity.ok(categorie);
    }

    @GetMapping
    public ResponseEntity<List<CategorieProduit>> getAllCategories() {
        List<CategorieProduit> categories = categorieProduitService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieProduit> updateCategorie(@PathVariable Long id, @RequestBody CategorieProduit details) {
        CategorieProduit updated = categorieProduitService.updateCategorie(id, details);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        categorieProduitService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }
}
