package com.esgis2026.assigame.dto;

import com.esgis2026.assigame.entities.SenderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {

    @NotNull(message = "L'identifiant de la conversation est obligatoire.")
    private Long conversationId;

    @NotNull(message = "Le type d'expéditeur (BUYER/SELLER) est obligatoire.")
    private SenderType senderType;

    @NotBlank(message = "L'identifiant de l'expéditeur est obligatoire.")
    private String senderId;

    @NotBlank(message = "Le contenu du message ne peut pas être vide.")
    private String content;
}

