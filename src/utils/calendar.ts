import type { CalendarEvent } from '../config/schemas';

export type CalendarDay = {
  date: Date;
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function createMonthGrid(viewDate: Date, today: Date = new Date()): CalendarDay[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingDays = firstDayOfMonth.getDay();
  const totalCells = Math.ceil((leadingDays + daysInMonth) / 7) * 7;
  const todayKey = formatDateKey(today);

  return Array.from({ length: totalCells }, (_, index) => {
    const dayOffset = index - leadingDays + 1;
    const date = new Date(year, month, dayOffset);

    return {
      date,
      dateKey: formatDateKey(date),
      dayOfMonth: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: formatDateKey(date) === todayKey,
    };
  });
}

export function groupEventsByDate(
  events: CalendarEvent[],
): Map<string, CalendarEvent[]> {
  return events.reduce((eventsByDate, event) => {
    const eventsForDay = eventsByDate.get(event.date) ?? [];
    eventsForDay.push(event);
    eventsByDate.set(event.date, eventsForDay);
    return eventsByDate;
  }, new Map<string, CalendarEvent[]>());
}
