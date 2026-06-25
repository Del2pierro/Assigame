import { Categorie } from '@/types/models.types';

/** Shape renvoyé par le backend Spring (CategorieProduitResponse) */
export interface BackendCategorie {
  idCategorie: number;
  nomCategorie?: string;
  nom?: string;
  description?: string;
}

export function mapBackendCategorie(raw: BackendCategorie): Categorie {
  return {
    idCategorie: raw.idCategorie,
    nom: raw.nom ?? raw.nomCategorie ?? '',
  };
}

/** Payload attendu par CategorieProduitRequest (backend Spring) */
export function toBackendCategoryRequest(nom: string): { nomCategorie: string } {
  return { nomCategorie: nom.trim() };
}
