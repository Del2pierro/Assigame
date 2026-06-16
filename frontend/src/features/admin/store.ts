/**
 * @file store.ts
 * @feature admin
 * @role  Store Zustand de l'espace admin. Maintient l'état de toutes les
 *        sections de l'interface administrateur.
 *
 * @state
 *  // Section utilisateurs
 *  - users              : AdminUserView[] — liste complète des utilisateurs
 *  - selectedUser       : AdminUserView | null — utilisateur en cours de consultation
 *  - userFilter         : AdminFilter — filtres actifs (actif, recherche)
 *
 *  // Section produits (modération)
 *  - allProducts        : Product[] — tous les produits de la plateforme
 *  - productFilter      : AdminFilter — filtres modération (statut, catégorie)
 *
 *  // Section catégories
 *  - categories         : Categorie[] — liste complète des catégories
 *
 *  // États UI transversaux
 *  - isLoading          : boolean
 *  - confirmDialog      : ConfirmDialogState — modale de confirmation globale
 *
 * @actions
 *  // Utilisateurs
 *  - setUsers()
 *  - setSelectedUser()
 *  - setUserFilter()
 *  - updateUserInList()      — mise à jour optimiste après toggle-actif
 *  - removeUserFromList()    — suppression optimiste
 *
 *  // Produits
 *  - setAllProducts()
 *  - setProductFilter()
 *  - removeProductFromList() — suppression admin optimiste
 *
 *  // Catégories
 *  - setCategories()
 *  - addCategory()
 *  - updateCategoryInList()
 *  - removeCategoryFromList()
 *
 *  // UI
 *  - openConfirmDialog()     — ouvre la modale de confirmation
 *  - closeConfirmDialog()
 */

// Implémentation à venir (Zustand)
