import type { Stock, Todo } from '../config/schemas';
import StocksList from './StocksList';
import TodoList from './TodoList';

type StocksTodoPanelProps = {
  stocks: Stock[];
  todos: Todo[];
};

function StocksTodoPanel({ stocks, todos }: StocksTodoPanelProps) {
  return (
    <aside className="panel stack-panel" aria-label="Stocks and todos">
      <StocksList stocks={stocks} />
      <TodoList todos={todos} />
    </aside>
  );
}

export default StocksTodoPanel;
