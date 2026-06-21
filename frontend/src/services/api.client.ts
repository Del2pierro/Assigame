/**
 * @file api.client.ts
 * @layer Service — Infrastructure
 * @role  Instance Axios partagée et préconfigurée.
 *        Responsabilités :
 *        - Définir la baseURL vers /api (proxy Next.js en dev, URL réelle en prod)
 *        - Intercepteur de REQUÊTE : injecte automatiquement les headers
 *          X-User-Id (vendeur connecté) et X-Guest-Id (acheteur invité)
 *          depuis le localStorage à chaque appel HTTP.
 *        - Intercepteur de RÉPONSE : normalise les erreurs API en un format
 *          cohérent (ApiError) pour toute l'application.
 *
 * @exports api — Instance Axios à utiliser dans tous les services (*.service.ts)
 *
 * ⚠️ Ce fichier est le seul endroit où Axios est configuré.
 *    Ne jamais créer d'autres instances Axios ailleurs dans le projet.
 */

import axios from 'axios';

// Création de l'instance Axios pointant vers le proxy Next.js (/api → http://localhost:8080/api)
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Intercepteur de REQUÊTE.
 * Avant chaque appel HTTP, on lit le localStorage pour injecter :
 * - X-User-Id  : si un vendeur est connecté
 * - X-Guest-Id : si c'est un acheteur invité (anonyme)
 */
api.interceptors.request.use((config) => {
  // Sécurité : localStorage n'existe que côté navigateur
  if (typeof window !== 'undefined') {
    const userId  = localStorage.getItem('user_id');
    const guestId = localStorage.getItem('guest_id');

    if (userId)  config.headers['X-User-Id']  = userId;
    if (guestId) config.headers['X-Guest-Id'] = guestId;
  }
  return config;
});

/**
 * Intercepteur de RÉPONSE.
 * Normalise toutes les erreurs HTTP en un message lisible.
 */
api.interceptors.response.use(
  (response) => response, // Succès : on laisse passer sans modification
  (error) => {
    // On extrait le message d'erreur renvoyé par le backend si disponible
    const message =
      error.response?.data?.message ||
      error.message ||
      'Une erreur inattendue est survenue.';
    return Promise.reject(new Error(message));
  }
);

export default api;
