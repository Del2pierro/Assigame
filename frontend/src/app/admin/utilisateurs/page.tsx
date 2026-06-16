/**
 * @file page.tsx
 * @route  /admin/utilisateurs
 * @role   Page de gestion de tous les utilisateurs de la plateforme.
 *         Assemble : UserTable + filtres (actif/inactif).
 *
 * @features
 *  - Liste complète de tous les utilisateurs inscrits
 *    (vendeurs actifs et désactivés)
 *  - Filtre par statut : GET /api/utilisateurs/actif/{true|false}
 *  - Recherche par email : GET /api/utilisateurs/email/{email}
 *  - Basculement du statut actif/inactif : PATCH /api/utilisateurs/{id}/toggle-actif
 *  - Suppression d'un compte : DELETE /api/utilisateurs/{id}
 *  - Clic sur une ligne → redirige vers /admin/utilisateurs/{id}
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

export const metadata = {
  title: "Gestion des utilisateurs — Admin Assigame",
};

export default function AdminUsersPage() {
  return null; // À implémenter — assembler UserTable
}
