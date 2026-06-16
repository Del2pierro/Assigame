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

// Implémentation à venir
