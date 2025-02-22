import React from 'react';
import { type Chat, type User } from '../types';
import { formatDistanceToNow } from '../utils/date';

interface ChatListProps {
  chats: Chat[];
  currentUser: User;
  onSelectChat: (chat: Chat) => void;
  selectedChatId?: string;
}

export function ChatList({ chats, currentUser, onSelectChat, selectedChatId }: ChatListProps) {
  return (
    <div className="bg-white h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {chats.map((chat) => {
          const otherUser = chat.participants.find(p => p.id !== currentUser.id);
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b ${
                selectedChatId === chat.id ? 'bg-blue-50' : ''
              }`}
            >
              <img
                src={otherUser?.avatar || `https://ui-avatars.com/api/?name=${otherUser?.username}`}
                alt={otherUser?.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{otherUser?.username}</h3>
                  {chat.lastMessage && (
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(chat.lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                {chat.lastMessage && (
                  <p className="text-gray-600 text-sm truncate">
                    {chat.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}