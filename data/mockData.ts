
import type { Email, CalendarEvent } from '../types';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

export const MOCK_EMAILS: Email[] = [
  {
    id: 'email-1',
    sender: 'Alex Johnson',
    subject: 'Project Phoenix Update',
    body: `Hi Team,\n\nJust a quick update on Project Phoenix. We've hit a major milestone with the deployment of the alpha version. The feedback has been overwhelmingly positive. Let's sync up tomorrow to discuss the next steps. Please review the attached performance report.\n\nBest,\nAlex`,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'email-2',
    sender: 'Samantha Lee',
    subject: 'Marketing Q3 Budget Proposal',
    body: `Hello,\n\nPlease find the attached budget proposal for Q3. I've outlined our key initiatives, including the new social media campaign and the content marketing strategy. I'd appreciate your feedback by EOD Friday.\n\nThanks,\nSamantha`,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'email-3',
    sender: 'Design Team',
    subject: 'New UI Mockups for Focus Flow',
    body: `Hey everyone,\n\nWe've completed the first round of UI mockups for the new dashboard. They're available in Figma. We're really excited about the minimalist direction and the new color palette. Let us know what you think!\n\nCheers,\nThe Design Team`,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: 'email-4',
    sender: 'HR Department',
    subject: 'Reminder: Annual Performance Reviews',
    body: `This is a reminder that annual performance reviews are due by the end of the month. Please schedule a meeting with your manager to discuss your self-assessment.\n\nThank you,\nHR`,
    timestamp: yesterday.toISOString(),
  },
  {
    id: 'email-5',
    sender: 'Ben Carter',
    subject: 'Quick question about the API',
    body: `Hi,\n\nI was looking at the documentation for the ` + '`/users`' + ` endpoint and had a question about the pagination parameters. Could you clarify if the ` + '`limit`' + ` is inclusive? I'm trying to debug an off-by-one error on my end.\n\nThanks,\nBen`,
    timestamp: yesterday.toISOString(),
  },
  {
    id: 'email-6',
    sender: 'Weekly Digest',
    subject: 'Your weekly summary is here!',
    body: `Here's what happened this week in your favorite communities. Top posts, trending topics, and more inside.`,
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
   {
    id: 'email-7',
    sender: 'Emily Rose',
    subject: 'Re: Lunch Plans?',
    body: `Hey, that sounds great! How about that new cafe downtown? I'm free around 12:30 PM today. Let me know if that works for you.`,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
  },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Daily Standup',
    date: today.toISOString().split('T')[0],
    time: '09:00',
    description: 'Team sync for daily progress and blockers.',
  },
  {
    id: 'event-2',
    title: 'Project Phoenix Sync',
    date: today.toISOString().split('T')[0],
    time: '11:00',
    description: 'Discuss next steps for the alpha version feedback.',
  },
  {
    id: 'event-3',
    title: 'Lunch with Emily',
    date: today.toISOString().split('T')[0],
    time: '12:30',
    description: 'Catch up at the new downtown cafe.',
  },
  {
    id: 'event-4',
    title: 'UI/UX Review',
    date: today.toISOString().split('T')[0],
    time: '15:00',
    description: 'Review new mockups from the design team.',
  },
  {
    id: 'event-5',
    title: 'Marketing Strategy Meeting',
    date: tomorrow.toISOString().split('T')[0],
    time: '10:00',
    description: 'Finalize Q3 marketing budget and initiatives.',
  },
  {
    id: 'event-6',
    title: 'Dentist Appointment',
    date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    time: '14:00',
    description: 'Routine check-up.',
  },
];
