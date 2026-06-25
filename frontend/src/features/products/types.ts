import { Produit } from '@/types/models.types';

export interface ProductState {
  products: Produit[];
  isLoading: boolean;
  error: string | null;

  setProducts: (products: Produit[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
