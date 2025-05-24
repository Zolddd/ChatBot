// src/components/ChatHeader.jsx
import React from 'react';
import { FiMoreHorizontal, FiSearch, FiPhone, FiVideo } from 'react-icons/fi';

const ChatHeader = ({ name }) => {
  return (
    <div className="flex justify-between items-center border-b px-4 py-3">
      {/* Contact Name */}
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

      {/* Action Icons */}
      <div className="flex items-center space-x-4 text-gray-500">
        <FiSearch className="cursor-pointer hover:text-gray-700" />
        <FiPhone className="cursor-pointer hover:text-gray-700" />
        <FiVideo className="cursor-pointer hover:text-gray-700" />
        <FiMoreHorizontal className="cursor-pointer hover:text-gray-700" />
        <button className="text-sm px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
