/**
 * @file store.ts
 * @feature products
 * @role  Store Zustand de la feature products.
 *        Maintient l'état du catalogue en mémoire pour éviter les rechargements inutiles.
 *
 * @state
 *  - products      : Product[] — liste des produits chargés
 *  - selectedProduct: Product | null — produit en cours de consultation
 *  - filters       : ProductFilters — filtres actifs (recherche, catégorie, tri)
 *  - isLoading     : boolean
 *  - error         : string | null
 *
 * @actions
 *  - setProducts()
 *  - setSelectedProduct()
 *  - setFilters()
 *  - removeProduct()       — suppression optimiste après DELETE
 *  - updateProductInList() — mise à jour optimiste du statut
 */

// Implémentation à venir (Zustand)
