/**
 * @file page.tsx
 * @route  /admin/produits
 * @role   Page de modération de tous les produits de la plateforme.
 *         L'admin peut voir et supprimer n'importe quel article.
 *         Assemble : ProductModerationTable.
 *
 * @features
 *  - Liste de TOUS les produits (tous vendeurs confondus) : GET /api/produits
 *  - Affichage : image, nom, prix, statut, vendeur (nom + email)
 *  - Suppression admin d'un article : DELETE /api/produits/{id}
 *  - Filtre par statut (DISPONIBLE / RESERVE / VENDU)
 *  - Filtre par catégorie
 *  - Clic sur un produit → ouvre /produits/{id} dans un nouvel onglet
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

export const metadata = {
  title: "Modération des produits — Admin Assigame",
};

export default function AdminProductsPage() {
  return null; // À implémenter — assembler ProductModerationTable
}
