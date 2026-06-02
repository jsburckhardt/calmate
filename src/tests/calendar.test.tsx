import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CalendarPanel from '../components/CalendarPanel';
import type { CalendarEvent } from '../config/schemas';
import { createMonthGrid, groupEventsByDate } from '../utils/calendar';

const events: CalendarEvent[] = [
  {
    id: 'evt-001',
    title: 'Team Meeting',
    date: '2026-06-03',
    time: '10:00',
  },
  {
    id: 'evt-002',
    title: 'Release Day',
    date: '2026-06-12',
    time: '09:00',
  },
  {
    id: 'evt-003',
    title: 'Config Review',
    date: '2026-06-12',
    time: '15:30',
  },
];

describe('calendar utilities', () => {
  it('creates a month grid and marks today', () => {
    const days = createMonthGrid(new Date(2026, 5, 1), new Date(2026, 5, 3));

    expect(days).toHaveLength(35);
    expect(days.some((day) => day.dateKey === '2026-06-03' && day.isToday)).toBe(
      true,
    );
  });

  it('groups multiple events on one date', () => {
    const eventsByDate = groupEventsByDate(events);

    expect(eventsByDate.get('2026-06-12')).toHaveLength(2);
  });
});

describe('CalendarPanel', () => {
  it('renders events on the matching dates', () => {
    render(
      <CalendarPanel
        events={events}
        initialDate={new Date(2026, 5, 2)}
        today={new Date(2026, 5, 2)}
      />,
    );

    const releaseDayCell = screen.getByText('Release Day').closest('.calendar-day');

    expect(screen.getByRole('heading', { name: 'June 2026' })).toBeDefined();
    expect(screen.getByText('Team Meeting')).toBeDefined();
    expect(screen.getByText('Config Review')).toBeDefined();
    expect(releaseDayCell).not.toBeNull();
    expect(within(releaseDayCell as HTMLElement).getByText('12')).toBeDefined();
  });

  it('navigates previous month, next month, and today', () => {
    render(
      <CalendarPanel
        events={events}
        initialDate={new Date(2026, 5, 2)}
        today={new Date(2026, 5, 2)}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByRole('heading', { name: 'May 2026' })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'June 2026' })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'July 2026' })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Today' }));
    expect(screen.getByRole('heading', { name: 'June 2026' })).toBeDefined();
  });
});
