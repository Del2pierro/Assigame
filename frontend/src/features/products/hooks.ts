/**
 * @file hooks.ts
 * @feature products
 * @role  Hooks React de la feature products. Interface consommée par les composants.
 *
 * @hooks
 *  useProducts()
 *    - Charge tous les produits au montage (fetchAllProducts)
 *    - Gère les filtres (catégorie, recherche, tri) et met à jour le store
 *    - Expose : { products, isLoading, error, setFilter }
 *
 *  useProductDetail(id)
 *    - Charge un produit par son ID (fetchProductById)
 *    - Gère le cas produit non trouvé → navigation vers 404
 *    - Expose : { product, isLoading, error }
 *
 *  useProductForm(id?)
 *    - En mode création : formulaire vide
 *    - En mode édition : pré-charge les données du produit (fetchProductById)
 *    - Valide via productSchema, soumet via createProduct ou updateProduct
 *    - Gère la conversion image → Base64 via utils.toBase64()
 *    - Expose : { form, onSubmit, isSubmitting, previewUrl }
 *
 *  useProductMutations()
 *    - Regroupe deleteProduct et updateProductStatus
 *    - Met à jour le store de façon optimiste
 *    - Expose : { deleteProduct, updateStatus, isLoading }
 */

// Implémentation à venir
