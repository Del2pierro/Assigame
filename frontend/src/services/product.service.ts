import api from './api.client';
import { Produit, Categorie } from '@/types/models.types';
import { BackendCategorie, mapBackendCategorie } from '@/lib/category.mapper';
import { BackendProduit, mapBackendProduit, ProductFormPayload, toBackendProduitRequest } from '@/lib/product.mapper';

export const productService = {
  // --- Produits ---

  getAll: async (): Promise<Produit[]> => {
    const response = await api.get<BackendProduit[]>('/produits');
    return response.data.map(mapBackendProduit);
  },

  getById: async (id: number): Promise<Produit> => {
    const response = await api.get<BackendProduit>(`/produits/${id}`);
    return mapBackendProduit(response.data);
  },

  getByCategory: async (idCategorie: number): Promise<Produit[]> => {
    const response = await api.get<BackendProduit[]>(`/produits/categorie/${idCategorie}`);
    return response.data.map(mapBackendProduit);
  },

  getBySeller: async (idUtilisateur: number): Promise<Produit[]> => {
    const response = await api.get<BackendProduit[]>(`/produits/utilisateur/${idUtilisateur}`);
    return response.data.map(mapBackendProduit);
  },

  create: async (
    idUtilisateur: number,
    idCategorie: number,
    payload: ProductFormPayload
  ): Promise<Produit> => {
    const response = await api.post<BackendProduit>(
      `/produits/utilisateur/${idUtilisateur}/categorie/${idCategorie}`,
      toBackendProduitRequest(payload)
    );
    return mapBackendProduit(response.data);
  },

  update: async (id: number, payload: ProductFormPayload): Promise<Produit> => {
    const response = await api.put<BackendProduit>(
      `/produits/${id}`,
      toBackendProduitRequest(payload)
    );
    return mapBackendProduit(response.data);
  },

  patchStatus: async (id: number, statut: string): Promise<Produit> => {
    // Note: If the backend supports PATCH for status
    const response = await api.patch<Produit>(`/produits/${id}/statut/${statut}`);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/produits/${id}`);
  },

  // --- Catégories ---

  getCategories: async (): Promise<Categorie[]> => {
    const response = await api.get<BackendCategorie[]>('/categories');
    return response.data.map(mapBackendCategorie);
  },
};
