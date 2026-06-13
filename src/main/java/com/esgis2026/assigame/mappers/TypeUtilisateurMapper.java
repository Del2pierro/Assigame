package com.esgis2026.assigame.mappers;

import com.esgis2026.assigame.dto.TypeUtilisateurRequest;
import com.esgis2026.assigame.dto.TypeUtilisateurResponse;
import com.esgis2026.assigame.entities.TypeUtilisateur;
import org.springframework.stereotype.Component;

@Component
public class TypeUtilisateurMapper {

    public TypeUtilisateurResponse toResponse(TypeUtilisateur entity) {
        if (entity == null) {
            return null;
        }
        TypeUtilisateurResponse response = new TypeUtilisateurResponse();
        response.setIdTypeUtilisateur(entity.getIdTypeUtilisateur());
        response.setLibelle(entity.getLibelle());
        response.setDescription(entity.getDescription());
        return response;
    }

    public TypeUtilisateur toEntity(TypeUtilisateurRequest request) {
        if (request == null) {
            return null;
        }
        TypeUtilisateur entity = new TypeUtilisateur();
        entity.setLibelle(request.getLibelle());
        entity.setDescription(request.getDescription());
        return entity;
    }

    public void updateEntity(TypeUtilisateurRequest request, TypeUtilisateur entity) {
        if (request == null || entity == null) {
            return;
        }
        entity.setLibelle(request.getLibelle());
        entity.setDescription(request.getDescription());
    }
}

