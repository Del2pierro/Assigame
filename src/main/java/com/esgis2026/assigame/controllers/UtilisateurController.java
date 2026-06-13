package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.UtilisateurRequest;
import com.esgis2026.assigame.dto.UtilisateurResponse;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.mappers.UtilisateurMapper;
import com.esgis2026.assigame.services.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    private final UtilisateurMapper utilisateurMapper;

    public UtilisateurController(UtilisateurService utilisateurService, UtilisateurMapper utilisateurMapper) {
        this.utilisateurService = utilisateurService;
        this.utilisateurMapper = utilisateurMapper;
    }

    @PostMapping("/register/{idTypeUtilisateur}")
    public ResponseEntity<UtilisateurResponse> registerUtilisateur(@Valid @RequestBody UtilisateurRequest request,
            @PathVariable Long idTypeUtilisateur) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(request);
        Utilisateur registered = utilisateurService.registerUtilisateur(utilisateur, idTypeUtilisateur);
        return new ResponseEntity<>(utilisateurMapper.toResponse(registered), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurResponse> getUtilisateurById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
        return ResponseEntity.ok(utilisateurMapper.toResponse(utilisateur));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UtilisateurResponse> getUtilisateurByEmail(@PathVariable String email) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(email);
        return ResponseEntity.ok(utilisateurMapper.toResponse(utilisateur));
    }

    @GetMapping
    public ResponseEntity<List<UtilisateurResponse>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        List<UtilisateurResponse> dtos = utilisateurs.stream()
                .map(utilisateurMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/actif/{actif}")
    public ResponseEntity<List<UtilisateurResponse>> getUtilisateursByActif(@PathVariable boolean actif) {
        List<Utilisateur> utilisateurs = utilisateurService.getUtilisateursByActif(actif);
        List<UtilisateurResponse> dtos = utilisateurs.stream()
                .map(utilisateurMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurResponse> updateUtilisateur(@PathVariable Long id, @Valid @RequestBody UtilisateurRequest request) {
        Utilisateur details = utilisateurMapper.toEntity(request);
        Utilisateur updated = utilisateurService.updateUtilisateur(id, details);
        return ResponseEntity.ok(utilisateurMapper.toResponse(updated));
    }

    @PatchMapping("/{id}/toggle-actif")
    public ResponseEntity<UtilisateurResponse> toggleUtilisateurActif(@PathVariable Long id) {
        Utilisateur updated = utilisateurService.toggleUtilisateurActif(id);
        return ResponseEntity.ok(utilisateurMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}

