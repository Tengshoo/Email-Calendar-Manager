
import React, { useState, useMemo } from 'react';
import type { CalendarEvent } from '../types';
import { Icons } from './icons';

interface CalendarPanelProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onAddEvent: () => void;
  selectedItemId?: string | null;
}

interface CalendarWidgetProps {
  events: CalendarEvent[];
  displayDate: Date;
  onDisplayDateChange: (newDate: Date) => void;
  selectedDate: Date;
  onSelectedDateChange: (newDate: Date) => void;
  isExpanded: boolean;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  events,
  displayDate,
  onDisplayDateChange,
  selectedDate,
  onSelectedDateChange,
  isExpanded,
}) => {
  const monthName = displayDate.toLocaleString('default', { month: 'long' });
  const year = displayDate.getFullYear();

  const daysInMonth = new Date(year, displayDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, displayDate.getMonth(), 1).getDay();

  const eventDays = useMemo(() => {
    const days = new Set<number>();
    events.forEach(event => {
        const eventDate = new Date(event.date);
        // Adjust for timezone differences to treat date as local
        eventDate.setMinutes(eventDate.getMinutes() + eventDate.getTimezoneOffset());
        if(eventDate.getMonth() === displayDate.getMonth() && eventDate.getFullYear() === year) {
            days.add(eventDate.getDate());
        }
    });
    return days;
  }, [events, displayDate, year]);

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDisplayDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDisplayDateChange(newDate);
  };
  
  const today = new Date();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Previous month">
          <Icons.chevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-semibold text-center">{monthName} {year}</h3>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Next month">
          <Icons.chevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-400">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-medium">{day}</div>)}
        {blanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const dayDate = new Date(year, displayDate.getMonth(), day);
          const isToday = day === today.getDate() && displayDate.getMonth() === today.getMonth() && year === today.getFullYear();
          const isSelected = day === selectedDate.getDate() && displayDate.getMonth() === selectedDate.getMonth() && year === selectedDate.getFullYear();

          return (
            <div 
              key={day} 
              onClick={() => onSelectedDateChange(dayDate)}
              className="flex items-center justify-center h-8"
            >
              <div
                className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer
                  ${isSelected ? 'bg-blue-600 text-white font-bold' : ''}
                  ${!isSelected && isToday ? 'bg-gray-600 text-white' : ''}
                  ${!isSelected ? 'hover:bg-gray-700' : ''}
                `}
              >
                {day}
                {eventDays.has(day) && <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-400'}`}></div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};


const CalendarPanel: React.FC<CalendarPanelProps> = ({ events, onSelectEvent, onAddEvent, selectedItemId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setDisplayDate(date);
  }

  const filteredEvents = useMemo(() => {
    const selectedDay = selectedDate.toISOString().split('T')[0];
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        // Adjust for timezone to correctly compare dates
        eventDate.setMinutes(eventDate.getMinutes() + eventDate.getTimezoneOffset());
        return eventDate.toISOString().split('T')[0] === selectedDay;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [events, selectedDate]);

  const getEventListTitle = () => {
    const today = new Date();
    if (selectedDate.toDateString() === today.toDateString()) {
      return "Today's Events";
    }
    return `Events for ${selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`;
  }

  return (
    <div className="flex flex-col bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-controls="calendar-expand-content"
        aria-expanded={isExpanded}
      >
        <h2 className="text-lg font-semibold">Calendar</h2>
        <button
          className="p-1 text-gray-400 hover:text-white"
          aria-label={isExpanded ? 'Collapse calendar' : 'Expand calendar'}
        >
          {isExpanded ? <Icons.chevronUp className="h-5 w-5" /> : <Icons.chevronDown className="h-5 w-5" />}
        </button>
      </div>

      <div 
        id="calendar-expand-content"
        className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <CalendarWidget 
          events={events}
          displayDate={displayDate}
          onDisplayDateChange={setDisplayDate}
          selectedDate={selectedDate}
          onSelectedDateChange={handleSelectDate}
          isExpanded={isExpanded}
        />
      </div>

      <div className="flex items-center justify-between p-4 border-t border-b border-gray-700/50">
        <h2 className="text-lg font-semibold">{getEventListTitle()}</h2>
        <button
          onClick={onAddEvent}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          <Icons.plus className="h-5 w-5" />
          <span>Add Event</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={`flex items-start space-x-4 p-4 cursor-pointer transition-colors duration-150 ${
                  selectedItemId === event.id ? 'bg-blue-900/40' : 'hover:bg-gray-700/40'
                }`}
              >
                <div className="text-center font-semibold text-gray-300 w-12 flex-shrink-0">
                  <p>{event.time}</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-100">{event.title}</p>
                  <p className="text-sm text-gray-400">{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No events scheduled for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPanel;
