import { useEffect, useCallback, useState } from 'react';
import { useChatStore } from './store';
import { chatApi } from './api';
import { stompClient } from '@/lib/stomp.client';
import { IMessage } from '@stomp/stompjs';
import { Message, SenderType } from '@/types/models.types';
import { CreateConversationPayload, StompSendPayload } from './types';
import { normalizeMessage, BackendMessageResponse } from './mappers';
import { useAuthStore } from '@/store/auth.store';

/** Identifiant acheteur invité — persisté via initGuest */
const ensureBuyerId = (): string => {
  if (typeof window === 'undefined') return 'guest-unknown';
  useAuthStore.getState().initGuest();
  return localStorage.getItem('guest_id') || useAuthStore.getState().guestId || 'guest-unknown';
};

/** Identifiant vendeur connecté (dashboard messagerie) */
const getSellerId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_id');
};

export const useStompConnection = () => {
  useEffect(() => {
    // Connexion WS avec l'identité acheteur ou vendeur disponible
    const userId = getSellerId() || ensureBuyerId();
    const { setWsStatus } = useChatStore.getState();

    setWsStatus('CONNECTING');
    stompClient.connect(
      userId,
      () => useChatStore.getState().setWsStatus('CONNECTED'),
      () => useChatStore.getState().setWsStatus('ERROR')
    );

    return () => {
      stompClient.disconnect();
      useChatStore.getState().setWsStatus('DISCONNECTED');
    };
  }, []);
};

export const useChat = () => {
  const isSidebarOpen = useChatStore((s) => s.isSidebarOpen);
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const conversations = useChatStore((s) => s.conversations);
  const messages = useChatStore((s) => s.messages);
  const wsStatus = useChatStore((s) => s.wsStatus);
  const pendingConversation = useChatStore((s) => s.pendingConversation);
  const setSidebarOpen = useChatStore((s) => s.setSidebarOpen);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);

  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const loadConversations = useCallback(async (sellerId: number) => {
    try {
      setIsLoading(true);
      setChatError(null);
      const data = await chatApi.loadSellerConversations(sellerId);
      useChatStore.getState().setConversations(data);
    } catch (err) {
      setChatError(err instanceof Error ? err.message : 'Impossible de charger les conversations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openChatForProduct = useCallback(async (productId: number, sellerId: number) => {
    try {
      setIsLoading(true);
      setChatError(null);
      const buyerId = ensureBuyerId();
      const payload: CreateConversationPayload = { buyerId, sellerId, productId };
      const conversation = await chatApi.initiateConversation(payload);
      
      const state = useChatStore.getState();
      state.addConversation(conversation);
      state.setActiveConversation(conversation.idConversation);
      state.setPendingConversation(null);
      state.setSidebarOpen(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Impossible de charger la conversation';
      setChatError(msg);
      if (typeof window !== 'undefined') {
        window.alert(`Erreur Chat: ${msg}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startNegotiation = useCallback(async (productId: number, sellerId: number) => {
    try {
      setIsLoading(true);
      setChatError(null);
      const buyerId = ensureBuyerId();
      const payload: CreateConversationPayload = { buyerId, sellerId, productId };
      const conversation = await chatApi.initiateConversation(payload);
      const state = useChatStore.getState();
      state.addConversation(conversation);
      state.setActiveConversation(conversation.idConversation);
      state.setSidebarOpen(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Impossible de démarrer la conversation';
      setChatError(msg);
      if (typeof window !== 'undefined') {
        window.alert(`Erreur Chat: ${msg}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activeConversationId || wsStatus !== 'CONNECTED') return;

    const topic = `/topic/conversation/${activeConversationId}`;

    // Petit délai pour s'assurer que le client STOMP est prêt
    const timeoutId = setTimeout(() => {
      stompClient.subscribe(topic, (stompMessage: IMessage) => {
        try {
          const raw = JSON.parse(stompMessage.body) as BackendMessageResponse;
          useChatStore.getState().appendMessage(normalizeMessage(raw));
        } catch (err) {
          // Error parsing message - silently ignore
        }
      });
    }, 100);

    chatApi.loadMessageHistory(activeConversationId)
      .then((res) => {
        useChatStore.getState().setMessages(activeConversationId, [...res.content].reverse());
      })
      .catch((err) => {
        // Error loading message history - silently ignore
      });

    return () => {
      clearTimeout(timeoutId);
      stompClient.unsubscribe(topic);
    };
  }, [activeConversationId, wsStatus]);

  const sendMessage = useCallback((content: string, asRole?: SenderType) => {
    const { activeConversationId: convId, conversations } = useChatStore.getState();
    if (!convId || !content.trim()) return;

    const conv = conversations.find((c) => c.idConversation === convId);
    const sellerUserId = getSellerId();

    let senderId: string;
    let senderType: SenderType;

    if (asRole === 'SELLER') {
      senderId = sellerUserId || String(conv?.sellerId);
      senderType = 'SELLER';
    } else if (asRole === 'BUYER') {
      senderId = conv?.buyerId ?? ensureBuyerId();
      senderType = 'BUYER';
    } else {
      // Fallback
      if (sellerUserId && conv && conv.sellerId === Number(sellerUserId)) {
        senderId = sellerUserId;
        senderType = 'SELLER';
      } else {
        senderId = conv?.buyerId ?? ensureBuyerId();
        senderType = 'BUYER';
      }
    }

    const payload: StompSendPayload = {
      conversationId: convId,
      senderId,
      senderType,
      contenu: content.trim(),
    };

    stompClient.publish('/app/chat.send', payload);
  }, []);

  const sendMessageWithConversation = useCallback(async (content: string, productId: number, sellerId: number) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      setChatError(null);

      // Create conversation first
      const buyerId = ensureBuyerId();
      const payload: CreateConversationPayload = { buyerId, sellerId, productId };
      const conversation = await chatApi.initiateConversation(payload);

      const state = useChatStore.getState();
      state.addConversation(conversation);
      state.setActiveConversation(conversation.idConversation);
      state.setPendingConversation(null);

      // Send the message
      const stompPayload: StompSendPayload = {
        conversationId: conversation.idConversation,
        senderId: buyerId,
        senderType: 'BUYER',
        contenu: content.trim(),
      };

      stompClient.publish('/app/chat.send', stompPayload);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Impossible d\'envoyer le message';
      setChatError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isSidebarOpen,
    activeConversationId,
    conversations,
    messages,
    wsStatus,
    pendingConversation,
    setSidebarOpen,
    setActiveConversation,
    isLoading,
    chatError,
    loadConversations,
    openChatForProduct,
    startNegotiation,
    sendMessage,
    sendMessageWithConversation,
  };
};
