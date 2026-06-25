import React from 'react';
import { Message, SenderType } from '@/types/models.types';

interface ChatMessageProps {
  message: Message;
  currentUserId: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUserId }) => {
  const isMine = message.senderId === currentUserId;

  return (
    <div className={`flex w-full mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
          isMine
            ? 'bg-[#f2700b] text-white rounded-tr-none'
            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.contenu}</p>
        <span
          className={`text-[10px] mt-1 block text-right ${
            isMine ? 'text-orange-200' : 'text-gray-400'
          }`}
        >
          {new Date(message.dateEnvoi).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
