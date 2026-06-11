package com.esgis2026.assigame.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorie_produit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategorieProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categorie")
    private Long idCategorie;

    @Column(name = "nom_categorie", nullable = false, length = 100)
    private String nomCategorie;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "categorieProduit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produit> produits = new ArrayList<>();

    @Override
    public String toString() {
        return "CategorieProduit [idCategorie=" + idCategorie + ", nomCategorie=" + nomCategorie + ", description="
                + description + ", produits=" + produits + "]";
    }
}
