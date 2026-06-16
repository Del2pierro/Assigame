/**
 * @file hooks.ts
 * @feature auth
 * @role  Hooks React orchestrant toute la logique d'authentification.
 *        Interface principale que les composants de la feature consomment.
 *
 * @hooks
 *  useLogin()
 *    - Valide le formulaire via loginSchema (validators.ts)
 *    - Appelle loginUser() depuis api.ts
 *    - En succès : met à jour store/auth.store.ts (setUser) + redirige vers /dashboard
 *    - En erreur : met à jour features/auth/store.ts (setFormError)
 *
 *  useRegister()
 *    - Valide le formulaire via registerSchema (validators.ts)
 *    - Appelle registerUser() depuis api.ts
 *    - En succès : redirige vers /login avec message de confirmation
 *    - En erreur : met à jour features/auth/store.ts (setFormError)
 *
 *  useAuthGuard()
 *    - Vérifie si l'utilisateur est authentifié (store/auth.store.ts)
 *    - Redirige vers /login si non authentifié
 *    - Utilisé par components/shared/AuthGuard
 */

// Implémentation à venir
