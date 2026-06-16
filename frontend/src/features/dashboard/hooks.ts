/**
 * @file hooks.ts
 * @feature dashboard
 * @role  Hooks React du dashboard vendeur.
 *
 * @hooks
 *  useSellerDashboard()
 *    - Récupère l'ID du vendeur depuis store/auth.store.ts
 *    - Charge ses produits via fetchSellerProducts()
 *    - Calcule et expose les statistiques dérivées
 *    - Expose : { sellerProducts, stats, isLoading, error }
 *
 *  useProductDelete()
 *    - Affiche une confirmation avant suppression
 *    - Appelle removeProduct() puis met à jour le store de façon optimiste
 *    - Expose : { deleteProduct, isDeleting, productIdBeingDeleted }
 *
 *  useStatusUpdate()
 *    - Met à jour le statut d'un produit (DISPONIBLE → RESERVE → VENDU)
 *    - Mise à jour optimiste du store avant la réponse API
 *    - En cas d'erreur : rollback de la mise à jour optimiste
 *    - Expose : { updateStatus, isUpdating }
 */

// Implémentation à venir
