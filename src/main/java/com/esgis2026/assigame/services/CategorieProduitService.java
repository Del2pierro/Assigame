package com.esgis2026.assigame.services;

import com.esgis2026.assigame.entities.CategorieProduit;
import com.esgis2026.assigame.repositories.CategorieProduitRepository;
import com.esgis2026.assigame.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategorieProduitService {
    
    private final CategorieProduitRepository categorieProduitRepository;

    public CategorieProduitService(CategorieProduitRepository categorieProduitRepository) {
        this.categorieProduitRepository = categorieProduitRepository;
    }

    public CategorieProduit createCategorie(CategorieProduit categorie) {
        if (categorieProduitRepository.findByNomCategorie(categorie.getNomCategorie()).isPresent()) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà.");
        }
        return categorieProduitRepository.save(categorie);
    }

    @Transactional(readOnly = true)
    public CategorieProduit getCategorieById(Long id) {
        return categorieProduitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée avec l'ID : " + id));
    }

    @Transactional(readOnly = true)
    public List<CategorieProduit> getAllCategories() {
        return categorieProduitRepository.findAll();
    }

    public CategorieProduit updateCategorie(Long id, CategorieProduit details) {
        CategorieProduit categorie = getCategorieById(id);
        
        // Validation unicité si le nom change
        if (!categorie.getNomCategorie().equalsIgnoreCase(details.getNomCategorie()) &&
            categorieProduitRepository.findByNomCategorie(details.getNomCategorie()).isPresent()) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà.");
        }
        
        categorie.setNomCategorie(details.getNomCategorie());
        categorie.setDescription(details.getDescription());
        return categorieProduitRepository.save(categorie);
    }

    public void deleteCategorie(Long id) {
        CategorieProduit categorie = getCategorieById(id);
        categorieProduitRepository.delete(categorie);
    }
}
