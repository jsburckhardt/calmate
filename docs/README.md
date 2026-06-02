# CalMate Documentation

CalMate is a local-first, config-driven personal dashboard. Its primary UI is a monthly calendar, supported by stocks, todos, Did You Know facts, IT news, and an additional information placeholder.

## Application overview

- The app is built with Vite, React, and TypeScript.
- Local dashboard data is stored in `src/data/*.json`.
- Config schemas and validation live in `src/config/`.
- Reusable display logic lives in `src/utils/`.
- Dashboard panels live in `src/components/`.

## Operational commands

Use the package scripts as the source of truth:

```bash
npm run check:config
npm run lint
npm run test
npm run build
npm run check
```

For project management documentation (architecture decisions, core-components, and per-issue pipeline artifacts), see the [`project/`](../project/) directory.
