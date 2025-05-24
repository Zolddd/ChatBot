// src/App.js
import React from 'react';
import ChatLayout from './components/ChatLayout';

const App = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-4">
      <ChatLayout />
    </div>
  );
};

export default App;
