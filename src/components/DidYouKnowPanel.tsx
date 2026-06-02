import { useEffect, useMemo, useState } from 'react';

import { selectFacts } from '../utils/facts';

type DidYouKnowPanelProps = {
  facts: string[];
  refreshMinutes?: number;
};

function DidYouKnowPanel({ facts, refreshMinutes = 10 }: DidYouKnowPanelProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleFacts = useMemo(() => selectFacts(facts, startIndex), [facts, startIndex]);

  useEffect(() => {
    if (facts.length <= 5) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setStartIndex((current) => (current + 1) % facts.length);
    }, refreshMinutes * 60 * 1000);

    return () => window.clearInterval(interval);
  }, [facts.length, refreshMinutes]);

  return (
    <section className="panel did-you-know-panel" aria-labelledby="facts-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Refreshes every {refreshMinutes} minutes</p>
          <h2 id="facts-title">Did You Know</h2>
        </div>
      </div>
      {visibleFacts.length === 0 ? (
        <p className="empty-state">No facts configured.</p>
      ) : (
        <ul className="fact-list">
          {visibleFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DidYouKnowPanel;
