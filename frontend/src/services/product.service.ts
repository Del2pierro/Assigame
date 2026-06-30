/* eslint-disable no-console */
import api from './api.client';
import { Produit, Categorie } from '@/types/models.types';
import { BackendCategorie, mapBackendCategorie } from '@/lib/category.mapper';
import { BackendProduit, mapBackendProduit, ProductFormPayload, toBackendProduitRequest } from '@/lib/product.mapper';

export const productService = {
  // --- Produits ---

  getAll: async (): Promise<Produit[]> => {
    console.log('[Product Service] Fetching all products', {
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.get<BackendProduit[]>('/produits');
      const products = response.data.map(mapBackendProduit);
      
      console.log('[Product Service] Products fetched successfully', {
        count: products.length,
        timestamp: new Date().toISOString()
      });
      
      return products;
    } catch (error) {
      console.error('[Product Service] Failed to fetch products', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  getById: async (id: number): Promise<Produit> => {
    console.log('[Product Service] Fetching product by ID', {
      productId: id,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.get<BackendProduit>(`/produits/${id}`);
      const product = mapBackendProduit(response.data);
      
      console.log('[Product Service] Product fetched successfully', {
        productId: id,
        productName: product.nom,
        timestamp: new Date().toISOString()
      });
      
      return product;
    } catch (error) {
      console.error('[Product Service] Failed to fetch product', {
        productId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  getByCategory: async (idCategorie: number): Promise<Produit[]> => {
    console.log('[Product Service] Fetching products by category', {
      categoryId: idCategorie,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.get<BackendProduit[]>(`/produits/categorie/${idCategorie}`);
      const products = response.data.map(mapBackendProduit);
      
      console.log('[Product Service] Products by category fetched successfully', {
        categoryId: idCategorie,
        count: products.length,
        timestamp: new Date().toISOString()
      });
      
      return products;
    } catch (error) {
      console.error('[Product Service] Failed to fetch products by category', {
        categoryId: idCategorie,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  getBySeller: async (idUtilisateur: number): Promise<Produit[]> => {
    console.log('[Product Service] Fetching products by seller', {
      sellerId: idUtilisateur,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.get<BackendProduit[]>(`/produits/utilisateur/${idUtilisateur}`);
      const products = response.data.map(mapBackendProduit);
      
      console.log('[Product Service] Products by seller fetched successfully', {
        sellerId: idUtilisateur,
        count: products.length,
        timestamp: new Date().toISOString()
      });
      
      return products;
    } catch (error) {
      console.error('[Product Service] Failed to fetch products by seller', {
        sellerId: idUtilisateur,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  create: async (
    idUtilisateur: number,
    idCategorie: number,
    payload: ProductFormPayload
  ): Promise<Produit> => {
    console.log('[Product Service] Creating product', {
      sellerId: idUtilisateur,
      categoryId: idCategorie,
      productName: payload.nom,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.post<BackendProduit>(
        `/produits/utilisateur/${idUtilisateur}/categorie/${idCategorie}`,
        toBackendProduitRequest(payload)
      );
      const product = mapBackendProduit(response.data);
      
      console.log('[Product Service] Product created successfully', {
        productId: product.idProduit,
        productName: product.nom,
        timestamp: new Date().toISOString()
      });
      
      return product;
    } catch (error) {
      console.error('[Product Service] Failed to create product', {
        sellerId: idUtilisateur,
        categoryId: idCategorie,
        productName: payload.nom,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  update: async (id: number, payload: ProductFormPayload): Promise<Produit> => {
    console.log('[Product Service] Updating product', {
      productId: id,
      productName: payload.nom,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.put<BackendProduit>(
        `/produits/${id}`,
        toBackendProduitRequest(payload)
      );
      const product = mapBackendProduit(response.data);
      
      console.log('[Product Service] Product updated successfully', {
        productId: id,
        productName: product.nom,
        timestamp: new Date().toISOString()
      });
      
      return product;
    } catch (error) {
      console.error('[Product Service] Failed to update product', {
        productId: id,
        productName: payload.nom,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  patchStatus: async (id: number, statut: string): Promise<Produit> => {
    console.log('[Product Service] Updating product status', {
      productId: id,
      newStatus: statut,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.patch<Produit>(`/produits/${id}/statut/${statut}`);
      
      console.log('[Product Service] Product status updated successfully', {
        productId: id,
        newStatus: statut,
        timestamp: new Date().toISOString()
      });
      
      return response.data;
    } catch (error) {
      console.error('[Product Service] Failed to update product status', {
        productId: id,
        newStatus: statut,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  remove: async (id: number): Promise<void> => {
    console.log('[Product Service] Deleting product', {
      productId: id,
      timestamp: new Date().toISOString()
    });
    
    try {
      await api.delete(`/produits/${id}`);
      
      console.log('[Product Service] Product deleted successfully', {
        productId: id,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('[Product Service] Failed to delete product', {
        productId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  // --- Catégories ---

  getCategories: async (): Promise<Categorie[]> => {
    console.log('[Product Service] Fetching categories', {
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.get<BackendCategorie[]>('/categories');
      const categories = response.data.map(mapBackendCategorie);
      
      console.log('[Product Service] Categories fetched successfully', {
        count: categories.length,
        timestamp: new Date().toISOString()
      });
      
      return categories;
    } catch (error) {
      console.error('[Product Service] Failed to fetch categories', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },
};
