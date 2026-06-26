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
      console.error('Failed to load conversations', err);
      setChatError(err instanceof Error ? err.message : 'Impossible de charger les conversations');
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
      console.error('Failed to start negotiation', err);
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

    stompClient.subscribe(topic, (stompMessage: IMessage) => {
      try {
        const raw = JSON.parse(stompMessage.body) as BackendMessageResponse;
        useChatStore.getState().appendMessage(normalizeMessage(raw));
      } catch (err) {
        console.error('Failed to parse incoming message', err);
      }
    });

    chatApi.loadMessageHistory(activeConversationId)
      .then((res) => {
        useChatStore.getState().setMessages(activeConversationId, [...res.content].reverse());
      })
      .catch((err) => console.error('Failed to load messages', err));

    return () => {
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
      content: content.trim(),
    };

    stompClient.publish('/app/chat.send', payload);
  }, []);

  return {
    isSidebarOpen,
    activeConversationId,
    conversations,
    messages,
    wsStatus,
    setSidebarOpen,
    setActiveConversation,
    isLoading,
    chatError,
    loadConversations,
    startNegotiation,
    sendMessage,
  };
};
