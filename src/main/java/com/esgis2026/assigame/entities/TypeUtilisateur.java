package com.esgis2026.assigame.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "type_utilisateur")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeUtilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_utilisateur")
    private Long idTypeUtilisateur;

    @Column(nullable = false, length = 100)
    private String libelle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "typeUtilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Utilisateur> utilisateurs = new ArrayList<>();

    @Override
    public String toString() {
        return "TypeUtilisateur [idTypeUtilisateur=" + idTypeUtilisateur + ", libelle=" + libelle + ", description="
                + description + ", utilisateurs=" + utilisateurs + "]";
    }
}
