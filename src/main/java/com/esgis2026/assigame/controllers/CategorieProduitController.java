package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.CategorieProduitRequest;
import com.esgis2026.assigame.dto.CategorieProduitResponse;
import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.mappers.CategorieProduitMapper;
import com.esgis2026.assigame.services.CategorieProduitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategorieProduitController {

    private final CategorieProduitService categorieProduitService;
    private final CategorieProduitMapper categorieProduitMapper;

    public CategorieProduitController(CategorieProduitService categorieProduitService, CategorieProduitMapper categorieProduitMapper) {
        this.categorieProduitService = categorieProduitService;
        this.categorieProduitMapper = categorieProduitMapper;
    }

    @PostMapping
    public ResponseEntity<CategorieProduitResponse> createCategorie(@Valid @RequestBody CategorieProduitRequest request) {
        CategorieProduit categorie = categorieProduitMapper.toEntity(request);
        CategorieProduit created = categorieProduitService.createCategorie(categorie);
        return new ResponseEntity<>(categorieProduitMapper.toResponse(created), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategorieProduitResponse> getCategorieById(@PathVariable Long id) {
        CategorieProduit categorie = categorieProduitService.getCategorieById(id);
        return ResponseEntity.ok(categorieProduitMapper.toResponse(categorie));
    }

    @GetMapping
    public ResponseEntity<List<CategorieProduitResponse>> getAllCategories() {
        List<CategorieProduit> categories = categorieProduitService.getAllCategories();
        List<CategorieProduitResponse> dtos = categories.stream()
                .map(categorieProduitMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieProduitResponse> updateCategorie(@PathVariable Long id, @Valid @RequestBody CategorieProduitRequest request) {
        CategorieProduit details = categorieProduitMapper.toEntity(request);
        CategorieProduit updated = categorieProduitService.updateCategorie(id, details);
        return ResponseEntity.ok(categorieProduitMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        categorieProduitService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }
}


