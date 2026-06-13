package com.esgis2026.assigame.mappers;

import com.esgis2026.assigame.dto.CategorieProduitRequest;
import com.esgis2026.assigame.dto.CategorieProduitResponse;
import com.esgis2026.assigame.entities.CategorieProduit;
import org.springframework.stereotype.Component;

@Component
public class CategorieProduitMapper {

    public CategorieProduitResponse toResponse(CategorieProduit entity) {
        if (entity == null) {
            return null;
        }
        CategorieProduitResponse response = new CategorieProduitResponse();
        response.setIdCategorie(entity.getIdCategorie());
        response.setNomCategorie(entity.getNomCategorie());
        response.setDescription(entity.getDescription());
        return response;
    }

    public CategorieProduit toEntity(CategorieProduitRequest request) {
        if (request == null) {
            return null;
        }
        CategorieProduit entity = new CategorieProduit();
        entity.setNomCategorie(request.getNomCategorie());
        entity.setDescription(request.getDescription());
        return entity;
    }

    public void updateEntity(CategorieProduitRequest request, CategorieProduit entity) {
        if (request == null || entity == null) {
            return;
        }
        entity.setNomCategorie(request.getNomCategorie());
        entity.setDescription(request.getDescription());
    }
}

