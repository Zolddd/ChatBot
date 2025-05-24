// src/components/ChatWindow.jsx
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { chats } from '../data/chats';

const ChatWindow = ({ selectedId, messages, sendMessage }) => {
  const selectedChat = chats.find((chat) => chat.id === selectedId);
  const filteredMessages = messages.filter((msg) => msg.chatId === selectedId);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={selectedChat?.name} />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-3 rounded-md text-sm ${
              msg.from === 'admin'
                ? 'bg-indigo-100 text-right self-end'
                : 'bg-gray-100 text-left self-start'
            }`}
          >
            <p className="text-gray-800">{msg.text}</p>
            <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
          </div>
        ))}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
