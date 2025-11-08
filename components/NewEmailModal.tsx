
import React, { useState } from 'react';
import type { Email } from '../types';
import { Icons } from './icons';

interface NewEmailModalProps {
  onClose: () => void;
  onSend: (newEmail: Omit<Email, 'id' | 'timestamp'>) => void;
}

const NewEmailModal: React.FC<NewEmailModalProps> = ({ onClose, onSend }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!to || !subject || !body) {
      // Simple validation
      alert('Please fill out all fields.');
      return;
    }
    onSend({ sender: 'Me', subject, body });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700 mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">New Email</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <Icons.close className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-400 mb-1">To</label>
            <input
              type="email"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-400 mb-1">Body</label>
            <textarea
              id="body"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
          <button
            onClick={handleSend}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
          >
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEmailModal;
