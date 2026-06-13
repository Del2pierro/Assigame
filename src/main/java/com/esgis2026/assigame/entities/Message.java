package com.esgis2026.assigame.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_message")
    private Long idMessage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_conversation", nullable = false)
    private Conversation conversation;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender_type", nullable = false, length = 20)
    private SenderType senderType;

    @Column(name = "sender_id", nullable = false, length = 150)
    private String senderId;

    @Column(name = "contenu", nullable = false, columnDefinition = "TEXT")
    private String contenu;

    @Column(name = "date_envoi", nullable = false, updatable = false)
    private LocalDateTime dateEnvoi;

    @PrePersist
    protected void onCreate() {
        this.dateEnvoi = LocalDateTime.now();
    }
}
