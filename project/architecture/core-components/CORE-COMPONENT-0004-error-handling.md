# CORE-COMPONENT-0004: Error Handling

## Status

Adopted

## Purpose

Provide clear, actionable errors for invalid local configuration and friendly runtime fallbacks for the dashboard UI. Error handling is cross-cutting because config loading, CLI validation, and runtime rendering all need consistent failure behavior.

## Scope

This component applies to config parsing, CLI validation scripts, and UI states for missing or empty dashboard data.

## Definition

### Rules
- CLI validation MUST fail with a non-zero exit code when required config is missing, malformed, or invalid.
- Config parse errors MUST include the failing config path where available.
- Runtime UI MUST avoid blank screens when config validation fails.
- Empty valid arrays MUST render friendly empty-state messages.
- Errors MUST NOT be swallowed silently or converted into success-shaped fallback data.

### Interfaces
- `formatConfigError(error)` converts validation and system errors into user-readable messages.
- `scripts/check-config.ts` reports validation failures and sets `process.exitCode = 1`.
- Dashboard panels render explicit empty states for empty valid config.

### Expectations
- Developers can diagnose config failures from CLI output.
- Users see a helpful message rather than an unhandled runtime crash.
- Tests cover validation and empty/limited display behavior.

## Rationale

The PRD requires local config to fail clearly. Explicit error formatting and panel-level empty states keep failures actionable while preserving a readable dashboard when data is valid but empty.

## Usage Examples

```ts
try {
  loadDashboardConfig();
} catch (error) {
  return formatConfigError(error);
}
```

## Integration Guidelines

- Prefer typed schema errors over broad fallback data.
- Add empty states whenever a new panel renders a configurable list.
- Keep command-line errors concise and actionable.

## Exceptions

- Non-critical visual formatting issues may be handled in component rendering without failing validation.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-0002-vite-react-typescript-dashboard](../ADR/ADR-0002-vite-react-typescript-dashboard.md)
