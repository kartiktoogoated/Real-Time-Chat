export interface User {
    id: string;
    username: string;
    avatar?: string;
  }
  
  export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
  }
  
  export interface Chat {
    id: string;
    participants: User[];
    lastMessage?: Message;
  }