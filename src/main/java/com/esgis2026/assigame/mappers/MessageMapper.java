package com.esgis2026.assigame.mappers;

import com.esgis2026.assigame.dto.MessageResponse;
import com.esgis2026.assigame.entities.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {

    public MessageResponse toResponse(Message entity) {
        if (entity == null) {
            return null;
        }
        MessageResponse response = new MessageResponse();
        response.setIdMessage(entity.getIdMessage());
        if (entity.getConversation() != null) {
            response.setConversationId(entity.getConversation().getIdConversation());
        }
        response.setSenderType(entity.getSenderType());
        response.setSenderId(entity.getSenderId());
        response.setContenu(entity.getContenu());
        response.setDateEnvoi(entity.getDateEnvoi());
        return response;
    }
}
