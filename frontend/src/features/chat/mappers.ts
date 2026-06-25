import { mapBackendProduit, BackendProduit } from '@/lib/product.mapper';
import { Conversation, Message, SenderType, Utilisateur } from '@/types/models.types';

export interface BackendConversationResponse {
  idConversation: number;
  buyerId: string;
  seller?: Utilisateur;
  sellerId?: number;
  product?: BackendProduit;
  produit?: BackendProduit;
  dateCreation: string;
}

export interface BackendMessageResponse {
  idMessage: number;
  conversationId?: number;
  conversation?: { idConversation: number };
  senderType: SenderType;
  senderId: string;
  content?: string;
  contenu?: string;
  dateEnvoi: string;
}

export function normalizeConversation(raw: BackendConversationResponse): Conversation {
  const produitRaw = raw.product ?? raw.produit;
  const produit = produitRaw ? mapBackendProduit(produitRaw) : mapBackendProduit({ idProduit: 0, prix: 0 });
  const sellerId = raw.seller?.idUtilisateur ?? raw.sellerId ?? produit.utilisateur?.idUtilisateur ?? 0;

  return {
    idConversation: raw.idConversation,
    buyerId: raw.buyerId,
    buyerType: 'BUYER',
    sellerId,
    produit,
    dateCreation: raw.dateCreation,
  };
}

export function normalizeMessage(raw: BackendMessageResponse): Message {
  const conversationId = raw.conversationId ?? raw.conversation?.idConversation ?? 0;

  return {
    idMessage: raw.idMessage,
    contenu: raw.contenu ?? raw.content ?? '',
    dateEnvoi: raw.dateEnvoi,
    senderType: raw.senderType,
    senderId: raw.senderId,
    conversation: {
      idConversation: conversationId,
      buyerId: '',
      buyerType: 'BUYER',
      sellerId: 0,
      produit: mapBackendProduit({ idProduit: 0, prix: 0 }),
      dateCreation: raw.dateEnvoi,
    },
  };
}
