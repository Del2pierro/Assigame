import api from './api.client';
import { Conversation, Message } from '@/types/models.types';
import { PaginatedResponse } from '@/types/api.types';
import { CreateConversationPayload } from '@/features/chat/types';
import {
  BackendConversationResponse,
  BackendMessageResponse,
  normalizeConversation,
  normalizeMessage,
} from '@/features/chat/mappers';

export const chatService = {
  /**
   * Crée ou récupère une conversation existante
   */
  createConversation: async (payload: CreateConversationPayload): Promise<Conversation> => {
    const response = await api.post<BackendConversationResponse>('/conversations', payload);
    return normalizeConversation(response.data);
  },

  /**
   * Récupère toutes les conversations d'un vendeur
   */
  getSellerConversations: async (sellerId: number): Promise<Conversation[]> => {
    const response = await api.get<BackendConversationResponse[]>(`/conversations/seller/${sellerId}`);
    return response.data.map(normalizeConversation);
  },

  /**
   * Récupère l'historique paginé des messages
   */
  getMessages: async (conversationId: number, page: number = 0, size: number = 50): Promise<PaginatedResponse<Message>> => {
    const response = await api.get<PaginatedResponse<BackendMessageResponse> | BackendMessageResponse[]>(
      `/messages/${conversationId}`,
      { params: { page, size } }
    );

    const raw = response.data;
    const content = (Array.isArray(raw) ? raw : raw.content).map(normalizeMessage);

    if (Array.isArray(raw)) {
      return { content, totalElements: content.length, totalPages: 1, number: 0, size: content.length };
    }

    return { ...raw, content };
  },
};
