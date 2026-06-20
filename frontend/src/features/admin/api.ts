/**
 * @file api.ts
 * @feature admin
 * @layer  Feature — Couche API Admin
 *
 * @role
 * Regroupe TOUS les appels HTTP nécessaires à l'administration de la plateforme.
 * Chaque fonction correspond exactement à un endpoint du backend Spring Boot.
 *
 * Ce fichier fait le lien entre :
 *   - Le store Zustand (qui stocke les données en mémoire)
 *   - Le client Axios (api.client.ts) qui envoie les vraies requêtes HTTP
 *
 * ─── Endpoints disponibles ───────────────────────────────────────────────────
 *
 * UTILISATEURS (/api/utilisateurs)
 *   GET    /api/utilisateurs              → fetchAllUsers()
 *   GET    /api/utilisateurs/actif/{bool} → fetchUsersByStatus(actif)
 *   GET    /api/utilisateurs/email/{mail} → fetchUserByEmail(email)
 *   GET    /api/utilisateurs/{id}         → fetchUserById(id)
 *   PATCH  /api/utilisateurs/{id}/toggle-actif → toggleUserStatus(id)
 *   DELETE /api/utilisateurs/{id}         → deleteUser(id)
 *
 * CATÉGORIES (/api/categories)
 *   GET    /api/categories                → fetchAllCategories()
 *   POST   /api/categories                → createCategory(payload)
 *   PUT    /api/categories/{id}           → updateCategory(id, payload)
 *   DELETE /api/categories/{id}           → deleteCategory(id)
 *
 * PRODUITS — Modération admin (/api/produits)
 *   GET    /api/produits                  → fetchAllProductsAdmin()
 *   DELETE /api/produits/{id}             → deleteProductAdmin(id)
 *
 * ⚠️ RÈGLE IMPORTANTE :
 *    Ces fonctions ne doivent jamais être appelées directement depuis un composant.
 *    Elles sont réservées aux pages admin (app/admin/**).
 */

import api from '@/services/api.client';
import { Utilisateur, Produit, Categorie } from '@/types/models.types';
import { CategoryPayload, UserToggleResult } from './types';

// ═════════════════════════════════════════════════════════════════════════════
// SECTION UTILISATEURS
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Récupère la liste complète de tous les utilisateurs inscrits sur la plateforme.
 * Utilisée pour afficher le tableau de gestion dans /admin/utilisateurs.
 *
 * @returns {Promise<Utilisateur[]>} Tableau de tous les utilisateurs (actifs + inactifs)
 * @throws {Error} Si le backend est inaccessible ou retourne une erreur HTTP
 */
export const fetchAllUsers = async (): Promise<Utilisateur[]> => {
  const { data } = await api.get<Utilisateur[]>('/utilisateurs');
  return data;
};

/**
 * Filtre les utilisateurs selon leur statut actif ou inactif.
 * Utile pour afficher uniquement les comptes actifs ou les comptes désactivés.
 *
 * @param {boolean} actif - true = comptes actifs, false = comptes désactivés
 * @returns {Promise<Utilisateur[]>} Utilisateurs correspondant au filtre
 */
export const fetchUsersByStatus = async (actif: boolean): Promise<Utilisateur[]> => {
  const { data } = await api.get<Utilisateur[]>(`/utilisateurs/actif/${actif}`);
  return data;
};

/**
 * Recherche un utilisateur spécifique par son adresse email.
 * Pratique pour retrouver rapidement un compte à partir d'un email connu.
 *
 * @param {string} email - L'adresse email exacte de l'utilisateur à trouver
 * @returns {Promise<Utilisateur>} L'utilisateur correspondant
 * @throws {Error} Si aucun utilisateur avec cet email n'existe (404)
 */
export const fetchUserByEmail = async (email: string): Promise<Utilisateur> => {
  const { data } = await api.get<Utilisateur>(`/utilisateurs/email/${email}`);
  return data;
};

/**
 * Récupère le profil complet d'un utilisateur par son identifiant unique.
 *
 * @param {number} id - L'identifiant numérique de l'utilisateur (idUtilisateur)
 * @returns {Promise<Utilisateur>} Profil complet de l'utilisateur
 * @throws {Error} Si l'utilisateur n'existe pas (404)
 */
export const fetchUserById = async (id: number): Promise<Utilisateur> => {
  const { data } = await api.get<Utilisateur>(`/utilisateurs/${id}`);
  return data;
};

/**
 * Bascule le statut d'un compte entre actif et inactif.
 * Un compte inactif ne peut pas se connecter à la plateforme.
 * Le backend gère automatiquement l'inversion (actif → inactif, inactif → actif).
 *
 * @param {number} id - L'identifiant de l'utilisateur à activer/désactiver
 * @returns {Promise<UserToggleResult>} L'ID de l'utilisateur + son nouveau statut actif
 */
export const toggleUserStatus = async (id: number): Promise<UserToggleResult> => {
  const { data } = await api.patch<UserToggleResult>(`/utilisateurs/${id}/toggle-actif`);
  return data;
};

/**
 * Supprime définitivement un compte utilisateur de la base de données.
 * ⚠️ Cette action est irréversible. Toujours demander confirmation avant l'appel.
 *
 * @param {number} id - L'identifiant de l'utilisateur à supprimer
 * @returns {Promise<void>} Résolution sans données si la suppression réussit
 */
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/utilisateurs/${id}`);
};

// ═════════════════════════════════════════════════════════════════════════════
// SECTION CATÉGORIES
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Récupère toutes les catégories disponibles sur la plateforme.
 * Utilisée dans les pages admin/categories et dans les filtres produits.
 *
 * @returns {Promise<Categorie[]>} Liste de toutes les catégories
 */
export const fetchAllCategories = async (): Promise<Categorie[]> => {
  const { data } = await api.get<Categorie[]>('/categories');
  return data;
};

/**
 * Crée une nouvelle catégorie de produit.
 *
 * @param {CategoryPayload} payload - Objet contenant le nom de la nouvelle catégorie
 * @returns {Promise<Categorie>} La catégorie créée avec son ID généré par le backend
 */
export const createCategory = async (payload: CategoryPayload): Promise<Categorie> => {
  const { data } = await api.post<Categorie>('/categories', payload);
  return data;
};

/**
 * Met à jour le nom d'une catégorie existante.
 *
 * @param {number} id - L'identifiant de la catégorie à modifier
 * @param {CategoryPayload} payload - Le nouveau nom de la catégorie
 * @returns {Promise<Categorie>} La catégorie mise à jour
 */
export const updateCategory = async (id: number, payload: CategoryPayload): Promise<Categorie> => {
  const { data } = await api.put<Categorie>(`/categories/${id}`, payload);
  return data;
};

/**
 * Supprime définitivement une catégorie.
 * ⚠️ Action irréversible. Vérifier qu'aucun produit n'utilise cette catégorie avant suppression.
 *
 * @param {number} id - L'identifiant de la catégorie à supprimer
 * @returns {Promise<void>} Résolution sans données si la suppression réussit
 */
export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

// ═════════════════════════════════════════════════════════════════════════════
// SECTION PRODUITS — Modération Admin
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Récupère TOUS les produits de la plateforme, tous vendeurs confondus.
 * Contrairement à un vendeur normal (qui ne voit que ses propres articles),
 * l'admin a accès à l'intégralité du catalogue.
 *
 * @returns {Promise<Produit[]>} Tous les produits de la plateforme
 */
export const fetchAllProductsAdmin = async (): Promise<Produit[]> => {
  const { data } = await api.get<Produit[]>('/produits');
  return data;
};

/**
 * Supprime définitivement un article, sans restriction de rôle.
 * Contrairement à un vendeur qui ne peut supprimer que ses propres articles,
 * l'admin peut supprimer n'importe quel article (modération de contenu).
 * ⚠️ Action irréversible. Toujours demander confirmation avant l'appel.
 *
 * @param {number} id - L'identifiant du produit à supprimer (idProduit)
 * @returns {Promise<void>} Résolution sans données si la suppression réussit
 */
export const deleteProductAdmin = async (id: number): Promise<void> => {
  await api.delete(`/produits/${id}`);
};
