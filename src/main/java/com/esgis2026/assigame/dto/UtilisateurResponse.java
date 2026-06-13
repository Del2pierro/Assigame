package com.esgis2026.assigame.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurResponse {
    private Long idUtilisateur;
    private String nom;
    private String prenom;
    private String email;
    private String login;
    private String telephone;
    private String adresse;
    private LocalDateTime dateInscription;
    private boolean actif;
    private TypeUtilisateurResponse typeUtilisateur;
}
