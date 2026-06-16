/**
 * @file page.tsx
 * @route  /admin
 * @role   Page d'accueil du tableau de bord administrateur système.
 *         Vue synthétique de la plateforme.
 *         Assemble : AdminStatsCards.
 *
 * @seo
 *  title : "Administration — Assigame"
 *
 * @displays
 *  - Nombre total d'utilisateurs inscrits
 *  - Nombre d'utilisateurs actifs / désactivés
 *  - Nombre total de produits sur la plateforme
 *  - Nombre de catégories disponibles
 *
 * Route PROTÉGÉE — Rôle ADMIN requis (via AdminLayout).
 */

export const metadata = {
  title: "Administration — Assigame",
};

export default function AdminDashboardPage() {
  return null; // À implémenter — assembler AdminStatsCards
}
