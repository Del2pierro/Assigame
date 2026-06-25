import { useCallback } from 'react';
import { useCategoryStore } from './store';
import { categoryApi } from './api';

export const useCategories = () => {
  const store = useCategoryStore();

  const loadCategories = useCallback(async () => {
    // Accès via getState() pour éviter la dépendance instable sur store
    const { setLoading, setError, setCategories } = useCategoryStore.getState();
    setLoading(true);
    setError(null);
    try {
      const categories = await categoryApi.fetchCategories();
      setCategories(categories);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des catégories';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []); // ← plus de dépendance sur store

  return {
    ...store,
    loadCategories
  };
};
