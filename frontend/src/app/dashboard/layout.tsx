/**
 * @file layout.tsx
 * @route  /dashboard/* (toutes les sous-routes du dashboard)
 * @role   Layout protégé du dashboard vendeur. Enveloppe toutes les routes
 *         /dashboard avec le composant AuthGuard qui bloque les utilisateurs
 *         non authentifiés et les redirige vers /login.
 *         Peut également inclure une sidebar de navigation spécifique au dashboard.
 */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return null; // À implémenter — envelopper children avec AuthGuard
}
