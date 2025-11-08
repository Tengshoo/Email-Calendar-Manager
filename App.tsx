import React, { useState, useEffect } from 'react';
import type { Email, CalendarEvent, AppItem } from './types';
import { MOCK_EMAILS, MOCK_EVENTS } from './data/mockData';
import Header from './components/Header';
import EmailPanel from './components/EmailPanel';
import DetailPanel from './components/DetailPanel';
import CalendarPanel from './components/CalendarPanel';
import NewEmailModal from './components/NewEmailModal';
import AddEventModal from './components/AddEventModal';
import ReminderToast from './components/ReminderToast';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [selectedItem, setSelectedItem] = useState<AppItem | null>(null);
  const [isNewEmailModalOpen, setNewEmailModalOpen] = useState(false);
  const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
  const [reminders, setReminders] = useState<CalendarEvent[]>([]);
  const [notifiedEventIds, setNotifiedEventIds] = useState<Set<string>>(new Set());

  const mockUserId = 'user-g7h3k9';
  const REMINDER_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const upcomingEvents: CalendarEvent[] = [];

      events.forEach(event => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        const timeUntilEvent = eventDateTime.getTime() - now.getTime();
        
        if (
          timeUntilEvent > 0 &&
          timeUntilEvent <= REMINDER_WINDOW_MS &&
          !notifiedEventIds.has(event.id)
        ) {
          upcomingEvents.push(event);
          setNotifiedEventIds(prev => new Set(prev).add(event.id));
        }
      });
      
      if (upcomingEvents.length > 0) {
        setReminders(prevReminders => {
            const newReminders = upcomingEvents.filter(ue => !prevReminders.some(pr => pr.id === ue.id));
            return [...prevReminders, ...newReminders];
        });
      }
    };

    const intervalId = setInterval(checkReminders, 1000 * 30); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [events, notifiedEventIds, REMINDER_WINDOW_MS]);


  const handleAddNewEmail = (newEmail: Omit<Email, 'id' | 'timestamp'>) => {
    const emailToAdd: Email = {
      ...newEmail,
      id: `email-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setEmails([emailToAdd, ...emails]);
    setNewEmailModalOpen(false);
  };

  const handleAddNewEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const eventToAdd: CalendarEvent = {
      ...newEvent,
      id: `event-${Date.now()}`,
    };
    setEvents([...events, eventToAdd].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setAddEventModalOpen(false);
  };

  const handleDismissReminder = (eventId: string) => {
    setReminders(reminders.filter(r => r.id !== eventId));
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedItem(null); // Reset selected item on logout
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <Header userId={mockUserId} onLogout={handleLogout} />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[350px_1fr_350px] gap-4 p-4 overflow-hidden">
        <EmailPanel
          emails={emails}
          onSelectEmail={setSelectedItem}
          onNewEmail={() => setNewEmailModalOpen(true)}
          selectedItemId={selectedItem?.id}
        />
        <DetailPanel item={selectedItem} />
        <CalendarPanel
          events={events}
          onSelectEvent={setSelectedItem}
          onAddEvent={() => setAddEventModalOpen(true)}
          selectedItemId={selectedItem?.id}
        />
      </main>
      {isNewEmailModalOpen && (
        <NewEmailModal
          onClose={() => setNewEmailModalOpen(false)}
          onSend={handleAddNewEmail}
        />
      )}
      {isAddEventModalOpen && (
        <AddEventModal
          onClose={() => setAddEventModalOpen(false)}
          onAdd={handleAddNewEvent}
        />
      )}
      <div aria-live="assertive" className="fixed bottom-4 right-4 z-50 space-y-4">
        {reminders.map(event => (
          <ReminderToast
            key={event.id}
            event={event}
            onDismiss={handleDismissReminder}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
