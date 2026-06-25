import { Categorie } from '@/types/models.types';

export interface CategoryState {
  categories: Categorie[];
  activeCategoryId: number | null;
  isLoading: boolean;
  error: string | null;

  setCategories: (categories: Categorie[]) => void;
  setActiveCategory: (id: number | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
