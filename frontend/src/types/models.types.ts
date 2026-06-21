/**
 * @file models.types.ts
 * @layer Types — Entités métier globales
 * @role  Interfaces TypeScript représentant les entités du domaine métier
 *        telles que renvoyées par le backend. Ces types sont la source
 *        de vérité pour toute l'application.
 *
 * @exports
 *  - Utilisateur    : { idUtilisateur, nom, prenom, email, login, telephone, adresse, dateInscription }
 *  - Produit        : { idProduit, nom, description, prix, statut, imageBase64, datePublication, utilisateur, categorie }
 *  - Categorie      : { idCategorie, nom }
 *  - Conversation   : { idConversation, produit, buyer (id+type), seller (id), dateCreation }
 *  - Message        : { idMessage, contenu, dateEnvoi, senderType, senderId, conversation }
 *  - ProductStatus  : Enum { DISPONIBLE, RESERVE, VENDU }
 *  - SenderType     : Enum { BUYER, SELLER }
 */

// --- Enums ---

/** Statuts possibles d'un produit sur la plateforme */
export type ProductStatus = 'DISPONIBLE' | 'RESERVE' | 'VENDU';

/** Type de l'expéditeur d'un message dans une conversation */
export type SenderType = 'BUYER' | 'SELLER';

// --- Entités principales ---

/** Catégorie de produit (ex: Vêtements, Chaussures...) */
export interface Categorie {
  idCategorie: number;
  nom: string;
}

/** Type d'utilisateur (ex: ADMIN, VENDEUR) */
export interface TypeUtilisateur {
  idTypeUtilisateur: number;
  libelle: string; // 'ADMIN' | 'VENDEUR'
}

/** Utilisateur inscrit sur la plateforme */
export interface Utilisateur {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  login: string;
  telephone?: string;
  adresse?: string;
  dateInscription: string; // Format ISO : "2024-05-10"
  actif: boolean;
  typeUtilisateur: TypeUtilisateur;
}

/** Produit publié sur la plateforme */
export interface Produit {
  idProduit: number;
  nom: string;
  description: string;
  prix: number;
  statut: ProductStatus;
  imageBase64?: string; // Image encodée en Base64 sans préfixe MIME
  datePublication: string; // Format ISO
  utilisateur: Utilisateur; // Le vendeur propriétaire
  categorie: Categorie;
}

/** Conversation entre un acheteur et un vendeur pour un produit donné */
export interface Conversation {
  idConversation: number;
  produit: Produit;
  buyerId: string;      // UUID de l'acheteur (guest ou inscrit)
  buyerType: SenderType;
  sellerId: number;     // ID du vendeur
  dateCreation: string;
}

/** Message envoyé dans une conversation */
export interface Message {
  idMessage: number;
  contenu: string;
  dateEnvoi: string;
  senderType: SenderType;
  senderId: string;
  conversation: Conversation;
}
