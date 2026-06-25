import { create } from 'zustand';
import { ChatState, WsStatus } from './types';
import { Conversation, Message } from '@/types/models.types';

export const useChatStore = create<ChatState>((set) => ({
  isSidebarOpen: false,
  activeConversationId: null,
  conversations: [],
  messages: {},
  wsStatus: 'DISCONNECTED',

  setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
  
  setActiveConversation: (id: number | null) => set({ activeConversationId: id }),
  
  setConversations: (conversations: Conversation[]) => set({ conversations }),
  
  addConversation: (conversation: Conversation) => set((state) => ({
    conversations: [conversation, ...state.conversations.filter(c => c.idConversation !== conversation.idConversation)]
  })),
  
  setMessages: (conversationId: number, msgs: Message[]) => set((state) => ({
    messages: {
      ...state.messages,
      [conversationId]: msgs
    }
  })),
  
  appendMessage: (message: Message) => set((state) => {
    const convId = message.conversation?.idConversation;
    if (!convId) return state;
    const existing = state.messages[convId] || [];
    if (existing.some(m => m.idMessage === message.idMessage)) {
      return state;
    }
    return {
      messages: {
        ...state.messages,
        [convId]: [...existing, message]
      }
    };
  }),
  
  setWsStatus: (status: WsStatus) => set({ wsStatus: status }),
  
  clearChat: () => set({
    isSidebarOpen: false,
    activeConversationId: null,
    conversations: [],
    messages: {},
    wsStatus: 'DISCONNECTED'
  })
}));
