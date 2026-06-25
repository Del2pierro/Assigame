/**
 * @file hooks.ts
 * @feature dashboard
 * @role  Hooks React du dashboard vendeur.
 *
 * @hooks
 *  useSellerDashboard()
 *    - Récupère l'ID du vendeur depuis localStorage
 *    - Charge ses produits via fetchSellerProducts()
 *    - Calcule et expose les statistiques dérivées
 *    - Expose : { sellerProducts, stats, isLoading, error, reload }
 *
 *  useProductDelete()
 *    - Suppression optimiste puis appel API
 *    - Rollback en cas d'erreur
 *    - Expose : { deleteProduct, isDeleting, productIdBeingDeleted }
 *
 *  useStatusUpdate()
 *    - Met à jour le statut d'un produit (DISPONIBLE → RESERVE → VENDU)
 *    - Mise à jour optimiste du store avant la réponse API
 *    - En cas d'erreur : rollback de la mise à jour optimiste
 *    - Expose : { updateStatus, isUpdating }
 */

import { useEffect, useCallback, useState } from 'react';
import { useDashboardStore } from './store';
import { dashboardApi } from './api';
import { ProductStatus } from '@/types/models.types';

// ─── useSellerDashboard ──────────────────────────────────────────────────────

export const useSellerDashboard = () => {
  const sellerProducts = useDashboardStore((s) => s.sellerProducts);
  const stats = useDashboardStore((s) => s.stats);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const error = useDashboardStore((s) => s.error);

  const loadProducts = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    const { setIsLoading, setError, setSellerProducts } = useDashboardStore.getState();
    setIsLoading(true);
    setError(null);
    try {
      const products = await dashboardApi.fetchSellerProducts(Number(userId));
      setSellerProducts(products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des produits';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []); // ← stable, pas de dépendance cyclique

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    sellerProducts,
    stats,
    isLoading,
    error,
    reload: loadProducts,
  };
};

// ─── useProductDelete ────────────────────────────────────────────────────────

export const useProductDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [productIdBeingDeleted, setProductIdBeingDeleted] = useState<number | null>(null);

  const deleteProduct = useCallback(async (productId: number) => {
    const { sellerProducts, removeProductFromList, setSellerProducts } = useDashboardStore.getState();

    // Sauvegarde pour rollback
    const backup = [...sellerProducts];

    setIsDeleting(true);
    setProductIdBeingDeleted(productId);

    // Suppression optimiste
    removeProductFromList(productId);

    try {
      await dashboardApi.removeProduct(productId);
    } catch {
      // Rollback en cas d'erreur
      setSellerProducts(backup);
      console.error('Erreur lors de la suppression du produit');
    } finally {
      setIsDeleting(false);
      setProductIdBeingDeleted(null);
    }
  }, []); // ← stable

  return { deleteProduct, isDeleting, productIdBeingDeleted };
};

// ─── useStatusUpdate ─────────────────────────────────────────────────────────

export const useStatusUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = useCallback(async (productId: number, newStatus: ProductStatus) => {
    const { sellerProducts, updateProductInList, setSellerProducts } = useDashboardStore.getState();

    // Sauvegarde pour rollback
    const backup = [...sellerProducts];
    const target = sellerProducts.find((p) => p.idProduit === productId);
    if (!target) return;

    // Mise à jour optimiste
    updateProductInList({ ...target, statut: newStatus });
    setIsUpdating(true);

    try {
      const updated = await dashboardApi.changeProductStatus(productId, newStatus);
      // Confirme avec les données réelles du backend
      updateProductInList(updated);
    } catch {
      // Rollback en cas d'erreur
      setSellerProducts(backup);
      console.error('Erreur lors de la mise à jour du statut');
    } finally {
      setIsUpdating(false);
    }
  }, []); // ← stable

  return { updateStatus, isUpdating };
};
