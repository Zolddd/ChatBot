import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import CopilotPanel from './CopilotPanel';
import { chats } from '../data/chats';
import { messages as initialMessages } from '../data/messages';
import { Menu, MessageCircle } from 'lucide-react';

const MOCK_RESPONSES = [
  "I'm just a mock AI, but I'm here to help!",
  "Sorry, I can't access the real AI right now, but let's pretend!",
  "This is a simulated response because your API quota is used up.",
  "Try upgrading your OpenAI plan to get real answers.",
  "Mock AI says: Keep coding, you're doing great!",
];

const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [messages, setMessages] = useState(initialMessages);

  const [showChatList, setShowChatList] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  const sendMessage = async (text, from = 'user') => {
    const newMessage = {
      id: Date.now(),
      chatId: selectedChatId,
      from,
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMessage]);

    if (from !== 'admin') {
      const loadingId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          chatId: selectedChatId,
          from: 'admin',
          text: '...',
          time: 'Loading',
        },
      ]);

      try {
        await new Promise((r) => setTimeout(r, 1500));
        const aiReply = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId ? { ...msg, text: aiReply, time: 'Just now' } : msg
          )
        );
      } catch (error) {
        console.error('Mock AI error:', error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? { ...msg, text: '❗ Error getting mock AI response.', time: 'Error' }
              : msg
          )
        );
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Mobile toggle buttons */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b border-gray-300">
        <button onClick={() => setShowChatList(true)} className="text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">Chat</h2>
        <button onClick={() => setShowCopilot(true)} className="text-gray-700">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* ChatList - Desktop & Mobile Drawer */}
      <div className="hidden md:block md:w-1/4 border-r border-gray-200 overflow-y-auto">
        <ChatList selectedId={selectedChatId} setSelectedId={setSelectedChatId} />
      </div>

      {showChatList && (
        <div className="fixed inset-0 z-50 bg-white shadow-lg p-4 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chats</h2>
            <button onClick={() => setShowChatList(false)} className="text-sm text-blue-600">
              Close
            </button>
          </div>
          <ChatList selectedId={selectedChatId} setSelectedId={(id) => {
            setSelectedChatId(id);
            setShowChatList(false);
          }} />
        </div>
      )}

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto">
        <ChatWindow
          selectedId={selectedChatId}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>

      {/* CopilotPanel - Desktop & Mobile Drawer */}
      <div className="hidden md:block md:w-1/4 border-l border-gray-200 overflow-y-auto">
        <CopilotPanel selectedId={selectedChatId} sendMessage={sendMessage} />
      </div>

      {showCopilot && (
        <div className="fixed inset-0 z-50 bg-white shadow-lg p-4 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Copilot</h2>
            <button onClick={() => setShowCopilot(false)} className="text-sm text-blue-600">
              Close
            </button>
          </div>
          <CopilotPanel selectedId={selectedChatId} sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
