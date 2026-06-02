# Decision Log

This file is the single registry of all architectural decisions and core-components in the project. Every new or modified ADR or core-component **must** be recorded here.

## ADRs

| ID | Title | Status | Date |
|----|-------|--------|------|
| ADR-0002 | Use Vite, React, and TypeScript for the Dashboard | Accepted | 2026-06-02 |

## Core-Components

| ID | Title | Status | Date |
|----|-------|--------|------|
| CORE-COMPONENT-0002 | Commit Standards | Adopted | 2026-05-05 |
| CORE-COMPONENT-0003 | Config Validation | Adopted | 2026-06-02 |
| CORE-COMPONENT-0004 | Error Handling | Adopted | 2026-06-02 |
| CORE-COMPONENT-0005 | UI Layout and Responsiveness | Adopted | 2026-06-02 |
| CORE-COMPONENT-0006 | Development Standards | Adopted | 2026-06-02 |
| CORE-COMPONENT-0007 | Engineering Harness | Adopted | 2026-06-02 |

## Decisions

Short, actionable statements derived from ADRs and core-components. More than one decision can originate from a single source.

| # | Decision | Source | Date |
|---|----------|--------|------|
| 1 | Enforce Conventional Commits v1.0.0 on every commit message | CORE-COMPONENT-0002 | 2026-05-05 |
| 2 | Require Conventional Commits format on PR titles | CORE-COMPONENT-0002 | 2026-05-05 |
| 3 | Require Co-authored-by trailer on all AI-authored commits | CORE-COMPONENT-0002 | 2026-05-05 |
| 4 | Build CalMate as a Vite React TypeScript app managed with npm | ADR-0002 | 2026-06-02 |
| 5 | Use Vitest, ESLint, Prettier, Zod, and tsx for the app quality harness | ADR-0002 | 2026-06-02 |
| 6 | Validate all dashboard JSON config with shared Zod schemas before use | CORE-COMPONENT-0003 | 2026-06-02 |
| 7 | Surface config failures through clear CLI errors and runtime fallback UI | CORE-COMPONENT-0004 | 2026-06-02 |
| 8 | Preserve the calendar as the dominant dashboard panel across responsive layouts | CORE-COMPONENT-0005 | 2026-06-02 |
| 9 | Treat package scripts and verification.yml as the authoritative verification contract | CORE-COMPONENT-0006 | 2026-06-02 |
| 10 | Use ./harness as the primary operating surface for humans and agents | CORE-COMPONENT-0007 | 2026-06-02 |
| 11 | Require ./harness verify evidence before completion claims | CORE-COMPONENT-0007 | 2026-06-02 |
| 12 | Record harness bypasses and unproved inferences in .harness/friction.jsonl | CORE-COMPONENT-0007 | 2026-06-02 |
| 13 | Keep harness agent policy in AGENTS.md | CORE-COMPONENT-0007 | 2026-06-02 |
| 14 | Propagate harness context and evidence through every RPIV stage | CORE-COMPONENT-0007 | 2026-06-02 |
