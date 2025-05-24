// src/components/CopilotPanel.jsx
import React, { useState } from 'react';
import { chats } from '../data/chats';

const CopilotPanel = ({ selectedId, sendMessage }) => {
  const [activeTab, setActiveTab] = useState('copilot');
  const selectedChat = chats.find((chat) => chat.id === selectedId);

  const suggestions = [
    'Can you summarize this conversation?',
    'What was the customer’s intent?',
    'Write a follow-up email',
  ];

  return (
    <div className="h-full flex flex-col p-4">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            activeTab === 'copilot'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('copilot')}
        >
          AI Copilot
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            activeTab === 'details'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
      </div>

      {/* Content */}
      {activeTab === 'copilot' ? (
        <div>
          <h2 className="text-lg font-bold mb-2">Fin AI Copilot</h2>
          <p className="text-sm text-gray-600 mb-4">
            Hi, I’m Fin — your AI copilot. Ask me anything or try these:
          </p>
          <ul className="space-y-2 text-sm">
            {suggestions.map((text, idx) => (
              <li
                key={idx}
                onClick={() => sendMessage(text)}
                className="bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-2">User Details</h2>
          <div className="text-sm text-gray-600">
            <p><strong>Name:</strong> {selectedChat?.name}</p>
            <p><strong>Email:</strong> {selectedChat?.email}</p>
            <p><strong>Company:</strong> {selectedChat?.company}</p>
            <p><strong>Status:</strong> {selectedChat?.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotPanel;
