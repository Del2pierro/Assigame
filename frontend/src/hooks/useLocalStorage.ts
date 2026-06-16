/**
 * @file useLocalStorage.ts
 * @layer Hooks — Utilitaire
 * @role  Hook générique et typé pour lire et écrire dans le localStorage.
 *        Encapsule les accès bruts au localStorage pour centraliser la logique
 *        et éviter les accès directs depuis les composants.
 *
 *        Gère les cas d'erreur (localStorage indisponible en SSR Next.js)
 *        et synchronise l'état React avec la valeur persistée.
 *
 * @usage  const [value, setValue] = useLocalStorage<string>('ma_cle', 'defaut')
 *
 * ⚠️ Aucun composant ne doit accéder directement à window.localStorage.
 *    Toujours passer par ce hook ou par auth.store.ts.
 */

// Implémentation à venir
