import type { NewsItem } from '../config/schemas';

export function limitNews(news: NewsItem[], limit = 5): NewsItem[] {
  return news.slice(0, limit);
}
