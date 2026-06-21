/**
 * @file store.ts
 * @feature admin
 * @role  Store Zustand de l'espace admin. Maintient l'état de toutes les
 *        sections de l'interface administrateur.
 */

import { create } from 'zustand';
import { Utilisateur, Produit, Categorie } from '@/types/models.types';
import { AdminFilter, ConfirmDialogState } from './types';

// État initial de la modale de confirmation (fermée par défaut)
const defaultConfirmDialog: ConfirmDialogState = {
  isOpen: false,
  targetId: null,
  action: null,
  message: '',
};

// ─── Définition du type global du store admin ───────────────────────────────

interface AdminStore {
  // --- Section utilisateurs ---
  users: Utilisateur[];
  selectedUser: Utilisateur | null;
  userFilter: AdminFilter;

  // --- Section produits (modération) ---
  allProducts: Produit[];
  productFilter: AdminFilter;

  // --- Section catégories ---
  categories: Categorie[];

  // --- États UI transversaux ---
  isLoading: boolean;
  confirmDialog: ConfirmDialogState;

  // --- Actions utilisateurs ---
  setUsers: (users: Utilisateur[]) => void;
  setSelectedUser: (user: Utilisateur | null) => void;
  setUserFilter: (filter: AdminFilter) => void;
  /** Met à jour un utilisateur dans la liste sans rechargement (optimiste) */
  updateUserInList: (updated: Utilisateur) => void;
  /** Retire un utilisateur de la liste sans rechargement (optimiste) */
  removeUserFromList: (id: number) => void;

  // --- Actions produits ---
  setAllProducts: (products: Produit[]) => void;
  setProductFilter: (filter: AdminFilter) => void;
  /** Retire un produit de la liste sans rechargement (optimiste) */
  removeProductFromList: (id: number) => void;

  // --- Actions catégories ---
  setCategories: (categories: Categorie[]) => void;
  addCategory: (category: Categorie) => void;
  updateCategoryInList: (updated: Categorie) => void;
  removeCategoryFromList: (id: number) => void;

  // --- Actions UI ---
  setIsLoading: (loading: boolean) => void;
  openConfirmDialog: (state: Omit<ConfirmDialogState, 'isOpen'>) => void;
  closeConfirmDialog: () => void;
}

// ─── Création du store ───────────────────────────────────────────────────────

export const useAdminStore = create<AdminStore>((set) => ({
  // Valeurs initiales
  users: [],
  selectedUser: null,
  userFilter: {},
  allProducts: [],
  productFilter: {},
  categories: [],
  isLoading: false,
  confirmDialog: defaultConfirmDialog,

  // --- Implémentation des actions utilisateurs ---

  /** Remplace la liste complète des utilisateurs */
  setUsers: (users) => set({ users }),

  /** Définit l'utilisateur sélectionné pour la vue détail */
  setSelectedUser: (user) => set({ selectedUser: user }),

  /** Met à jour les filtres de la liste utilisateurs */
  setUserFilter: (filter) => set({ userFilter: filter }),

  /** Mise à jour optimiste : modifie un utilisateur dans la liste locale */
  updateUserInList: (updated) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.idUtilisateur === updated.idUtilisateur ? updated : u
      ),
    })),

  /** Mise à jour optimiste : retire un utilisateur de la liste locale */
  removeUserFromList: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.idUtilisateur !== id),
    })),

  // --- Implémentation des actions produits ---

  /** Remplace la liste complète des produits */
  setAllProducts: (products) => set({ allProducts: products }),

  /** Met à jour les filtres de la liste produits */
  setProductFilter: (filter) => set({ productFilter: filter }),

  /** Mise à jour optimiste : retire un produit de la liste locale */
  removeProductFromList: (id) =>
    set((state) => ({
      allProducts: state.allProducts.filter((p) => p.idProduit !== id),
    })),

  // --- Implémentation des actions catégories ---

  /** Remplace la liste complète des catégories */
  setCategories: (categories) => set({ categories }),

  /** Ajoute une nouvelle catégorie à la liste */
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),

  /** Met à jour une catégorie existante dans la liste */
  updateCategoryInList: (updated) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.idCategorie === updated.idCategorie ? updated : c
      ),
    })),

  /** Retire une catégorie de la liste */
  removeCategoryFromList: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.idCategorie !== id),
    })),

  // --- Implémentation des actions UI ---

  /** Active ou désactive l'indicateur de chargement */
  setIsLoading: (loading) => set({ isLoading: loading }),

  /** Ouvre la modale de confirmation avec le contexte de l'action */
  openConfirmDialog: (state) =>
    set({ confirmDialog: { isOpen: true, ...state } }),

  /** Ferme la modale de confirmation et réinitialise son état */
  closeConfirmDialog: () => set({ confirmDialog: defaultConfirmDialog }),
}));
