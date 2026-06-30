import { Conversation, Message, SenderType } from '@/types/models.types';

export type WsStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR';

export interface StompSendPayload {
  conversationId: number;
  senderId: string;
  senderType: SenderType;
  contenu: string;
}

export interface CreateConversationPayload {
  buyerId: string;
  sellerId: number;
  productId: number;
}

export interface PendingConversation {
  productId: number;
  sellerId: number;
}

export interface ChatState {
  isSidebarOpen: boolean;
  activeConversationId: number | null;
  conversations: Conversation[];
  messages: Record<number, Message[]>;
  wsStatus: WsStatus;
  pendingConversation: PendingConversation | null;
  
  // Actions
  setSidebarOpen: (isOpen: boolean) => void;
  setActiveConversation: (id: number | null) => void;
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  setMessages: (conversationId: number, messages: Message[]) => void;
  appendMessage: (message: Message) => void;
  setWsStatus: (status: WsStatus) => void;
  setPendingConversation: (pending: PendingConversation | null) => void;
  clearChat: () => void;
}
