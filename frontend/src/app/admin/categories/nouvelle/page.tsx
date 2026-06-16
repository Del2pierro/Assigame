/**
 * @file page.tsx
 * @route  /admin/categories/nouvelle
 * @role   Formulaire de création d'une nouvelle catégorie.
 *         Peut aussi être géré en modale depuis /admin/categories.
 *         Cette route existe pour le cas où un formulaire pleine page est préféré.
 *
 * @features
 *  - Champ : Nom de la catégorie (requis, unique)
 *  - Soumission : POST /api/categories
 *  - Après succès : redirige vers /admin/categories avec message de confirmation
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

export const metadata = {
  title: "Nouvelle catégorie — Admin Assigame",
};

export default function AdminNewCategoryPage() {
  return null; // À implémenter — formulaire de création catégorie
}
