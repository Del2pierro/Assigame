import api from '@/services/api.client';
import { Categorie } from '@/types/models.types';
import {
  BackendCategorie,
  mapBackendCategorie,
  toBackendCategoryRequest,
} from '@/lib/category.mapper';

export const categoryApi = {
  fetchCategories: async (): Promise<Categorie[]> => {
    const response = await api.get<BackendCategorie[]>('/categories');
    return response.data.map(mapBackendCategorie);
  },

  createCategory: async (nom: string): Promise<Categorie> => {
    const response = await api.post<BackendCategorie>(
      '/categories',
      toBackendCategoryRequest(nom)
    );
    return mapBackendCategorie(response.data);
  },
};
