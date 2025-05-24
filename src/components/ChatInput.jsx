// src/components/ChatInput.jsx
import React, { useState } from 'react';

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim(), 'user');
    setInput('');
  };

  return (
    <div className="border-t p-3 flex items-center">
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
