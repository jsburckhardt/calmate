# CORE-COMPONENT-0003: Config Validation

## Status

Adopted

## Purpose

Ensure all dashboard data loaded from local JSON files is validated before it drives the UI. Config validation is a shared concern because calendar events, stocks, todos, facts, and news all depend on predictable external data shapes.

## Scope

This component applies to all local dashboard configuration under `src/data/`, all schema definitions under `src/config/`, the runtime config loader, and the `npm run check:config` command.

## Definition

### Rules
- All dashboard config files MUST be validated with Zod schemas before use.
- Required fields MUST be validated for presence and primitive type.
- Calendar dates MUST use `YYYY-MM-DD` and represent real calendar dates.
- Unknown fields MAY be present in config files but MUST NOT be exposed to application code.
- Missing files and invalid JSON MUST produce clear command-line errors.

### Interfaces
- `src/config/schemas.ts` exposes schemas, inferred types, parsing helpers, and error formatting.
- `src/config/loadConfig.ts` loads static local JSON into the application.
- `scripts/check-config.ts` validates every local config file from the CLI.

### Expectations
- Components receive validated typed data, not raw JSON.
- Config validation failures are surfaced by `npm run check:config`.
- Runtime UI shows a friendly fallback if bundled config fails validation.

## Rationale

Local JSON keeps v1 simple, but unvalidated local data can still break rendering. Centralizing schema validation gives the app a single data contract and keeps validation consistent between CLI checks and runtime loading.

## Usage Examples

```bash
npm run check:config
```

```ts
const config = parseDashboardConfig(rawConfig);
```

## Integration Guidelines

- Add new config files by first extending `src/config/schemas.ts`.
- Keep `scripts/check-config.ts` and `src/config/loadConfig.ts` aligned on file locations.
- Prefer schema defaults for safe optional config values.

## Exceptions

- Temporary experimental config may exist outside `src/data/` only if it is not loaded by the app or validation command.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-0002-vite-react-typescript-dashboard](../ADR/ADR-0002-vite-react-typescript-dashboard.md)
