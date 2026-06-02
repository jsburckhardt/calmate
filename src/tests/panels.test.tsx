import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import DidYouKnowPanel from '../components/DidYouKnowPanel';
import NewsPanel from '../components/NewsPanel';
import StocksList from '../components/StocksList';
import TodoList from '../components/TodoList';
import type { NewsItem } from '../config/schemas';

afterEach(() => {
  vi.useRealTimers();
});

describe('dashboard panels', () => {
  it('renders configured stocks and allows missing stock names', () => {
    render(
      <StocksList
        stocks={[
          { ticker: 'AAPL', name: 'Apple', price: 175.32 },
          { ticker: 'MSFT', price: 334.87 },
        ]}
      />,
    );

    expect(screen.getByText('AAPL')).toBeDefined();
    expect(screen.getByText('Apple')).toBeDefined();
    expect(screen.getByText('MSFT')).toBeDefined();
  });

  it('renders todo checked state', () => {
    render(
      <TodoList
        todos={[
          { id: 'todo-001', title: 'Done todo', done: true },
          { id: 'todo-002', title: 'Open todo', done: false },
        ]}
      />,
    );

    expect(screen.getByLabelText('Done todo')).toHaveProperty('checked', true);
    expect(screen.getByLabelText('Open todo')).toHaveProperty('checked', false);
  });

  it('renders and rotates exactly 5 facts when more exist', () => {
    vi.useFakeTimers();

    render(
      <DidYouKnowPanel
        refreshMinutes={10}
        facts={['Fact 1', 'Fact 2', 'Fact 3', 'Fact 4', 'Fact 5', 'Fact 6']}
      />,
    );

    expect(screen.getByText('Fact 1')).toBeDefined();
    expect(screen.queryByText('Fact 6')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(10 * 60 * 1000);
    });

    expect(screen.queryByText('Fact 1')).toBeNull();
    expect(screen.getByText('Fact 6')).toBeDefined();
  });

  it('renders fewer than 5 facts when fewer exist', () => {
    render(<DidYouKnowPanel facts={['Fact 1', 'Fact 2']} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders only 5 news items and supports missing URLs', () => {
    const news: NewsItem[] = Array.from({ length: 6 }, (_, index) => ({
      id: `news-${index + 1}`,
      title: `News ${index + 1}`,
      source: 'Example',
      publishedAt: '2026-06-02T08:00:00+10:00',
      ...(index === 0 ? { url: 'https://example.com/news-1' } : {}),
    }));

    render(<NewsPanel news={news} />);

    expect(screen.getByRole('link', { name: 'News 1' })).toBeDefined();
    expect(screen.getByText('News 5')).toBeDefined();
    expect(screen.queryByText('News 6')).toBeNull();
  });
});
