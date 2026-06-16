/**
 * @file hooks.ts
 * @feature categories
 * @role  Hook React des catégories avec mise en cache.
 *
 * @hooks
 *  useCategories()
 *    - Charge les catégories au premier appel uniquement (si !isLoaded)
 *    - Utilise fetchCategories() puis stocke dans le store
 *    - Synchronise activeCategory avec les filtres de features/products/store.ts
 *    - Expose : { categories, activeCategory, setActiveCategory, isLoading }
 */

// Implémentation à venir
