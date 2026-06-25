'use client';

import React, { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useChat, useStompConnection } from '../hooks';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatSidebar: React.FC = () => {
  useStompConnection();

  const {
    isSidebarOpen,
    setSidebarOpen,
    activeConversationId,
    messages,
    wsStatus,
    sendMessage,
    isLoading,
    chatError,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = typeof window !== 'undefined'
    ? (localStorage.getItem('guest_id') || localStorage.getItem('user_id') || '')
    : '';

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  if (!isSidebarOpen) return null;

  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col bg-[#f0e9d9] shadow-2xl sm:w-[400px] transition-transform duration-300 transform translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200/50 bg-white/50 px-4 py-4 backdrop-blur-md">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">Négociation</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {wsStatus === 'CONNECTED' ? 'Connecté' : wsStatus === 'CONNECTING' ? 'Connexion...' : 'Déconnecté'}
              </span>
              <div className={`h-2 w-2 rounded-full ${wsStatus === 'CONNECTED' ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatError && (
            <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{chatError}</p>
          )}
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#f2700b]" />
            </div>
          ) : activeMessages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
              <p className="text-sm">Aucun message pour le moment.</p>
              <p className="text-xs mt-1">Commencez la négociation !</p>
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
        <div className="bg-white/50 p-2 backdrop-blur-md">
          <ChatInput 
            onSendMessage={sendMessage} 
            disabled={wsStatus !== 'CONNECTED' || !activeConversationId} 
          />
        </div>
      </div>
    </>
  );
};
