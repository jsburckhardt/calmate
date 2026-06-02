# ADR-0002: Use Vite, React, and TypeScript for the Dashboard

## Status

Accepted

## Context

CalMate needs a small, local-first web dashboard that can be run, checked, and validated from deterministic CLI commands. The PRD calls for a primary monthly calendar, side panels, local JSON configuration, schema validation, and a simple development workflow.

## Decision

Build CalMate as a Vite-powered React application written in TypeScript. Use npm for package management, Vitest for tests, ESLint for linting, Prettier for formatting, Zod for configuration schema validation, and tsx for the configuration validation script.

## Alternatives

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Next.js with TypeScript | Full-stack routing and deployment features | More framework surface than the local-first v1 requires | The first version does not need server rendering, API routes, or deployment infrastructure |
| Plain TypeScript without React | Minimal dependency footprint | More manual UI state and rendering code | The dashboard has several interactive panels that benefit from React components |
| Vite with JavaScript | Fast setup | Weaker config and component type safety | The PRD requires clear validation and deterministic quality checks |

## Consequences

### Positive
- Fast local development with Vite.
- Strong type safety for config parsing, component props, and utility logic.
- Vitest integrates with Vite and supports component tests through jsdom.
- npm scripts provide a stable CLI contract for development and verification.

### Negative
- The app depends on a Node.js runtime and npm dependency installation.
- Client-side JSON imports require rebuilds after config file edits in packaged builds.

### Neutral
- Static JSON remains the v1 data source; future API or RSS integrations can be added behind the same config-loading boundary.

## Related Issues

- None. This ADR was created during project bootstrap from `prd.md`.

## References

- [`prd.md`](../../../prd.md)
- [Vite React documentation](https://vite.dev/guide/)
- [React documentation](https://react.dev/)
- [Vitest documentation](https://vitest.dev/)
- [Zod documentation](https://zod.dev/)
