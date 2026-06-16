/**
 * @file store.ts
 * @feature categories
 * @role  Store Zustand des catégories. Mise en cache pour éviter les
 *        rechargements répétés (les catégories ne changent quasiment jamais).
 *
 * @state
 *  - categories        : Categorie[] — liste complète des catégories
 *  - activeCategory    : number | null — idCategorie du filtre actif (null = "Tous")
 *  - isLoaded          : boolean — true si les catégories ont déjà été chargées
 *
 * @actions
 *  - setCategories()
 *  - setActiveCategory()
 *  - clearActiveCategory()
 */

// Implémentation à venir (Zustand)
