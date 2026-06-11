package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.entities.TypeUtilisateur;
import com.esgis2026.assigame.services.TypeUtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/types-utilisateurs")
public class TypeUtilisateurController {

    private final TypeUtilisateurService typeUtilisateurService;

    public TypeUtilisateurController(TypeUtilisateurService typeUtilisateurService) {
        this.typeUtilisateurService = typeUtilisateurService;
    }

    @PostMapping
    public ResponseEntity<TypeUtilisateur> createTypeUtilisateur(@RequestBody TypeUtilisateur type) {
        TypeUtilisateur created = typeUtilisateurService.createTypeUtilisateur(type);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeUtilisateur> getTypeUtilisateurById(@PathVariable Long id) {
        TypeUtilisateur type = typeUtilisateurService.getTypeUtilisateurById(id);
        return ResponseEntity.ok(type);
    }

    @GetMapping("/libelle/{libelle}")
    public ResponseEntity<TypeUtilisateur> getTypeUtilisateurByLibelle(@PathVariable String libelle) {
        TypeUtilisateur type = typeUtilisateurService.getTypeUtilisateurByLibelle(libelle);
        return ResponseEntity.ok(type);
    }

    @GetMapping
    public ResponseEntity<List<TypeUtilisateur>> getAllTypeUtilisateurs() {
        List<TypeUtilisateur> types = typeUtilisateurService.getAllTypeUtilisateurs();
        return ResponseEntity.ok(types);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeUtilisateur> updateTypeUtilisateur(@PathVariable Long id, @RequestBody TypeUtilisateur details) {
        TypeUtilisateur updated = typeUtilisateurService.updateTypeUtilisateur(id, details);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeUtilisateur(@PathVariable Long id) {
        typeUtilisateurService.deleteTypeUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
