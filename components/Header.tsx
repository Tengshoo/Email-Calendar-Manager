import React from 'react';
import { Icons } from './icons';

interface HeaderProps {
  userId: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userId, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <Icons.logo className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-100 tracking-tight">Focus Flow</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
          <span className="font-mono">{userId}</span>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          aria-label="Logout"
        >
          <Icons.logout className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
