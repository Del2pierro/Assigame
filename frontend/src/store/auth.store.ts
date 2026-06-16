/**
 * @file auth.store.ts
 * @layer Store — Global (Zustand)
 * @role  Store global de session utilisateur. Source de vérité unique
 *        pour l'état d'authentification dans toute l'application.
 *
 * @state
 *  - user           : Profil du vendeur connecté (null si non connecté)
 *  - guestId        : Identifiant UUID de l'acheteur anonyme (persisté en localStorage)
 *  - isAuthenticated: Booléen indiquant si un vendeur est connecté
 *
 * @actions
 *  - setUser()      : Enregistre le profil vendeur après connexion réussie
 *  - clearUser()    : Supprime la session (déconnexion)
 *  - initGuest()    : Génère ou récupère le guestId depuis le localStorage
 *
 * ⚠️ Ce store est mis à jour UNIQUEMENT depuis features/auth/hooks.ts.
 *    Aucun service ne doit écrire dans ce store directement.
 */

// Implémentation à venir (Zustand avec persist middleware)
