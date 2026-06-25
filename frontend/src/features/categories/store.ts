import { create } from 'zustand';
import { CategoryState } from './types';
import { Categorie } from '@/types/models.types';

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  activeCategoryId: null,
  isLoading: false,
  error: null,

  setCategories: (categories: Categorie[]) => set({ categories }),
  setActiveCategory: (id: number | null) => set({ activeCategoryId: id }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
}));
