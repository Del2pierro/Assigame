/**
 * @file validators.ts
 * @layer Lib — Utilitaires
 * @role  Schémas de validation des formulaires avec Zod.
 *        Définit les règles de validation pour chaque formulaire de l'application.
 *        Ces schémas sont utilisés dans les hooks de feature pour valider
 *        les données avant envoi à l'API.
 *
 * @exports
 *  - loginSchema        : Email + mot de passe (requis, format email)
 *  - registerSchema     : Tous les champs d'inscription avec contraintes
 *  - productSchema      : Nom, prix (>0), description, catégorie (requis)
 *  - profileUpdateSchema: Champs modifiables du profil vendeur
 *
 * ⚠️ Aucune validation ne doit être faite directement dans les composants.
 *    Toujours utiliser ces schémas via react-hook-form + zodResolver.
 */

// Implémentation à venir (nécessite: npm install zod)
