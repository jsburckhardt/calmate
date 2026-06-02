# CORE-COMPONENT-0006: Development Standards

## Status

Adopted

## Purpose

Establish TypeScript, testing, formatting, and commit practices for CalMate development. These standards are cross-cutting because they apply to source code, tests, scripts, documentation, and future issues.

## Scope

This component applies to application code, test code, package scripts, documentation updates, and commits for this repository.

## Definition

### Rules
- Use TypeScript strict mode for application, test, and script code.
- Prefer named exports for reusable utilities and default exports for React component modules.
- Use async/await for asynchronous file and command logic.
- Follow Conventional Commits for commit messages and PR titles.
- Include a `Co-authored-by` trailer on AI-authored commits.
- Keep `./harness` authoritative for local verification by wrapping package scripts.

### Interfaces
- `npm run check:config` validates local JSON config.
- `npm run lint` runs ESLint.
- `npm run test` runs Vitest.
- `npm run build` type-checks and builds the app.
- `npm run check` runs the deterministic verification sequence.

### Expectations
- Public utility functions have direct unit test coverage.
- Component behavior is covered with Vitest and Testing Library where practical.
- Formatting is managed with Prettier.
- `./harness verify` passes before work is considered complete.

## Rationale

The PRD requires deterministic CLI commands for running, checking, and validating the app. Shared development standards make future feature work predictable and keep the bootstrap quality harness maintainable.

## Usage Examples

```bash
./harness verify
```

```bash
npm run format
```

## Integration Guidelines

- Add or update tests with behavior changes.
- Update `package.json` scripts and `.harness/contract.yml` together when verification changes.
- Keep reusable logic in utility or config modules so components stay focused on rendering.

## Exceptions

- Documentation-only changes do not need a full build unless they modify executable examples or verification configuration.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-0002-vite-react-typescript-dashboard](../ADR/ADR-0002-vite-react-typescript-dashboard.md)
