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

// Implémentation à venir
