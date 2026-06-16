/**
 * @file layout.tsx
 * @route  /admin/* (toutes les sous-routes de l'espace admin)
 * @role   Layout protégé de l'espace administrateur système.
 *         Double protection :
 *           1. Authentification : vérifie qu'un utilisateur est connecté
 *           2. Rôle ADMIN : vérifie que typeUtilisateur.libelle === 'ADMIN'
 *         Si l'une des deux conditions échoue, redirige vers /login ou /dashboard.
 *
 *         Inclut :
 *         - La sidebar de navigation admin (liens vers les sections)
 *         - Un header avec le nom de l'admin connecté et un bouton déconnexion
 *
 * ⚠️ Ce layout utilise AdminGuard depuis components/shared/AdminGuard
 *    Ne JAMAIS contourner cette protection dans les pages enfants.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return null; // À implémenter — envelopper children avec AdminGuard
}
