package com.esgis2026.assigame.config;

import com.esgis2026.assigame.repositories.UtilisateurRepository;
import com.esgis2026.assigame.security.SecurityUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

/**
 * Component to initialize SecurityUtils with required dependencies.
 */
@Component
public class SecurityUtilsConfig {

    private final UtilisateurRepository utilisateurRepository;

    public SecurityUtilsConfig(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    /**
     * Initializes SecurityUtils with the utilisateur repository after construction.
     * This allows SecurityUtils to fetch user data when the principal is a username string.
     */
    @PostConstruct
    public void initializeSecurityUtils() {
        SecurityUtils.setUtilisateurRepository(utilisateurRepository);
    }
}
