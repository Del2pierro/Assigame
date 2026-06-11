package com.esgis2026.assigame.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
@Table(name = "produit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produit")
    private Long idProduit;

    @Column(name = "nom_produit", nullable = false, length = 150)
    private String nomProduit;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal prix;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "date_ajout", nullable = false)
    private LocalDateTime dateAjout;

    @Column(length = 50)
    private String statut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categorie", nullable = false)
    private CategorieProduit categorieProduit;

    @PrePersist
    protected void onCreate() {
        this.dateAjout = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Produit [idProduit=" + idProduit + ", nomProduit=" + nomProduit + ", description=" + description
                + ", prix=" + prix + ", image=" + Arrays.toString(image) + ", dateAjout=" + dateAjout + ", statut="
                + statut + ", utilisateur=" + utilisateur + ", categorieProduit=" + categorieProduit + "]";
    }
}
