import { useMemo, useState } from 'react';

import type { CalendarEvent } from '../config/schemas';
import { createMonthGrid, groupEventsByDate } from '../utils/calendar';

const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric',
});

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarPanelProps = {
  events: CalendarEvent[];
  initialDate?: Date;
  today?: Date;
};

function CalendarPanel({
  events,
  initialDate = new Date(),
  today = new Date(),
}: CalendarPanelProps) {
  const [viewDate, setViewDate] = useState(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const monthGrid = useMemo(() => createMonthGrid(viewDate, today), [today, viewDate]);
  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);
  const visibleEventCount = monthGrid.reduce(
    (count, day) => count + (eventsByDate.get(day.dateKey)?.length ?? 0),
    0,
  );

  function showPreviousMonth() {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  function showNextMonth() {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  function showToday() {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  return (
    <section className="panel calendar-panel" id="calendar" aria-labelledby="calendar-title">
      <div className="panel-header calendar-toolbar">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2 id="calendar-title">{monthFormatter.format(viewDate)}</h2>
        </div>
        <div className="button-row">
          <button type="button" onClick={showPreviousMonth}>
            Previous
          </button>
          <button type="button" onClick={showToday}>
            Today
          </button>
          <button type="button" onClick={showNextMonth}>
            Next
          </button>
        </div>
      </div>

      <div className="calendar-grid" role="grid" aria-label="Monthly calendar">
        {weekDays.map((day) => (
          <div className="calendar-weekday" role="columnheader" key={day}>
            {day}
          </div>
        ))}
        {monthGrid.map((day) => {
          const dayEvents = eventsByDate.get(day.dateKey) ?? [];

          return (
            <div
              className={[
                'calendar-day',
                day.isCurrentMonth ? '' : 'calendar-day-muted',
                day.isToday ? 'calendar-day-today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              role="gridcell"
              key={day.dateKey}
            >
              <time dateTime={day.dateKey}>{day.dayOfMonth}</time>
              <div className="event-stack">
                {dayEvents.map((event) => (
                  <article className="calendar-event" key={event.id}>
                    <span className="event-title">{event.title}</span>
                    {event.time ? <span className="event-time">{event.time}</span> : null}
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {visibleEventCount === 0 ? (
        <p className="empty-state">No events configured for this month.</p>
      ) : null}
    </section>
  );
}

export default CalendarPanel;
