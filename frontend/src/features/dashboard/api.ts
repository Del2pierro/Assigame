/**
 * @file api.ts
 * @feature dashboard
 * @role  Pont vers product.service.ts pour les opérations du vendeur.
 *        Ré-expose uniquement les fonctions nécessaires au dashboard
 *        (pas de création/édition qui appartiennent à la feature products).
 *
 * @functions
 *  - fetchSellerProducts(idUtilisateur) → Produit[]
 *  - removeProduct(id)                  → void
 *  - changeProductStatus(id, status)    → Produit
 */

import { productService } from '@/services/product.service';
import { Produit, ProductStatus } from '@/types/models.types';

export const dashboardApi = {
  /** Récupère tous les produits du vendeur connecté */
  fetchSellerProducts: async (idUtilisateur: number): Promise<Produit[]> => {
    return productService.getBySeller(idUtilisateur);
  },

  /** Supprime un produit par son ID */
  removeProduct: async (id: number): Promise<void> => {
    return productService.remove(id);
  },

  /** Change le statut d'un produit (DISPONIBLE → RESERVE → VENDU) */
  changeProductStatus: async (id: number, status: ProductStatus): Promise<Produit> => {
    return productService.patchStatus(id, status);
  },
};
