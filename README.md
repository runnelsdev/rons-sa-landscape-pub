# Ron's Landscape OS

A custom operations platform for a San Antonio landscaping business — built as a Next.js 14 (App Router) + TypeScript + Tailwind project, designed to grow into a reusable trades/landscaping product.

> The aesthetic is deliberately not generic SaaS. It leans **industrial workwear**: earthy palette, serif display type, stamped shadows, dashed dividers, uppercase mono labels. It's meant to feel like the inside of a working trades operation, not a startup dashboard.

---

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

There is no database. All data lives in memory in `lib/data.ts` and reloads with the dev server. The app is fully typed and renders end-to-end.

---

## What's in the box — the 7 modules

| # | Module | Where | What it does |
|---|--------|-------|--------------|
| 1 | **Client Profiles** | `/clients` | Searchable directory + full profile view. Tracks gate codes, frequency, service notes, property instructions, crew notes, equipment notes, weed/contamination notes, before/after photos, and contract history. |
| 2 | **Work Orders / Projects** | `/work-orders` | Kanban board (Draft → Scheduled → In Progress → Completed) plus a full WO detail view with materials line items (qty × cost × markup), labor estimate, before/after photo slots, payment notes, and totals. |
| 3 | **Maintenance Contracts** | `/contracts` | All recurring contracts (weekly / biweekly / monthly / daily) with route + crew assignment, recurring per-visit price, monthly value rollup, add-on services, first-cleanup fee, and MRR summary. |
| 4 | **Estimating Support** | `/estimator` | Live interactive estimator. 4 presets (small turf, average residential, large estate, commercial). Computes labor hours, material costs, delivery, first-time cleanup, and ongoing maintenance rate. Pricing logic lives in `lib/estimator.ts` — easy to tune. |
| 5 | **Routing** | `/routes` | Week-at-a-glance grid (Mon–Sat) with route detail showing numbered itineraries, time-budget bars (on-property vs. driving), per-hour profit, and monthly/annual revenue projection per route. |
| 6 | **Equipment Tracking** | `/equipment` | Vehicles, trailers, mowers, trimmers, edgers, combo units. Tracks serial numbers, assigned crew, hours/miles, maintenance schedule, full repair log with receipts, and shop status. |
| 7 | **Crew Accountability** | `/crew/[id]` | Field-facing surface. Each crew sees today's stops with directions buttons, gate codes, client notes, contamination warnings, photo upload buttons, and "Mark Complete." No time clock — ADP handles payroll. |

Plus a **dashboard** at `/` ("Yard Office") that rolls up MRR, open work orders, active routes, equipment alerts, and the day's schedule.

---

## Where to extend

| Want to change… | Edit this |
|-----------------|-----------|
| Pricing rates, productivity assumptions, markup percentages | `lib/estimator.ts` |
| Mock clients / contracts / equipment / crews | `lib/data.ts` |
| Domain model (add a field anywhere) | `lib/types.ts` |
| Color palette, fonts, shadows | `tailwind.config.ts` + `app/globals.css` |
| Sidebar navigation | `components/Sidebar.tsx` |

---

## Architecture notes

- **Server components** by default. Only `Sidebar` and `EstimatorClient` are client components (they need interactivity).
- **No DB yet.** When you wire one up, the seed data in `lib/data.ts` is structured to map cleanly onto Postgres tables — every entity has an `id` and foreign keys are already in place.
- **Multi-tenant ready.** Types are clean enough that a `tenantId` column drops in without rework.
- **Field surface.** The `/crew/[id]` page is intentionally the most action-dense — it's what crews actually open on a phone in a truck.

---

## Design system at a glance

- **Colors:** bone (`#F5F1E8`) backgrounds, cream panels, moss green primary, clay terracotta accents, mustard sun highlights, ink for text.
- **Type:** Fraunces (display serif), Manrope (body), JetBrains Mono (UI labels — uppercase, wide tracking).
- **Signature elements:** 3px hard-offset "stamp" shadows on buttons and cards, diagonal yellow/black ticker stripes on page headers, dashed dividers between data rows.

The look is "trades operation," not "tech company." Adjust to taste.

---

## What's intentionally NOT here

- No time clock. ADP handles payroll.
- No GPS tracking. Crews use Directions buttons that link out to maps.
- No authentication. Add NextAuth or Clerk when ready.
- No persistence. Add Postgres + Drizzle/Prisma when ready.

These are sequencing decisions, not gaps — the surface area was kept tight on purpose so the operational logic can prove out before the plumbing gets built.
