/**
 * @file store.ts
 * @feature dashboard
 * @role  Store Zustand local du dashboard vendeur.
 *
 * @state
 *  - sellerProducts : Product[] — articles du vendeur connecté
 *  - stats          : DashboardStats | null — statistiques calculées côté client
 *  - isLoading      : boolean
 *
 * @actions
 *  - setSellerProducts()    — charge et calcule les stats automatiquement
 *  - removeProductFromList()— suppression optimiste
 *  - updateProductStatus()  — mise à jour optimiste du statut dans la liste
 *
 * @note Les stats (totalEnVente, totalVendus, totalReserves) sont calculées
 *       en dérivant la liste sellerProducts, pas depuis l'API.
 */

// Implémentation à venir (Zustand)
