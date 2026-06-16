/**
 * @file api.ts
 * @feature admin
 * @role  Pont entre la feature admin et les services HTTP.
 *        Regroupe TOUS les appels nécessaires à l'administration système.
 *        Utilise user.service.ts et product.service.ts via leurs services respectifs.
 *
 * @section Utilisateurs  (/api/utilisateurs)
 *  - fetchAllUsers()                 → GET  /api/utilisateurs
 *                                      Retourne tous les utilisateurs inscrits
 *
 *  - fetchUsersByStatus(actif)       → GET  /api/utilisateurs/actif/{actif}
 *                                      Filtre les utilisateurs par statut actif/inactif
 *
 *  - fetchUserByEmail(email)         → GET  /api/utilisateurs/email/{email}
 *                                      Recherche un utilisateur par email
 *
 *  - fetchUserById(id)               → GET  /api/utilisateurs/{id}
 *                                      Détail complet d'un utilisateur
 *
 *  - toggleUserStatus(id)            → PATCH /api/utilisateurs/{id}/toggle-actif
 *                                      Bascule actif ↔ inactif
 *
 *  - deleteUser(id)                  → DELETE /api/utilisateurs/{id}
 *                                      Suppression définitive du compte
 *
 * @section Catégories  (/api/categories)
 *  - fetchAllCategories()            → GET    /api/categories
 *  - createCategory(payload)         → POST   /api/categories
 *  - updateCategory(id, payload)     → PUT    /api/categories/{id}
 *  - deleteCategory(id)              → DELETE /api/categories/{id}
 *
 * @section Produits (modération)  (/api/produits)
 *  - fetchAllProductsAdmin()         → GET    /api/produits
 *                                      Tous les produits toutes plateformes
 *  - deleteProductAdmin(id)          → DELETE /api/produits/{id}
 *                                      Suppression admin sans restriction
 *
 * ⚠️ Toutes ces fonctions ne sont appelables que depuis les hooks admin.
 *    Aucun composant ne doit les importer directement.
 */

// Implémentation à venir — utilise user.service.ts et product.service.ts
