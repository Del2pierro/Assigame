/**
 * @file types.ts
 * @feature products
 * @role  Types TypeScript du domaine produits.
 *
 * @exports
 *  - Product              : Entité produit complète (importée depuis types/models.types.ts)
 *  - ProductStatus        : Enum { DISPONIBLE = 'DISPONIBLE', RESERVE = 'RESERVE', VENDU = 'VENDU' }
 *  - ProductFormPayload   : { nom, description, prix, imageBase64, idCategorie }
 *  - ProductUpdatePayload : Partial<ProductFormPayload>
 *  - ProductFilters       : { search?: string; idCategorie?: number; sortBy?: SortField; sortDir?: SortDirection }
 *  - ProductListState     : { products: Product[]; filters: ProductFilters; isLoading: boolean }
 */

// Implémentation à venir
