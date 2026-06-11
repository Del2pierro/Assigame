package com.esgis2026.assigame.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "utilisateur")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utilisateur")
    private Long idUtilisateur;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 100)
    private String prenom;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, unique = true, length = 50)
    private String login;

    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;

    @Column(length = 20)
    private String telephone;

    private String adresse;

    @Column(name = "date_inscription", nullable = false, updatable = false)
    private LocalDateTime dateInscription;

    @Column(nullable = false)
    private boolean actif = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_type_utilisateur", nullable = false)
    private TypeUtilisateur typeUtilisateur;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produit> produits = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.dateInscription = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Utilisateur [idUtilisateur=" + idUtilisateur + ", nom=" + nom + ", prenom=" + prenom + ", email="
                + email + ", login=" + login + ", motDePasse=" + motDePasse + ", telephone=" + telephone + ", adresse="
                + adresse + ", dateInscription=" + dateInscription + ", actif=" + actif + ", typeUtilisateur="
                + typeUtilisateur + ", produits=" + produits + "]";
    }
}
