/* eslint-disable no-console */
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
    try {
      const response = await api.post<BackendConversationResponse>('/conversations', payload);
      const conversation = normalizeConversation(response.data);
      return conversation;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère toutes les conversations d'un vendeur
   */
  getSellerConversations: async (sellerId: number): Promise<Conversation[]> => {
    try {
      const response = await api.get<BackendConversationResponse[]>(`/conversations/seller/${sellerId}`);
      const conversations = response.data.map(normalizeConversation);
      return conversations;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère l'historique paginé des messages
   */
  getMessages: async (conversationId: number, page: number = 0, size: number = 50): Promise<PaginatedResponse<Message>> => {
    try {
      const response = await api.get<PaginatedResponse<BackendMessageResponse> | BackendMessageResponse[]>(
        `/messages/${conversationId}`,
        { params: { page, size } }
      );

      const raw = response.data;
      const content = (Array.isArray(raw) ? raw : raw.content).map(normalizeMessage);

      const paginatedResponse = Array.isArray(raw)
        ? { content, totalElements: content.length, totalPages: 1, number: 0, size: content.length }
        : { ...raw, content };
      
      return paginatedResponse;
    } catch (error) {
      throw error;
    }
  },
};
