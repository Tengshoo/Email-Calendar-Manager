
import React from 'react';
import type { CalendarEvent } from '../types';
import { Icons } from './icons';

interface ReminderToastProps {
  event: CalendarEvent;
  onDismiss: (eventId: string) => void;
}

const ReminderToast: React.FC<ReminderToastProps> = ({ event, onDismiss }) => {
  return (
    <div 
      className="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border border-gray-600 animate-fade-in-up"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Icons.bell className="h-6 w-6 text-blue-400" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-100">
              Upcoming: {event.title}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Today at {event.time}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onDismiss(event.id)}
              className="inline-flex text-gray-400 rounded-md hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              <span className="sr-only">Close</span>
              <Icons.close className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderToast;