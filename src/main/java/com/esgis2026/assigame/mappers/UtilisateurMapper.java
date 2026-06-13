package com.esgis2026.assigame.mappers;

import com.esgis2026.assigame.dto.UtilisateurRequest;
import com.esgis2026.assigame.dto.UtilisateurResponse;
import com.esgis2026.assigame.entities.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class UtilisateurMapper {

    private final TypeUtilisateurMapper typeUtilisateurMapper;

    public UtilisateurMapper(TypeUtilisateurMapper typeUtilisateurMapper) {
        this.typeUtilisateurMapper = typeUtilisateurMapper;
    }

    public UtilisateurResponse toResponse(Utilisateur entity) {
        if (entity == null) {
            return null;
        }
        UtilisateurResponse response = new UtilisateurResponse();
        response.setIdUtilisateur(entity.getIdUtilisateur());
        response.setNom(entity.getNom());
        response.setPrenom(entity.getPrenom());
        response.setEmail(entity.getEmail());
        response.setLogin(entity.getLogin());
        response.setTelephone(entity.getTelephone());
        response.setAdresse(entity.getAdresse());
        response.setDateInscription(entity.getDateInscription());
        response.setActif(entity.isActif());
        response.setTypeUtilisateur(typeUtilisateurMapper.toResponse(entity.getTypeUtilisateur()));
        return response;
    }

    public Utilisateur toEntity(UtilisateurRequest request) {
        if (request == null) {
            return null;
        }
        Utilisateur entity = new Utilisateur();
        entity.setNom(request.getNom());
        entity.setPrenom(request.getPrenom());
        entity.setEmail(request.getEmail());
        entity.setLogin(request.getLogin());
        entity.setMotDePasse(request.getMotDePasse());
        entity.setTelephone(request.getTelephone());
        entity.setAdresse(request.getAdresse());
        return entity;
    }

    public void updateEntity(UtilisateurRequest request, Utilisateur entity) {
        if (request == null || entity == null) {
            return;
        }
        entity.setNom(request.getNom());
        entity.setPrenom(request.getPrenom());
        entity.setEmail(request.getEmail());
        entity.setLogin(request.getLogin());
        if (request.getMotDePasse() != null && !request.getMotDePasse().isBlank()) {
            entity.setMotDePasse(request.getMotDePasse());
        }
        entity.setTelephone(request.getTelephone());
        entity.setAdresse(request.getAdresse());
    }
}

