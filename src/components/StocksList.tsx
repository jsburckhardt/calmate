import type { Stock } from '../config/schemas';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

type StocksListProps = {
  stocks: Stock[];
};

function StocksList({ stocks }: StocksListProps) {
  return (
    <section id="stocks" aria-labelledby="stocks-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Watchlist</p>
          <h2 id="stocks-title">Stocks</h2>
        </div>
      </div>
      <p className="fine-print">Configured watchlist only. Not financial advice.</p>
      {stocks.length === 0 ? (
        <p className="empty-state">No stocks configured.</p>
      ) : (
        <ul className="stock-list">
          {stocks.map((stock) => (
            <li key={stock.ticker}>
              <div>
                <strong>{stock.ticker}</strong>
                {stock.name ? <span>{stock.name}</span> : null}
              </div>
              <span>{currencyFormatter.format(stock.price)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default StocksList;
