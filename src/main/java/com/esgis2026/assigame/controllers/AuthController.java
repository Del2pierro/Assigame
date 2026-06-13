package com.esgis2026.assigame.controllers;

import com.esgis2026.assigame.dto.LoginRequest;
import com.esgis2026.assigame.dto.UtilisateurResponse;
import com.esgis2026.assigame.entities.Utilisateur;
import com.esgis2026.assigame.exceptions.UnauthorizedException;
import com.esgis2026.assigame.mappers.UtilisateurMapper;
import com.esgis2026.assigame.repositories.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final UtilisateurMapper utilisateurMapper;

    public AuthController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder, UtilisateurMapper utilisateurMapper) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.utilisateurMapper = utilisateurMapper;
    }

    @PostMapping("/login")
    public ResponseEntity<UtilisateurResponse> login(@Valid @RequestBody LoginRequest request) {
        Utilisateur user = utilisateurRepository.findByLogin(request.getLogin())
                .or(() -> utilisateurRepository.findByEmail(request.getLogin()))
                .orElseThrow(() -> new UnauthorizedException("Identifiants incorrects"));

        if (!user.isActif()) {
            throw new UnauthorizedException("Ce compte est désactivé.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getMotDePasse())) {
            throw new UnauthorizedException("Identifiants incorrects");
        }

        return ResponseEntity.ok(utilisateurMapper.toResponse(user));
    }
}

