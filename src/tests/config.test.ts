import { describe, expect, it } from 'vitest';

import {
  type DashboardRawConfig,
  formatConfigError,
  parseDashboardConfig,
} from '../config/schemas';

const validConfig: DashboardRawConfig = {
  calendar: {
    events: [
      {
        id: 'evt-001',
        title: 'Planning',
        date: '2026-06-03',
        time: '10:00',
        description: 'Sprint planning',
        type: 'meeting',
        ignoredField: true,
      },
    ],
  },
  stocks: {
    stocks: [
      {
        ticker: 'AAPL',
        price: 175.32,
      },
    ],
  },
  todos: {
    todos: [
      {
        id: 'todo-001',
        title: 'Review config',
        done: false,
      },
    ],
  },
  facts: {
    facts: ['Honey never spoils.'],
  },
  news: {
    news: [
      {
        id: 'news-001',
        title: 'Security update',
        source: 'Example',
        publishedAt: '2026-06-02T08:00:00+10:00',
      },
    ],
  },
};

describe('config schemas', () => {
  it('parses valid dashboard config and applies defaults', () => {
    const config = parseDashboardConfig(validConfig);

    expect(config.facts.refreshMinutes).toBe(10);
    expect(config.calendar.events[0]).not.toHaveProperty('ignoredField');
  });

  it('rejects invalid calendar dates clearly', () => {
    const invalidConfig: DashboardRawConfig = {
      ...validConfig,
      calendar: {
        events: [
          {
            id: 'evt-invalid',
            title: 'Impossible date',
            date: '2026-02-31',
          },
        ],
      },
    };

    expect(() => parseDashboardConfig(invalidConfig)).toThrow(
      'Invalid calendar event date',
    );
  });

  it('rejects invalid stock prices clearly', () => {
    const invalidConfig: DashboardRawConfig = {
      ...validConfig,
      stocks: {
        stocks: [
          {
            ticker: 'MSFT',
            price: '334.87',
          },
        ],
      },
    };

    try {
      parseDashboardConfig(invalidConfig);
      throw new Error('Expected invalid config to fail');
    } catch (error) {
      expect(formatConfigError(error)).toContain('stocks.stocks.0.price');
      expect(formatConfigError(error)).toContain('Expected number');
    }
  });
});
