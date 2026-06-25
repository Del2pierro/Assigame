import { productService } from '@/services/product.service';
import { Categorie } from '@/types/models.types';

export const categoryApi = {
  fetchCategories: async (): Promise<Categorie[]> => {
    return productService.getCategories();
  }
};
