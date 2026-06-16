/**
 * @file page.tsx
 * @route  /admin/utilisateurs/:id
 * @role   Page de détail d'un utilisateur spécifique.
 *         Affiche le profil complet d'un vendeur et les actions admin disponibles.
 *
 * @features
 *  - Affichage complet du profil : GET /api/utilisateurs/{id}
 *    (nom, prénom, email, login, téléphone, adresse, type, statut actif, date d'inscription)
 *  - Bouton "Activer / Désactiver le compte" : PATCH /api/utilisateurs/{id}/toggle-actif
 *  - Bouton "Supprimer définitivement" avec confirmation modale : DELETE /api/utilisateurs/{id}
 *  - Lien retour vers /admin/utilisateurs
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

export const metadata = {
  title: "Détail utilisateur — Admin Assigame",
};

export default function AdminUserDetailPage() {
  return null; // À implémenter — afficher le profil complet + actions admin
}
