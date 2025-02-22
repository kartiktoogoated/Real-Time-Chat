import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { type Chat, type Message, type User } from '../types';
import { formatTime } from '../utils/date';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (content: string) => void;
  messages: Message[];
}

export function ChatWindow({ chat, currentUser, onSendMessage, messages }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const otherUser = chat.participants.find(p => p.id !== currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b p-4 flex items-center">
        <img
          src={otherUser?.avatar || `https://ui-avatars.com/api/?name=${otherUser?.username}`}
          alt={otherUser?.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-semibold">{otherUser?.username}</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => {
            const isSender = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isSender ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}