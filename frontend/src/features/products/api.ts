import { productService } from '@/services/product.service';
import { Produit } from '@/types/models.types';
import { ProductFormPayload } from '@/lib/product.mapper';

export const productApi = {
  fetchAllProducts: async (): Promise<Produit[]> => {
    return productService.getAll();
  },

  fetchProductsByCategory: async (categoryId: number): Promise<Produit[]> => {
    return productService.getByCategory(categoryId);
  },

  fetchProductById: async (id: number): Promise<Produit> => {
    return productService.getById(id);
  },

  createProduct: async (
    userId: number,
    categoryId: number,
    payload: ProductFormPayload
  ): Promise<Produit> => {
    return productService.create(userId, categoryId, payload);
  },

  updateProduct: async (id: number, payload: ProductFormPayload): Promise<Produit> => {
    return productService.update(id, payload);
  },
};
