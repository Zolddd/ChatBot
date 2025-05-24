// src/components/ChatList.jsx
import React from 'react';
import { chats } from '../data/chats';

const ChatList = ({ selectedId, setSelectedId }) => {
  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-lg font-bold mb-4">Your Inbox</h2>
      <div className="space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedId(chat.id)}
            className={`p-3 rounded-md cursor-pointer transition ${
              selectedId === chat.id
                ? 'bg-indigo-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold">{chat.name}</div>
            <div className="text-sm text-gray-600 truncate">{chat.message}</div>
            <div className="text-xs text-gray-400">{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
