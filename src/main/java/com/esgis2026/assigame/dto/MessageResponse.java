package com.esgis2026.assigame.dto;

import com.esgis2026.assigame.entities.SenderType;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private Long idMessage;
    private Long conversationId;
    private SenderType senderType;
    private String senderId;
    private String content;
    private LocalDateTime dateEnvoi;
}
