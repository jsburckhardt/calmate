import { useMemo } from 'react';

import AdditionalInfoPanel from './components/AdditionalInfoPanel';
import CalendarPanel from './components/CalendarPanel';
import DidYouKnowPanel from './components/DidYouKnowPanel';
import Header from './components/Header';
import NewsPanel from './components/NewsPanel';
import StocksTodoPanel from './components/StocksTodoPanel';
import { loadDashboardConfig } from './config/loadConfig';
import { formatConfigError } from './config/schemas';

type ConfigState =
  | { status: 'ready'; config: ReturnType<typeof loadDashboardConfig> }
  | { status: 'error'; message: string };

function App() {
  const configState = useMemo<ConfigState>(() => {
    try {
      return { status: 'ready', config: loadDashboardConfig() };
    } catch (error) {
      return { status: 'error', message: formatConfigError(error) };
    }
  }, []);

  if (configState.status === 'error') {
    return (
      <main className="app-shell">
        <Header />
        <section className="panel error-panel" role="alert">
          <h2>Configuration error</h2>
          <p>
            The dashboard could not load its local configuration. Run{' '}
            <code>npm run check:config</code> for details.
          </p>
          <pre>{configState.message}</pre>
        </section>
      </main>
    );
  }

  const { config } = configState;

  return (
    <main className="app-shell">
      <Header />
      <section className="dashboard-grid" aria-label="Personal dashboard">
        <StocksTodoPanel stocks={config.stocks.stocks} todos={config.todos.todos} />
        <CalendarPanel events={config.calendar.events} />
        <NewsPanel news={config.news.news} />
        <DidYouKnowPanel
          facts={config.facts.facts}
          refreshMinutes={config.facts.refreshMinutes}
        />
        <AdditionalInfoPanel />
      </section>
    </main>
  );
}

export default App;
