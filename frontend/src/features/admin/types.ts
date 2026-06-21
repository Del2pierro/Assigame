/**
 * @file types.ts
 * @feature admin
 * @role  Types TypeScript du domaine administrateur système.
 *
 * @exports
 *  - AdminRole          : Enum { ADMIN = 'ADMIN', VENDEUR = 'VENDEUR' }
 *                         Correspond au champ typeUtilisateur.libelle du backend
 *
 *  - AdminStats         : Vue synthétique de la plateforme
 *    { totalUtilisateurs, utilisateursActifs, utilisateursInactifs,
 *      totalProduits, produitsDisponibles, produitsVendus, totalCategories }
 *
 *  - AdminUserView      : UtilisateurResponse enrichi pour la vue admin
 *    (Utilisateur complet + typeUtilisateur + actif)
 *
 *  - UserToggleResult   : { idUtilisateur, actif } — résultat du toggle-actif
 *
 *  - CategoryPayload    : { nom: string } — payload création/édition catégorie
 *
 *  - AdminFilter        : Filtres transversaux pour les tableaux admin
 *    { search?: string; actif?: boolean; statut?: ProductStatus }
 *
 *  - ConfirmDialogState : { isOpen, targetId, action, message }
 *                         État de la modale de confirmation de suppression
 */

import { ProductStatus, Utilisateur, Produit } from '@/types/models.types';

// --- Rôles admin ---

/** Rôles reconnus dans l'espace administrateur */
export type AdminRole = 'ADMIN' | 'VENDEUR';

// --- Statistiques globales affichées sur la page d'accueil admin ---

/** Chiffres clés de la plateforme à afficher sur le tableau de bord admin */
export interface AdminStats {
  totalUtilisateurs: number;
  utilisateursActifs: number;
  utilisateursInactifs: number;
  totalProduits: number;
  produitsDisponibles: number;
  produitsVendus: number;
  totalCategories: number;
}

// --- Vue enrichie d'un utilisateur pour l'admin ---

/**
 * Représentation d'un utilisateur telle qu'affichée dans le tableau admin.
 * Réutilise le type Utilisateur global (qui contient déjà actif + typeUtilisateur).
 */
export type AdminUserView = Utilisateur;

/** Résultat renvoyé par le backend après un toggle-actif */
export interface UserToggleResult {
  idUtilisateur: number;
  actif: boolean;
}

// --- Payload pour la gestion des catégories ---

/** Corps de la requête pour créer ou modifier une catégorie */
export interface CategoryPayload {
  nom: string;
}

// --- Filtres utilisés dans les tableaux et catalogues admin ---

/**
 * Filtres transversaux appliqués aux listes de l'espace admin.
 * Tous les champs sont optionnels : on peut filtrer par un ou plusieurs critères.
 */
export interface AdminFilter {
  search?: string;        // Recherche texte (nom, email...)
  actif?: boolean;        // Filtre par statut actif/inactif (utilisateurs)
  statut?: ProductStatus; // Filtre par statut produit (DISPONIBLE, RESERVE, VENDU)
}

// --- État de la modale de confirmation de suppression ---

/**
 * Gère l'affichage de la modale de confirmation avant une action irréversible.
 * Exemple : confirmation avant de supprimer un utilisateur ou un produit.
 */
export interface ConfirmDialogState {
  isOpen: boolean;
  targetId: number | null;           // ID de l'élément à supprimer
  action: 'deleteUser' | 'deleteProduct' | 'deleteCategory' | null;
  message: string;                   // Message affiché dans la modale
}
