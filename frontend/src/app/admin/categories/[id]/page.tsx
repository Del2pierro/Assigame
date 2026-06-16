/**
 * @file page.tsx
 * @route  /admin/categories/:id
 * @role   Formulaire d'édition d'une catégorie existante.
 *         Pré-remplit le nom depuis GET /api/categories/{id}.
 *
 * @features
 *  - Champ : Nom de la catégorie (pré-rempli)
 *  - Soumission : PUT /api/categories/{id}
 *  - Après succès : redirige vers /admin/categories
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

export const metadata = {
  title: "Modifier la catégorie — Admin Assigame",
};

export default function AdminEditCategoryPage() {
  return null; // À implémenter — formulaire d'édition catégorie
}
