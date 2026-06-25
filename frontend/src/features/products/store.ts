import { create } from 'zustand';
import { ProductState } from './types';
import { Produit } from '@/types/models.types';

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  setProducts: (products: Produit[]) => set({ products }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
}));
