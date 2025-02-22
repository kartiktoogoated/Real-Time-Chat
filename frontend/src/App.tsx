import { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { type Chat, type Message, type User } from './types';

// Dummy data for demonstration
const dummyUser: User = {
  id: '1',
  username: 'demo_user',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const dummyChats: Chat[] = [
  {
    id: '1',
    participants: [
      dummyUser,
      { id: '2', username: 'alice', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ],
    lastMessage: {
      id: '1',
      content: 'Hey there!',
      senderId: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  },
  {
    id: '2',
    participants: [
      dummyUser,
      { id: '3', username: 'bob', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ],
    lastMessage: {
      id: '2',
      content: 'See you tomorrow!',
      senderId: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    }
  }
];

const dummyMessages: Message[] = [
  {
    id: '1',
    content: 'Hey there!',
    senderId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    content: 'Hi! How are you?',
    senderId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: '3',
    content: 'I'm doing great, thanks for asking!',
    senderId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleAuth = (username: string, password: string) => {
    // Here you would typically make an API call to authenticate
    console.log('Auth attempt:', { username, password, isLogin });
    setIsAuthenticated(true);
  };

  const handleSendMessage = (content: string) => {
    // Here you would typically make an API call to send the message
    console.log('Sending message:', content);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <AuthForm onSubmit={handleAuth} isLogin={isLogin} />
        <p className="text-gray-600 mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/3 border-r">
        <ChatList
          chats={dummyChats}
          currentUser={dummyUser}
          onSelectChat={setSelectedChat}
          selectedChatId={selectedChat?.id}
        />
      </div>
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            currentUser={dummyUser}
            onSendMessage={handleSendMessage}
            messages={dummyMessages}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;