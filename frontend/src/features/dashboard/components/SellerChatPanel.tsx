/**
 * @file SellerChatPanel.tsx
 * @feature dashboard
 * @role  Panel de chat intégré au dashboard vendeur. Réutilise les composants
 *        ChatMessage et ChatInput existants de la feature chat.
 *        Affiche la liste des conversations à gauche et les messages à droite.
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { MessageSquare, Loader2, User } from 'lucide-react';
import { useChat, useStompConnection } from '@/features/chat/hooks';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { Conversation } from '@/types/models.types';

// ─── Composant carte de conversation ─────────────────────────────────────────

interface ConversationCardProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

function ConversationCard({ conversation, isActive, onClick }: ConversationCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200"
      style={{
        backgroundColor: isActive ? '#FFF3E0' : 'transparent',
        borderLeft: isActive ? '3px solid #F2700B' : '3px solid transparent',
      }}
    >
      {/* Avatar acheteur */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: isActive ? '#F2700B' : '#d9cdb8' }}
      >
        <User size={16} style={{ color: isActive ? '#FFFFFF' : '#666666' }} />
      </div>

      {/* Info conversation */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#111111] truncate">
          {conversation.produit.nom}
        </p>
        <p className="text-xs text-[#666666] truncate">
          Acheteur #{conversation.buyerId.slice(0, 8)}…
        </p>
      </div>

      {/* Date */}
      <span className="text-[10px] text-[#999999] shrink-0">
        {new Date(conversation.dateCreation).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
        })}
      </span>
    </button>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export const SellerChatPanel: React.FC = () => {
  // Connexion STOMP
  useStompConnection();

  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    messages,
    wsStatus,
    sendMessage,
    loadConversations,
    isLoading,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Charger les conversations du vendeur
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const userId = localStorage.getItem('user_id');
    if (userId) {
      loadConversations(Number(userId));
    }
  }, [loadConversations]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  const currentUserId =
    typeof window !== 'undefined'
      ? localStorage.getItem('user_id') || ''
      : '';

  const activeMessages = activeConversationId
    ? messages[activeConversationId] || []
    : [];

  return (
    <div
      className="flex rounded-xl border border-[#d9cdb8] overflow-hidden shadow-sm"
      style={{ backgroundColor: '#EDE8DC', height: 'calc(100vh - 220px)' }}
    >
      {/* ── Sidebar conversations ── */}
      <div
        className="w-80 border-r border-[#d9cdb8] flex flex-col shrink-0"
        style={{ backgroundColor: '#F0E9D9' }}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-[#d9cdb8]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">Conversations</h3>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  wsStatus === 'CONNECTED' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-[10px] text-[#666666]">
                {wsStatus === 'CONNECTED'
                  ? 'En ligne'
                  : wsStatus === 'CONNECTING'
                    ? 'Connexion...'
                    : 'Hors ligne'}
              </span>
            </div>
          </div>
        </div>

        {/* Liste des conversations */}
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-[#F2700B]" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: '#F2700B22' }}
              >
                <MessageSquare size={20} style={{ color: '#F2700B' }} />
              </div>
              <p className="text-sm font-medium text-[#444444]">
                Aucune conversation
              </p>
              <p className="text-xs text-[#666666] mt-1">
                Les acheteurs vous contacteront ici
              </p>
            </div>
          ) : (
            conversations.map((conv) => (
              <ConversationCard
                key={conv.idConversation}
                conversation={conv}
                isActive={activeConversationId === conv.idConversation}
                onClick={() => setActiveConversation(conv.idConversation)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Zone de messages ── */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: '#F8F5EE' }}>
        {!activeConversationId ? (
          // État : aucune conversation sélectionnée
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#F2700B11' }}
            >
              <MessageSquare size={28} style={{ color: '#F2700B' }} />
            </div>
            <p className="font-bold text-[#111111]">Messagerie vendeur</p>
            <p className="text-sm text-[#666666] mt-1">
              Sélectionnez une conversation pour commencer à répondre
            </p>
          </div>
        ) : (
          <>
            {/* En-tête de la conversation active */}
            <div
              className="px-6 py-4 border-b border-[#d9cdb8] shrink-0"
              style={{ backgroundColor: '#F0E9D9' }}
            >
              {(() => {
                const activeConv = conversations.find(
                  (c) => c.idConversation === activeConversationId
                );
                return activeConv ? (
                  <div>
                    <p className="text-sm font-bold text-[#111111]">
                      {activeConv.produit.nom}
                    </p>
                    <p className="text-xs text-[#666666]">
                      Négociation avec acheteur #{activeConv.buyerId.slice(0, 8)}…
                    </p>
                  </div>
                ) : null;
              })()}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-sm text-[#666666]">Aucun message</p>
                  <p className="text-xs text-[#999999] mt-1">
                    Envoyez un premier message pour démarrer la négociation
                  </p>
                </div>
              ) : (
                activeMessages.map((msg) => (
                  <ChatMessage
                    key={msg.idMessage}
                    message={msg}
                    currentUserId={currentUserId}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#d9cdb8]">
              <ChatInput
                onSendMessage={(content) => sendMessage(content, "SELLER")}
                disabled={wsStatus !== 'CONNECTED' || !activeConversationId}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
