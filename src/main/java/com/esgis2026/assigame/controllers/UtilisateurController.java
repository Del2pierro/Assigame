package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.services.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping("/register/{idTypeUtilisateur}")
    public ResponseEntity<Utilisateur> registerUtilisateur(@RequestBody Utilisateur utilisateur,
            @PathVariable Long idTypeUtilisateur) {
        Utilisateur registered = utilisateurService.registerUtilisateur(utilisateur, idTypeUtilisateur);
        return new ResponseEntity<>(registered, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
        return ResponseEntity.ok(utilisateur);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Utilisateur> getUtilisateurByEmail(@PathVariable String email) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(email);
        return ResponseEntity.ok(utilisateur);
    }

    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        return ResponseEntity.ok(utilisateurs);
    }

    @GetMapping("/actif/{actif}")
    public ResponseEntity<List<Utilisateur>> getUtilisateursByActif(@PathVariable boolean actif) {
        List<Utilisateur> utilisateurs = utilisateurService.getUtilisateursByActif(actif);
        return ResponseEntity.ok(utilisateurs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur details) {
        Utilisateur updated = utilisateurService.updateUtilisateur(id, details);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/toggle-actif")
    public ResponseEntity<Utilisateur> toggleUtilisateurActif(@PathVariable Long id) {
        Utilisateur updated = utilisateurService.toggleUtilisateurActif(id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
