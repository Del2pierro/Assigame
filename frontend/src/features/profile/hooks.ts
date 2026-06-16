/**
 * @file hooks.ts
 * @feature profile
 * @role  Hooks React du profil vendeur.
 *
 * @hooks
 *  useProfile()
 *    - Récupère l'ID depuis store/auth.store.ts
 *    - Charge les données via fetchUserProfile()
 *    - Expose : { profile, isLoading, error }
 *
 *  useProfileUpdate()
 *    - Valide via profileUpdateSchema (validators.ts)
 *    - Appelle saveUserProfile()
 *    - Met à jour store/auth.store.ts si le profil courant change
 *    - Expose : { updateProfile, isSubmitting, updateError }
 */

// Implémentation à venir
