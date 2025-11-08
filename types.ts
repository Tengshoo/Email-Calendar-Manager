
export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO string format
  time: string; // "HH:MM"
  description: string;
}

export type AppItem = Email | CalendarEvent;
