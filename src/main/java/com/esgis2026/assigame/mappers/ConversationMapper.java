package com.esgis2026.assigame.mappers;

import com.esgis2026.assigame.dto.ConversationResponse;
import com.esgis2026.assigame.entities.Conversation;
import org.springframework.stereotype.Component;

@Component
public class ConversationMapper {

    private final UtilisateurMapper utilisateurMapper;
    private final ProduitMapper produitMapper;

    public ConversationMapper(UtilisateurMapper utilisateurMapper, ProduitMapper produitMapper) {
        this.utilisateurMapper = utilisateurMapper;
        this.produitMapper = produitMapper;
    }

    public ConversationResponse toResponse(Conversation entity) {
        if (entity == null) {
            return null;
        }
        ConversationResponse response = new ConversationResponse();
        response.setIdConversation(entity.getIdConversation());
        response.setBuyerId(entity.getBuyerId());
        response.setSeller(utilisateurMapper.toResponse(entity.getSeller()));
        response.setProduct(produitMapper.toResponse(entity.getProduct()));
        response.setDateCreation(entity.getDateCreation());
        return response;
    }
}
