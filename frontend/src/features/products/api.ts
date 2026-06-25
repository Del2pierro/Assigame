import { productService } from '@/services/product.service';
import { Produit } from '@/types/models.types';
import { ProductFormPayload } from '@/lib/product.mapper';
import { enrichProductsWithSellers } from '@/lib/seller.utils';

export const productApi = {
  fetchAllProducts: async (): Promise<Produit[]> => {
    const products = await productService.getAll();
    return enrichProductsWithSellers(products);
  },

  fetchProductsByCategory: async (categoryId: number): Promise<Produit[]> => {
    const products = await productService.getByCategory(categoryId);
    return enrichProductsWithSellers(products);
  },

  fetchProductById: async (id: number): Promise<Produit> => {
    const product = await productService.getById(id);
    const [enriched] = await enrichProductsWithSellers([product]);
    return enriched;
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
