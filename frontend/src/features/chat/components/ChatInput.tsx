import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !disabled) {
      onSendMessage(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 bg-white border-t border-gray-100">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Écrivez un message..."
        disabled={disabled}
        className="flex-1 max-h-32 min-h-[44px] resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:border-[#f2700b] focus:outline-none focus:ring-1 focus:ring-[#f2700b] disabled:opacity-50"
        rows={1}
      />
      <button
        type="submit"
        disabled={!content.trim() || disabled}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2700b] text-white transition-transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
      >
        <Send size={18} className="ml-1" />
      </button>
    </form>
  );
};
