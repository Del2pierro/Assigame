package com.esgis2026.assigame.mappers;

import com.esgis2026.assigame.dto.ProduitRequest;
import com.esgis2026.assigame.dto.ProduitResponse;
import com.esgis2026.assigame.entities.Produit;
import org.springframework.stereotype.Component;

@Component
public class ProduitMapper {

    private final CategorieProduitMapper categorieProduitMapper;

    public ProduitMapper(CategorieProduitMapper categorieProduitMapper) {
        this.categorieProduitMapper = categorieProduitMapper;
    }

    public ProduitResponse toResponse(Produit entity) {
        if (entity == null) {
            return null;
        }
        ProduitResponse response = new ProduitResponse();
        response.setIdProduit(entity.getIdProduit());
        response.setNomProduit(entity.getNomProduit());
        response.setDescription(entity.getDescription());
        response.setPrix(entity.getPrix());
        response.setImage(entity.getImage());
        response.setDateAjout(entity.getDateAjout());
        response.setStatut(entity.getStatut());
        if (entity.getUtilisateur() != null) {
            response.setIdUtilisateur(entity.getUtilisateur().getIdUtilisateur());
        }
        response.setCategorie(categorieProduitMapper.toResponse(entity.getCategorieProduit()));
        return response;
    }

    public Produit toEntity(ProduitRequest request) {
        if (request == null) {
            return null;
        }
        Produit entity = new Produit();
        entity.setNomProduit(request.getNomProduit());
        entity.setDescription(request.getDescription());
        entity.setPrix(request.getPrix());
        entity.setImage(request.getImage());
        return entity;
    }

    public void updateEntity(ProduitRequest request, Produit entity) {
        if (request == null || entity == null) {
            return;
        }
        entity.setNomProduit(request.getNomProduit());
        entity.setDescription(request.getDescription());
        entity.setPrix(request.getPrix());
        if (request.getImage() != null) {
            entity.setImage(request.getImage());
        }
    }
}

