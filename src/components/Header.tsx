function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Local-first personal dashboard</p>
        <h1>CalMate</h1>
      </div>
      <nav aria-label="Dashboard shortcuts">
        <a href="#calendar">Calendar</a>
        <a href="#stocks">Stocks</a>
        <a href="#news">IT News</a>
        <a href="#config">Config</a>
      </nav>
    </header>
  );
}

export default Header;
