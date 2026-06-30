/**
 * @file api.client.ts
 * @layer Service — Infrastructure
 * @role  Instance Axios partagée et préconfigurée.
 *        Responsabilités :
 *        - Définir la baseURL vers /api (proxy Next.js en dev, URL réelle en prod)
 *        - Intercepteur de REQUÊTE : injecte automatiquement le header Authorization
 *          avec le JWT token depuis le localStorage à chaque appel HTTP.
 *        - Intercepteur de RÉPONSE : normalise les erreurs API en un format
 *          cohérent (ApiError) pour toute l'application.
 *        - Logging clair pour le debugging des requêtes/réponses.
 *
 * @exports api — Instance Axios à utiliser dans tous les services (*.service.ts)
 *
 * ⚠️ Ce fichier est le seul endroit où Axios est configuré.
 *    Ne jamais créer d'autres instances Axios ailleurs dans le projet.
 */

/* eslint-disable no-console */
import axios from 'axios';

// Création de l'instance Axios pointant vers le proxy Next.js (/api → http://localhost:8080/api)
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Intercepteur de REQUÊTE.
 * Avant chaque appel HTTP, on lit le localStorage pour injecter :
 * - Authorization : Bearer token JWT pour l'authentification
 * 
 * Logs clairs pour le debugging des requêtes sortantes.
 */
api.interceptors.request.use((config) => {
  // Sécurité : localStorage n'existe que côté navigateur
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Intercepteur de RÉPONSE.
 * Normalise toutes les erreurs HTTP en un message lisible.
 * Logs clairs pour le debugging des réponses et erreurs.
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion 401 : seulement si c'était une requête authentifiée (token présent)
    // Pour la requête de login initiale, on laisse l'erreur passer normalement
    const hasToken = error.config?.headers?.['Authorization']?.startsWith('Bearer ');
    
    if (error.response?.status === 401 && hasToken && typeof window !== 'undefined') {
      // Déconnexion automatique
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('guest_id');
      // Redirection vers login avec message d'erreur
      window.location.href = '/login?error=session_expired';
      return Promise.reject(new Error('Session expirée. Veuillez vous reconnecter.'));
    }
    
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.'));
    }
    
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Ressource non trouvée.'));
    }
    
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('Erreur serveur. Veuillez réessayer plus tard.'));
    }
    
    // On extrait le message d'erreur renvoyé par le backend si disponible
    const message =
      error.response?.data?.message ||
      error.message ||
      'Une erreur inattendue est survenue.';
    return Promise.reject(new Error(message));
  }
);

export default api;
