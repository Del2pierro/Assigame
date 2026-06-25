/**
 * @file types.ts
 * @feature dashboard
 * @role  Types spécifiques au tableau de bord vendeur.
 *
 * @exports
 *  - DashboardStats       : Statistiques calculées à partir des produits du vendeur
 *  - SellerProduct        : Produit enrichi de flags UI (isDeleting, isUpdatingStatus)
 *  - StatusUpdatePayload  : { productId: number; newStatus: ProductStatus }
 *  - DashboardState       : Interface Zustand pour le store dashboard
 */

import { Produit, ProductStatus } from '@/types/models.types';

/** Statistiques dérivées de la liste des produits du vendeur */
export interface DashboardStats {
  totalEnVente: number;
  totalVendus: number;
  totalReserves: number;
  totalArticles: number;
}

/** Produit enrichi avec des flags d'état UI pour les actions en cours */
export interface SellerProduct extends Produit {
  isDeleting?: boolean;
  isUpdatingStatus?: boolean;
}

/** Payload pour la mise à jour du statut d'un produit */
export interface StatusUpdatePayload {
  productId: number;
  newStatus: ProductStatus;
}

/** Interface complète du store Zustand du dashboard vendeur */
export interface DashboardState {
  sellerProducts: Produit[];
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSellerProducts: (products: Produit[]) => void;
  removeProductFromList: (productId: number) => void;
  updateProductInList: (updatedProduct: Produit) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
