package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.TypeUtilisateurRequest;
import com.esgis2026.assigame.dto.TypeUtilisateurResponse;
import com.esgis2026.assigame.entities.TypeUtilisateur;
import com.esgis2026.assigame.mappers.TypeUtilisateurMapper;
import com.esgis2026.assigame.services.TypeUtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/types-utilisateurs")
public class TypeUtilisateurController {

    private final TypeUtilisateurService typeUtilisateurService;
    private final TypeUtilisateurMapper typeUtilisateurMapper;

    public TypeUtilisateurController(TypeUtilisateurService typeUtilisateurService, TypeUtilisateurMapper typeUtilisateurMapper) {
        this.typeUtilisateurService = typeUtilisateurService;
        this.typeUtilisateurMapper = typeUtilisateurMapper;
    }

    @PostMapping
    public ResponseEntity<TypeUtilisateurResponse> createTypeUtilisateur(@Valid @RequestBody TypeUtilisateurRequest request) {
        TypeUtilisateur type = typeUtilisateurMapper.toEntity(request);
        TypeUtilisateur created = typeUtilisateurService.createTypeUtilisateur(type);
        return new ResponseEntity<>(typeUtilisateurMapper.toResponse(created), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeUtilisateurResponse> getTypeUtilisateurById(@PathVariable Long id) {
        TypeUtilisateur type = typeUtilisateurService.getTypeUtilisateurById(id);
        return ResponseEntity.ok(typeUtilisateurMapper.toResponse(type));
    }

    @GetMapping("/libelle/{libelle}")
    public ResponseEntity<TypeUtilisateurResponse> getTypeUtilisateurByLibelle(@PathVariable String libelle) {
        TypeUtilisateur type = typeUtilisateurService.getTypeUtilisateurByLibelle(libelle);
        return ResponseEntity.ok(typeUtilisateurMapper.toResponse(type));
    }

    @GetMapping
    public ResponseEntity<List<TypeUtilisateurResponse>> getAllTypeUtilisateurs() {
        List<TypeUtilisateur> types = typeUtilisateurService.getAllTypeUtilisateurs();
        List<TypeUtilisateurResponse> dtos = types.stream()
                .map(typeUtilisateurMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeUtilisateurResponse> updateTypeUtilisateur(@PathVariable Long id, @Valid @RequestBody TypeUtilisateurRequest request) {
        TypeUtilisateur details = typeUtilisateurMapper.toEntity(request);
        TypeUtilisateur updated = typeUtilisateurService.updateTypeUtilisateur(id, details);
        return ResponseEntity.ok(typeUtilisateurMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeUtilisateur(@PathVariable Long id) {
        typeUtilisateurService.deleteTypeUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}


