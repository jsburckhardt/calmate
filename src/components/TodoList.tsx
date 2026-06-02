import type { Todo } from '../config/schemas';

type TodoListProps = {
  todos: Todo[];
};

function TodoList({ todos }: TodoListProps) {
  return (
    <section aria-labelledby="todo-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Checklist</p>
          <h2 id="todo-title">Todo</h2>
        </div>
      </div>
      {todos.length === 0 ? (
        <p className="empty-state">No todos configured.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.done} readOnly />
                <span>{todo.title}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodoList;
