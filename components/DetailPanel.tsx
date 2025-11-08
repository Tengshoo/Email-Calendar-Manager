
import React, { useState, useEffect } from 'react';
import type { AppItem, Email, CalendarEvent } from '../types';
import { summarizeEmail } from '../services/geminiService';
import { Icons } from './icons';

interface DetailPanelProps {
  item: AppItem | null;
}

// Type guard to check if an item is an Email
const isEmail = (item: AppItem): item is Email => {
  return (item as Email).subject !== undefined;
};

const DetailPanel: React.FC<DetailPanelProps> = ({ item }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset summary state when a new item is selected
    setSummary(null);
    setError(null);
    setIsLoading(false);
  }, [item]);

  const handleSummarize = async () => {
    if (item && isEmail(item)) {
      setIsLoading(true);
      setError(null);
      setSummary(null);
      try {
        const result = await summarizeEmail(item.body);
        setSummary(result);
      } catch (e) {
        setError('Failed to generate summary. Please try again.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <Icons.inbox className="h-24 w-24 mb-4" />
      <h3 className="text-xl font-semibold">Select an item</h3>
      <p className="text-center">Choose an email or event to see the details here.</p>
    </div>
  );

  const renderEmailDetails = (email: Email) => (
    <>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">{email.subject}</h2>
        <p className="text-sm text-gray-400">
          From: <span className="font-medium text-gray-300">{email.sender}</span>
        </p>
        <p className="text-sm text-gray-400">
          Date: {new Date(email.timestamp).toLocaleString()}
        </p>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 whitespace-pre-wrap">
            {email.body}
        </div>
      </div>
      <div className="p-4 border-t border-gray-700 space-y-4">
        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
        >
          <Icons.gemini className="h-5 w-5" />
          <span>{isLoading ? 'Summarizing...' : 'Summarize with Gemini'}</span>
        </button>
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        {summary && (
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="font-semibold text-gray-100 mb-2">Summary:</h4>
            <p className="text-sm text-gray-300">{summary}</p>
          </div>
        )}
      </div>
    </>
  );

  const renderEventDetails = (event: CalendarEvent) => (
    <>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">{event.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Icons.calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
         <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100">
            <p>{event.description}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
      {!item 
        ? renderEmptyState() 
        : isEmail(item) 
        ? renderEmailDetails(item) 
        : renderEventDetails(item)}
    </div>
  );
};

export default DetailPanel;
