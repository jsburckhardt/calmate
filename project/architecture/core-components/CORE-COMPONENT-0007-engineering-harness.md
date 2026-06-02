# CORE-COMPONENT-0007: Engineering Harness

## Status

Adopted

## Purpose

Establish `./harness` as the repo-local operating surface for humans and agents. The harness is cross-cutting because it governs orientation, readiness checks, verification, evidence, and friction capture across every future change.

## Scope

This component applies to repository operation, local verification, agent workflows, evidence capture, and friction records. It wraps existing project commands and does not replace the npm-based build system selected by ADR-0002.

## Definition

### Rules
- Use `./harness` before guessing at raw project commands.
- Wrap existing project commands instead of inventing replacement workflows.
- Return clear `pass`, `fail`, `degraded`, or `unknown` verdicts from harness commands.
- Write verification evidence under `.harness/evidence/`.
- Record unproved assumptions and bypasses in `.harness/friction.jsonl`.
- Run `./harness verify` before work is called complete.
- Propagate harness context and evidence through every RPIV stage.

### Interfaces
- `./harness orient` explains the repository and operating surface.
- `./harness doctor` checks local readiness.
- `./harness lint` wraps `npm run lint`.
- `./harness test` wraps `npm run test`.
- `./harness build` wraps `npm run build`.
- `./harness boot` runs the inferred Vite boot readiness check.
- `./harness verify` runs the configured verification sequence and writes evidence.
- `./harness status` reports harness state and missing checks.
- `./harness friction add` records an inference the harness should have proved.
- `./harness friction list` displays recent friction entries.

### Expectations
- Important harness commands support `--json`.
- `.harness/contract.yml` describes detected, inferred, missing, and not configured behavior honestly.
- Evidence files show what ran, where logs were written, exit codes, verdicts, and next actions.
- Agent-facing instructions in `AGENTS.md` require harness usage before changes and completion claims.
- RPIV agents consume harness contract, status, friction, and evidence during stage handoffs.

## Rationale

The repository already exposes deterministic npm scripts, but humans and agents still need one focal operating surface that explains how to use them, captures proof, and makes uncertainty visible. A small repo-local CLI keeps the first version boring while preserving the existing Vite, React, TypeScript, and npm workflow.

## Usage Examples

```bash
./harness orient
./harness doctor
./harness verify
```

```bash
./harness friction add --inference "Boot path was unclear" --should-prove "Supported boot readiness check" --helped-by "Documented health endpoint" --severity medium --blocked false
```

## Integration Guidelines

- Add new wrapped commands to `package.json` first, then expose them through `./harness` and `.harness/contract.yml`.
- Keep `.harness/contract.yml`, package scripts, and harness verification behavior aligned.
- Promote repeated friction into explicit harness checks or contract entries.
- Keep `AGENTS.md` as the canonical agent-facing instruction file for harness policy.
- Keep RPIV agent definitions wired to the harness contract and evidence model.
- Preserve `.harness/evidence/` as the source of completion proof.

## Exceptions

- If `./harness` is missing or broken, restore it using raw commands and then record friction.
- Documentation-only changes may skip expensive checks only when the harness contract permits it.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements
- [x] Harness verification evidence
