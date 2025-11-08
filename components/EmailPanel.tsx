
import React, { useState, useMemo } from 'react';
import type { Email } from '../types';
import { Icons } from './icons';

interface EmailPanelProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  onNewEmail: () => void;
  selectedItemId?: string | null;
}

type DateFilter = 'all' | 'today' | 'week';

const EmailPanel: React.FC<EmailPanelProps> = ({ emails, onSelectEmail, onNewEmail, selectedItemId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diffDays === 1) {
      return 'Yesterday';
    }
    return date.toLocaleDateString();
  };
  
  const filterOptions: { label: string; value: DateFilter }[] = [
    { label: 'All Time', value: 'all' },
    { label: 'This Week', value: 'week' },
    { label: 'Today', value: 'today' },
  ];

  const filteredEmails = useMemo(() => {
    let filtered = emails;

    // Date filtering
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (dateFilter === 'today') {
        filtered = filtered.filter(email => new Date(email.timestamp) >= today);
      } else if (dateFilter === 'week') {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(startOfWeek.getDate() - now.getDay()); // Assuming week starts on Sunday
        filtered = filtered.filter(email => new Date(email.timestamp) >= startOfWeek);
      }
    }

    // Search term filtering
    if (searchTerm.trim() !== '') {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        email =>
          email.sender.toLowerCase().includes(lowercasedTerm) ||
          email.subject.toLowerCase().includes(lowercasedTerm)
      );
    }

    return filtered;
  }, [emails, searchTerm, dateFilter]);

  return (
    <div className="flex flex-col bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <h2 className="text-lg font-semibold">Inbox</h2>
        <button
          onClick={onNewEmail}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          <Icons.plus className="h-5 w-5" />
          <span>New Email</span>
        </button>
      </div>

      <div className="p-4 border-b border-gray-700/50 space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icons.search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search by sender or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div className="flex items-center justify-center space-x-2">
          {filterOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setDateFilter(value)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                dateFilter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-700/50">
          {filteredEmails.map((email) => (
            <li
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={`p-4 cursor-pointer transition-colors duration-150 ${
                selectedItemId === email.id ? 'bg-blue-900/40' : 'hover:bg-gray-700/40'
              }`}
            >
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-100 truncate">{email.sender}</p>
                <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatTimestamp(email.timestamp)}</p>
              </div>
              <p className="text-sm text-gray-300 truncate mt-1">{email.subject}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmailPanel;