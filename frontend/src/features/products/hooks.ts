import { useCallback } from 'react';
import { useProductStore } from './store';
import { productApi } from './api';

export const useProducts = () => {
  const store = useProductStore();

  const loadProducts = useCallback(async (categoryId: number | null = null) => {
    // Accès via getState() pour éviter la dépendance instable sur store
    const { setLoading, setError, setProducts } = useProductStore.getState();
    setLoading(true);
    setError(null);
    try {
      const products = categoryId 
        ? await productApi.fetchProductsByCategory(categoryId)
        : await productApi.fetchAllProducts();
      setProducts(products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des produits';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []); // ← plus de dépendance sur store

  return {
    ...store,
    loadProducts
  };
};
