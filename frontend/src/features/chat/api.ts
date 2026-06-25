import { chatService } from '@/services/chat.service';
import { CreateConversationPayload } from './types';
import { Conversation, Message } from '@/types/models.types';
import { PaginatedResponse } from '@/types/api.types';

export const chatApi = {
  initiateConversation: async (payload: CreateConversationPayload): Promise<Conversation> => {
    return chatService.createConversation(payload);
  },

  loadSellerConversations: async (sellerId: number): Promise<Conversation[]> => {
    return chatService.getSellerConversations(sellerId);
  },

  loadMessageHistory: async (conversationId: number, page?: number, size?: number): Promise<PaginatedResponse<Message>> => {
    return chatService.getMessages(conversationId, page, size);
  }
};
