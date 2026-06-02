import type { NewsItem } from '../config/schemas';
import { limitNews } from '../utils/news';

type NewsPanelProps = {
  news: NewsItem[];
};

function NewsPanel({ news }: NewsPanelProps) {
  const visibleNews = limitNews(news);

  return (
    <aside className="panel news-panel" id="news" aria-labelledby="news-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Headlines</p>
          <h2 id="news-title">IT News</h2>
        </div>
      </div>
      {visibleNews.length === 0 ? (
        <p className="empty-state">No IT news configured.</p>
      ) : (
        <ol className="news-list">
          {visibleNews.map((item) => (
            <li key={item.id}>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              ) : (
                <span>{item.title}</span>
              )}
              <small>
                {item.source} · {new Date(item.publishedAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}

export default NewsPanel;
