import { Categorie, Produit, ProductStatus, Utilisateur } from '@/types/models.types';

/** Shape renvoyé par le backend Spring (ProduitResponse) */
export interface BackendProduit {
  idProduit: number;
  nomProduit?: string;
  nom?: string;
  description?: string;
  prix: number | string;
  statut?: string;
  dateAjout?: string;
  datePublication?: string;
  idUtilisateur?: number;
  utilisateur?: Utilisateur;
  image?: number[] | string;
  imageBase64?: string;
  categorie?: Categorie & { nomCategorie?: string };
}

function bytesToBase64(image: number[] | string | undefined): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (image.length === 0) return undefined;
  try {
    const binary = image.map((b) => String.fromCharCode(b)).join('');
    return btoa(binary);
  } catch {
    return undefined;
  }
}

export function base64ToBytes(base64: string): number[] {
  const binary = atob(base64);
  return Array.from(binary, (c) => c.charCodeAt(0));
}

export interface ProductFormPayload {
  nom: string;
  description: string;
  prix: number;
  imageBase64?: string;
}

/** Payload attendu par ProduitRequest (backend Spring) */
export function toBackendProduitRequest(payload: ProductFormPayload): {
  nomProduit: string;
  description: string;
  prix: number;
  image?: number[];
} {
  const body: {
    nomProduit: string;
    description: string;
    prix: number;
    image?: number[];
  } = {
    nomProduit: payload.nom,
    description: payload.description,
    prix: payload.prix,
  };
  if (payload.imageBase64) {
    body.image = base64ToBytes(payload.imageBase64);
  }
  return body;
}

function minimalSeller(idUtilisateur: number): Utilisateur {
  return {
    idUtilisateur,
    nom: '',
    prenom: '',
    email: '',
    login: '',
    actif: true,
    dateInscription: '',
    typeUtilisateur: { idTypeUtilisateur: 2, libelle: 'VENDEUR' },
  };
}

/** Normalise un ProduitResponse backend vers le modèle frontend */
export function mapBackendProduit(raw: BackendProduit): Produit {
  const sellerId = raw.utilisateur?.idUtilisateur ?? raw.idUtilisateur;
  const categorie: Categorie = raw.categorie
    ? {
        idCategorie: raw.categorie.idCategorie,
        nom: raw.categorie.nom ?? raw.categorie.nomCategorie ?? '',
      }
    : { idCategorie: 0, nom: '' };

  return {
    idProduit: raw.idProduit,
    nom: raw.nom ?? raw.nomProduit ?? '',
    description: raw.description ?? '',
    prix: typeof raw.prix === 'number' ? raw.prix : Number(raw.prix),
    statut: (raw.statut ?? 'DISPONIBLE') as ProductStatus,
    imageBase64: raw.imageBase64 ?? bytesToBase64(raw.image),
    datePublication: raw.datePublication ?? raw.dateAjout ?? new Date().toISOString(),
    utilisateur: raw.utilisateur ?? (sellerId ? minimalSeller(sellerId) : minimalSeller(0)),
    categorie,
  };
}

export function getSellerIdFromProduit(product: Produit): number | null {
  const id = product.utilisateur?.idUtilisateur;
  return id && id > 0 ? id : null;
}
