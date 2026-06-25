/**
 * @file store.ts
 * @feature dashboard
 * @role  Store Zustand local du dashboard vendeur.
 *
 * @state
 *  - sellerProducts : Produit[] — articles du vendeur connecté
 *  - stats          : DashboardStats — statistiques calculées côté client
 *  - isLoading      : boolean
 *  - error          : string | null
 *
 * @actions
 *  - setSellerProducts()     — charge et calcule les stats automatiquement
 *  - removeProductFromList() — suppression optimiste
 *  - updateProductInList()   — mise à jour optimiste du statut dans la liste
 *  - setIsLoading()          — toggle du loader
 *  - setError()              — gestion des erreurs
 *
 * @note Les stats (totalEnVente, totalVendus, totalReserves) sont calculées
 *       en dérivant la liste sellerProducts, pas depuis l'API.
 */

import { create } from 'zustand';
import { DashboardState, DashboardStats } from './types';
import { Produit } from '@/types/models.types';

/** Calcule les statistiques dérivées à partir de la liste des produits */
function computeStats(products: Produit[]): DashboardStats {
  return {
    totalArticles: products.length,
    totalEnVente: products.filter((p) => p.statut === 'DISPONIBLE').length,
    totalVendus: products.filter((p) => p.statut === 'VENDU').length,
    totalReserves: products.filter((p) => p.statut === 'RESERVE').length,
  };
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sellerProducts: [],
  stats: { totalArticles: 0, totalEnVente: 0, totalVendus: 0, totalReserves: 0 },
  isLoading: false,
  error: null,

  setSellerProducts: (products: Produit[]) =>
    set({
      sellerProducts: products,
      stats: computeStats(products),
    }),

  removeProductFromList: (productId: number) =>
    set((state) => {
      const updated = state.sellerProducts.filter((p) => p.idProduit !== productId);
      return { sellerProducts: updated, stats: computeStats(updated) };
    }),

  updateProductInList: (updatedProduct: Produit) =>
    set((state) => {
      const updated = state.sellerProducts.map((p) =>
        p.idProduit === updatedProduct.idProduit ? updatedProduct : p
      );
      return { sellerProducts: updated, stats: computeStats(updated) };
    }),

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),
}));
