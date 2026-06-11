package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.TypeUtilisateur;
import com.esgis2026.assigame.repositories.TypeUtilisateurRepository;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TypeUtilisateurService {

    private final TypeUtilisateurRepository typeUtilisateurRepository;

    public TypeUtilisateurService(TypeUtilisateurRepository typeUtilisateurRepository) {
        this.typeUtilisateurRepository = typeUtilisateurRepository;
    }

    public TypeUtilisateur createTypeUtilisateur(TypeUtilisateur type) {
        if (typeUtilisateurRepository.findByLibelle(type.getLibelle()).isPresent()) {
            throw new IllegalArgumentException("Ce type d'utilisateur existe déjà.");
        }
        return typeUtilisateurRepository.save(type);
    }

    @Transactional(readOnly = true)
    public TypeUtilisateur getTypeUtilisateurById(Long id) {
        return typeUtilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Type utilisateur non trouvé avec l'ID : " + id));
    }

    @Transactional(readOnly = true)
    public TypeUtilisateur getTypeUtilisateurByLibelle(String libelle) {
        return typeUtilisateurRepository.findByLibelle(libelle)
                .orElseThrow(() -> new ResourceNotFoundException("Type utilisateur non trouvé avec le libellé : " + libelle));
    }

    @Transactional(readOnly = true)
    public List<TypeUtilisateur> getAllTypeUtilisateurs() {
        return typeUtilisateurRepository.findAll();
    }

    public TypeUtilisateur updateTypeUtilisateur(Long id, TypeUtilisateur details) {
        TypeUtilisateur type = getTypeUtilisateurById(id);
        
        if (!type.getLibelle().equalsIgnoreCase(details.getLibelle()) &&
            typeUtilisateurRepository.findByLibelle(details.getLibelle()).isPresent()) {
            throw new IllegalArgumentException("Ce type d'utilisateur existe déjà.");
        }
        
        type.setLibelle(details.getLibelle());
        type.setDescription(details.getDescription());
        return typeUtilisateurRepository.save(type);
    }

    public void deleteTypeUtilisateur(Long id) {
        TypeUtilisateur type = getTypeUtilisateurById(id);
        typeUtilisateurRepository.delete(type);
    }
}
