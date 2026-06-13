package com.esgis2026.assigame.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "conversation", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"buyer_id", "id_utilisateur", "id_produit"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_conversation")
    private Long idConversation;

    @Column(name = "buyer_id", nullable = false, length = 150)
    private String buyerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_produit", nullable = false)
    private Produit product;

    @Column(name = "date_creation", nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
    }
}
