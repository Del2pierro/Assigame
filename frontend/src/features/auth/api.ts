/**
 * @file api.ts
 * @feature auth
 * @role  Pont entre la feature auth et la couche service.
 *        Expose des fonctions typées qui délèguent à auth.service.ts.
 *        Isole la feature des détails d'implémentation HTTP.
 *
 * @functions
 *  - loginUser(payload: LoginPayload)           → AuthResponse
 *  - registerUser(payload: RegisterPayload)     → void
 *
 * ⚠️ Toutes les fonctions retournent des Promises.
 *    La gestion des erreurs est centralisée dans les hooks.
 */

// Implémentation à venir
