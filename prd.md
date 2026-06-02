# PRD: Config-Driven Personal Dashboard

## 1. Purpose

Build a simple web dashboard whose primary surface is a calendar populated from configuration. The dashboard should also provide quick-glance side panels for stocks, todos, rotating “Did You Know” facts, and IT news.

This product is intended to be bootstrapped in a repo as a small, local-first web app with clear configuration files and deterministic CLI commands for running, checking, and validating the app.

## 2. Goals

- Show a large monthly calendar as the primary UI.
- Load calendar events from a config file rather than hardcoding them in UI components.
- Show a side panel with a configurable list of stocks.
- Show a side panel todo checklist.
- Show a bottom “Did You Know” section with 5 sentences that refresh every 10 minutes.
- Show a right-side IT news panel with 5 news items.
- Make the project easy to bootstrap, run, test, lint, and validate from the CLI.

## 3. Non-Goals

- Full user authentication.
- Multi-user support.
- Database-backed persistence for the first version.
- Trading features or financial advice.
- Complex calendar interactions such as recurring event editing, drag-and-drop scheduling, or calendar invites.
- Real-time collaboration.
- Production-grade CMS for news or facts.

## 4. Target User

A single user who wants a local or self-hosted dashboard for daily context:

- Calendar events
- Stock watchlist
- Todo list
- Lightweight facts
- IT headlines

## 5. Product Surface

The app should render one main dashboard page.

### Layout

The page should contain:

1. Top header
   - App title
   - Optional nav placeholders
   - Optional settings/config link

2. Left side panel: `Stocks + Todo`
   - Upper section: stock watchlist
   - Lower section: todo list

3. Main center panel: `Calendar`
   - Monthly calendar view
   - Events loaded from config
   - Basic controls: previous month, next month, today

4. Right side panel: `IT News`
   - 5 headline cards or list items

5. Bottom panel
   - Split into two columns
   - Left: `Did You Know`
   - Right: placeholder for additional notes, links, or future widgets

## 6. Functional Requirements

### 6.1 Calendar

The calendar must:

- Render a month grid.
- Show the current month by default.
- Allow moving to previous and next months.
- Allow returning to today’s month.
- Read events from a config file.
- Display events on the correct dates.
- Support multiple events per date.
- Support at least the following event fields:
  - `id`
  - `title`
  - `date`
  - `time`
  - `description`
  - `type`

Example event config:

```json
{
  "events": [
    {
      "id": "evt-001",
      "title": "Team Meeting",
      "date": "2026-06-03",
      "time": "10:00",
      "description": "Weekly team sync",
      "type": "meeting"
    },
    {
      "id": "evt-002",
      "title": "Release Day",
      "date": "2026-06-12",
      "time": "09:00",
      "description": "Deploy dashboard v1",
      "type": "release"
    }
  ]
}
```

### 6.2 Config Loading

The app must load dashboard data from local config files.

Suggested config files:

```txt
config/
  calendar.json
  stocks.json
  todos.json
  facts.json
  news.json
```

The first version should support static local JSON files. Later versions may add APIs.

The app should fail clearly if config is invalid.

Required behavior:

- Missing config file produces a clear error.
- Invalid JSON produces a clear error.
- Invalid event date produces a clear error.
- Unknown fields are allowed but ignored.
- Required fields must be validated.

### 6.3 Stocks Panel

The stocks panel must:

- Read a list of tickers from config.
- Display ticker, display name if available, and latest configured price.
- For v1, prices may be static in config.
- The UI should make it clear this is a watchlist, not a trading tool.

Example stock config:

```json
{
  "stocks": [
    {
      "ticker": "AAPL",
      "name": "Apple",
      "price": 175.32
    },
    {
      "ticker": "MSFT",
      "name": "Microsoft",
      "price": 334.87
    }
  ]
}
```

Future extension:

- Add live price provider.
- Add CLI command to refresh stock data.
- Add stale-data timestamp.

### 6.4 Todo Panel

The todo panel must:

- Read todo items from config.
- Display todo title and checked state.
- Support simple checked/unchecked rendering.
- For v1, persistence can remain config-backed only.

Example todo config:

```json
{
  "todos": [
    {
      "id": "todo-001",
      "title": "Review Q2 report",
      "done": false
    },
    {
      "id": "todo-002",
      "title": "Backup database",
      "done": true
    }
  ]
}
```

Future extension:

- Allow checking items in UI and writing changes to local storage or a backend.

### 6.5 Did You Know Panel

The “Did You Know” panel must:

- Display 5 fact sentences at a time.
- Read facts from config.
- Refresh the displayed facts every 10 minutes.
- If fewer than 5 facts exist, display all available facts.
- If more than 5 facts exist, rotate or randomly select 5.
- Show a small note: `Refreshes every 10 minutes`.

Example facts config:

```json
{
  "refreshMinutes": 10,
  "facts": [
    "Honey never spoils.",
    "Octopuses have three hearts.",
    "A day on Venus is longer than its year.",
    "Bananas are berries, but strawberries are not.",
    "A group of flamingos is called a flamboyance.",
    "The Eiffel Tower can grow taller in hot weather."
  ]
}
```

### 6.6 IT News Panel

The IT news panel must:

- Display 5 IT news headlines.
- Read news items from config for v1.
- Each news item should support:
  - `id`
  - `title`
  - `source`
  - `url`
  - `publishedAt`

Example news config:

```json
{
  "news": [
    {
      "id": "news-001",
      "title": "Major cloud outage impacts multiple services",
      "source": "Example IT News",
      "url": "https://example.com/cloud-outage",
      "publishedAt": "2026-06-02T08:00:00+10:00"
    }
  ]
}
```

Future extension:

- Add RSS or API integration.
- Add CLI command to refresh news.
- Add stale-data warnings.

## 7. UX Requirements

The UI should be:

- Simple
- Low-friction
- Dashboard-like
- Readable at a glance
- Responsive enough for laptop and desktop screens

Recommended visual structure:

```txt
+---------------------------------------------------------------+
| Header                                                        |
+---------------+-------------------------------+---------------+
| Stocks + Todo | Calendar                      | IT News       |
|               |                               |               |
+---------------+-------------------------------+---------------+
| Did You Know                  | Additional Info               |
+---------------------------------------------------------------+
```

### Responsive behavior

Desktop:

- Three-column top layout.
- Calendar should receive the most width.
- Bottom section split into two columns.

Tablet:

- Calendar first.
- Side panels may stack below or collapse into two columns.

Mobile:

- Single-column layout:
  1. Calendar
  2. Stocks
  3. Todo
  4. IT News
  5. Did You Know
  6. Additional Info

## 8. Technical Requirements

### 8.1 Suggested Stack

Recommended default:

- Vite
- React
- TypeScript
- CSS Modules or plain CSS
- Vitest
- ESLint
- Prettier

Alternative acceptable stack:

- Next.js
- TypeScript
- Tailwind
- Jest or Vitest

For first bootstrap, prefer the simplest stack that can run locally with minimal setup.

### 8.2 Suggested Repo Structure

```txt
dashboard/
  README.md
  package.json
  tsconfig.json
  vite.config.ts
  index.html
  src/
    main.tsx
    App.tsx
    components/
      Header.tsx
      CalendarPanel.tsx
      StocksTodoPanel.tsx
      StocksList.tsx
      TodoList.tsx
      NewsPanel.tsx
      DidYouKnowPanel.tsx
      AdditionalInfoPanel.tsx
    config/
      loadConfig.ts
      schemas.ts
    data/
      calendar.json
      stocks.json
      todos.json
      facts.json
      news.json
    styles/
      global.css
    tests/
      config.test.ts
      calendar.test.ts
  scripts/
    check-config.ts
```

### 8.3 CLI Contract

The repo should expose a simple CLI-like surface through package scripts.

Required scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "check": "npm run lint && npm run test && npm run build",
    "check:config": "tsx scripts/check-config.ts"
  }
}
```

The agent or developer should use these commands instead of guessing project health.

### 8.4 Config Validation

Use a schema validation library such as Zod.

Validation should cover:

- Required fields
- Date format
- Time format
- Array limits where needed
- Correct primitive types
- Meaningful error messages

Example:

```ts
const CalendarEventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional()
});
```

## 9. Acceptance Criteria

### Calendar

- Given a valid `calendar.json`, events render on the matching dates.
- Given multiple events on one date, all are visible or summarized.
- Given an invalid event date, `check:config` fails.
- User can navigate previous month, next month, and today.

### Stocks

- Given a valid `stocks.json`, all configured stocks render.
- Missing optional stock name does not break the UI.
- Invalid price type fails config validation.

### Todo

- Given a valid `todos.json`, todo items render.
- Completed todos show checked state.
- Incomplete todos show unchecked state.

### Did You Know

- Exactly 5 facts are displayed when 5 or more facts exist.
- Fewer than 5 facts are displayed when fewer exist.
- Facts refresh every 10 minutes.
- Refresh interval is configurable but defaults to 10 minutes.

### IT News

- Exactly 5 news items are displayed when 5 or more exist.
- News titles render clearly.
- News items with URLs are clickable.
- Missing optional URL does not break rendering.

### CLI

- `npm run dev` starts the app.
- `npm run build` builds successfully.
- `npm run test` runs tests.
- `npm run lint` runs linting.
- `npm run check:config` validates all config files.
- `npm run check` gives a deterministic pass/fail signal.

## 10. Error States

The UI should handle:

- Missing config
- Empty calendar
- Empty stock list
- Empty todo list
- Empty facts list
- Empty news list

Recommended empty-state messages:

- Calendar: `No events configured for this month.`
- Stocks: `No stocks configured.`
- Todo: `No todos configured.`
- Facts: `No facts configured.`
- News: `No IT news configured.`

Config errors should be surfaced during CLI validation first. Runtime UI should show a friendly fallback error.

## 11. Testing Plan

### Unit Tests

- Config schema validation
- Calendar date mapping
- Fact rotation selection
- News limit logic
- Todo checked-state rendering

### Component Tests

- Calendar renders days and events.
- Stocks panel renders tickers.
- Todo panel renders checklist.
- Did You Know renders 5 facts.
- News panel renders 5 headlines.

### CLI Tests

- `check:config` passes with valid configs.
- `check:config` fails with invalid JSON.
- `check:config` fails with missing required fields.

## 12. Bootstrap Instructions for an Agent

When bootstrapping this repo, the agent should:

1. Create the app scaffold.
2. Add the required config files with example data.
3. Add config schemas and validation.
4. Build the dashboard layout.
5. Implement calendar month rendering.
6. Wire panels to config data.
7. Add the fact refresh behavior.
8. Add tests for config and display logic.
9. Add the CLI scripts.
10. Run:

```bash
npm run check:config
npm run lint
npm run test
npm run build
```

The task is not complete until the CLI checks pass.

## 13. Milestones

### Milestone 1: Static Dashboard

- App scaffolded
- Layout implemented
- Static placeholder data displayed

### Milestone 2: Config-Driven Dashboard

- All panels read from config
- Config validation added
- Config check command added

### Milestone 3: Calendar Behavior

- Month grid implemented
- Event placement implemented
- Navigation implemented

### Milestone 4: Quality Harness

- Tests added
- Lint/build/test/check scripts added
- README documents usage

### Milestone 5: Future Integrations

- Optional live stock provider
- Optional RSS/API news provider
- Optional local persistence for todos

## 14. Open Questions

- Should todos be editable in the UI for v1, or config-only?
- Should stocks be static config-only for v1, or should a live API be used immediately?
- Should IT news come from static config, RSS, or an API?
- Should config files live under `src/data` or project-level `config`?
- Should the dashboard be deployed somewhere or remain local-first?

## 15. Definition of Done

The product is done for v1 when:

- The dashboard renders correctly on desktop.
- The calendar is the dominant central panel.
- Calendar events are read from config.
- Stocks, todos, facts, and news are read from config.
- Did You Know refreshes every 10 minutes.
- IT News displays 5 items.
- All config files are validated.
- The README explains how to run and edit config.
- The following command passes:

```bash
npm run check
```
