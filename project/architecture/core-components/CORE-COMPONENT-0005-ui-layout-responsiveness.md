# CORE-COMPONENT-0005: UI Layout and Responsiveness

## Status

Adopted

## Purpose

Define the shared dashboard layout behavior so the calendar remains the primary surface while side panels stay readable across desktop, tablet, and mobile screens.

## Scope

This component applies to dashboard page composition, panel placement, responsive CSS, and empty-state presentation.

## Definition

### Rules
- The monthly calendar MUST be the dominant central panel on desktop.
- Desktop layout SHOULD use a three-column top section with stocks/todos, calendar, and IT news.
- Tablet layout MAY place the calendar first and stack side panels below it.
- Mobile layout MUST collapse to a single column.
- Bottom content MUST include a Did You Know panel and an additional information placeholder.

### Interfaces
- `src/App.tsx` composes the dashboard regions.
- `src/components/*Panel.tsx` files define panel boundaries.
- `src/styles/global.css` defines responsive grid behavior.

### Expectations
- Panels remain readable at common laptop and desktop widths.
- Mobile users can scan content in a logical single-column order.
- Empty states use consistent language from the PRD.

## Rationale

The PRD defines a glanceable dashboard where the calendar is the primary UI. A shared layout component standard prevents later widgets from crowding the central calendar or breaking responsive behavior.

## Usage Examples

```tsx
<section className="dashboard-grid" aria-label="Personal dashboard">
  <StocksTodoPanel />
  <CalendarPanel />
  <NewsPanel />
</section>
```

## Integration Guidelines

- Add new widgets as panels instead of embedding them directly in unrelated panels.
- Preserve the calendar's priority when adjusting grid behavior.
- Test display logic separately from visual styling where possible.

## Exceptions

- Future feature-specific routes may use different layouts if documented by a later ADR or core-component update.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-0002-vite-react-typescript-dashboard](../ADR/ADR-0002-vite-react-typescript-dashboard.md)
