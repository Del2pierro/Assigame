/**
 * @file store.ts
 * @feature auth
 * @role  État local de la feature auth (formulaires uniquement).
 *        NE PAS confondre avec store/auth.store.ts qui gère la SESSION globale.
 *        Ce store gère l'état transitoire des formulaires login/register.
 *
 * @state
 *  - isSubmitting   : boolean — formulaire en cours de soumission
 *  - formError      : string | null — message d'erreur du formulaire
 *  - successMessage : string | null — message de succès post-inscription
 *
 * @actions
 *  - setSubmitting()
 *  - setFormError()
 *  - clearFormState()
 */

// Implémentation à venir (Zustand)
