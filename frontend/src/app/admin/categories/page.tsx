/**
 * @file page.tsx
 * @route  /admin/categories
 * @role   Page de gestion des catégories de produits.
 *         Assemble : CategoryManager (liste + formulaire inline).
 *
 * @features
 *  - Liste de toutes les catégories : GET /api/categories
 *  - Création d'une nouvelle catégorie (bouton → /admin/categories/nouvelle)
 *    ou formulaire inline : POST /api/categories
 *  - Modification d'une catégorie existante : PUT /api/categories/{id}
 *  - Suppression avec confirmation : DELETE /api/categories/{id}
 *    ⚠️ Afficher un avertissement si la catégorie contient des produits actifs
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

export const metadata = {
  title: "Gestion des catégories — Admin Assigame",
};

export default function AdminCategoriesPage() {
  return null; // À implémenter — assembler CategoryManager
}
