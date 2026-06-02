# CalMate

A local-first, config-driven personal dashboard centered on a monthly calendar with supporting panels for stocks, todos, rotating facts, and IT news.
[![APS version](https://img.shields.io/badge/APS-v1.2.2-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.2.2)

## Goal

CalMate makes daily context glanceable from one web page while keeping data in simple local JSON files and exposing deterministic CLI commands for development and validation.

## Quick start

```bash
npm install
npm run check:config
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the app |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |
| `npm run test` | Run Vitest tests |
| `npm run check:config` | Validate local dashboard JSON config |
| `npm run check` | Run lint, tests, and build |

## Configuration

Dashboard data lives in `src/data/`:

- `calendar.json` — monthly events
- `stocks.json` — static stock watchlist data
- `todos.json` — checklist items
- `facts.json` — Did You Know sentences and refresh interval
- `news.json` — IT news headlines

Run `npm run check:config` after editing configuration files.

## Documentation

- [`CONTRIBUTING.md`](CONTRIBUTING.md) — pipeline workflow, how to contribute via GitHub Issues, and where artifacts belong
- [`AGENTS.md`](AGENTS.md) — agent definitions, guardrails, and pipeline specification
- [`docs/`](docs/) — application-specific documentation (API docs, user guides, etc.)
- [`project/`](project/) — architecture decisions, core-components, and per-issue pipeline artifacts
