# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Apoc BnB is a post-apocalyptic Airbnb parody — a rental platform for bunkers, fallout shelters, and fortified properties. It's a creative/humorous frontend project with no real database; all data comes from in-memory mock data files.

## Commands

- **Dev server:** `npm run dev` (runs on localhost:3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint with next/core-web-vitals and next/typescript configs)
- **Run all tests:** `npx vitest run`
- **Run a single test:** `npx vitest run src/components/BunkerCard.test.tsx`
- **Run tests in watch mode:** `npx vitest`

CI (`npm ci --legacy-peer-deps` then `npm run build`) runs on pushes/PRs to `main`.

## Architecture

### Tech Stack

- Next.js 16 (App Router) with React 19, TypeScript, Tailwind CSS v4
- TanStack React Query for data fetching and caching
- Zustand for client-side state (favorites, bookings, search filters)
- Mapbox GL (`react-map-gl`) for the interactive map on `/search`
- Framer Motion for animations
- Vitest + React Testing Library for tests (jsdom environment)
- Deployed on Vercel

### Data Layer — No Database

There is **no database or external API**. All data lives in `src/lib/data/` as static TypeScript arrays:
- `bunkers.ts` — mock bunker listings, plus `getBunkerById()` and `filterBunkers()` helpers
- `reviews.ts`, `guest-stories.ts`, `host-quirks.ts`, `raids.ts`, `survival-tips.ts`, `loading-messages.ts`, `terminal-logs.ts` — thematic content

Next.js Route Handlers in `src/app/api/` wrap these data files to simulate a REST API:
- `GET /api/bunkers` — list/filter bunkers (params: location, maxPrice, minRating, radFree)
- `GET /api/bunkers/[id]` — single bunker + its reviews
- `POST /api/bookings` — fake booking creation with 1.5s simulated delay and 10% random failure rate

### State Management

Two Zustand stores, both persisted to localStorage:
- `src/lib/store.ts` (`useAppStore`) — favorites, bookings, search filters
- `src/lib/hooks/useComparison.ts` (`useComparison`) — bunker comparison list (max 3)

### React Query Hooks

All data fetching goes through hooks in `src/lib/hooks/`:
- `useBunkers(filters)` — fetches via API, then applies additional client-side filters (minPrice, maxRadLevel, guests, amenities) that the API doesn't support
- `useBunker(id)` / `useReviews(bunkerId)` — single bunker detail + reviews
- `usePrefetchBunker()` — prefetches bunker detail on hover for instant navigation
- `useBookBunker()` — mutation with optimistic updates and rollback

Query key factory in `useBunkers.ts` (`bunkerKeys`) and `useBookBunker.ts` (`bookingKeys`) — use these for cache invalidation.

### Route Structure

- `/` — homepage (client component, hero + featured bunkers + guest stories)
- `/search` — split-pane layout: filter sidebar + Mapbox map
- `/bunkers/[id]` — server component with `generateMetadata`, renders `BunkerDetailsContent`
- `/bookings`, `/favorites`, `/compare`, `/profile`, `/about`, `/host`, `/experiences`, `/terminal` — additional pages

The bunker detail page (`/bunkers/[id]`) is a **server component** that reads data directly from `src/lib/data/` — it does NOT go through the API routes. The homepage and search page are **client components** that fetch through the API via React Query.

### Styling

Tailwind CSS v4 with `@tailwindcss/postcss` plugin. The design uses a dark "survivalist" theme defined as CSS custom properties in `globals.css`:
- Primary: `#39ff14` (laser green) — status/tech elements
- Secondary: `#d4af37` (burnished gold) — luxury accents
- Accent: `#ff003c` (signal red) — alerts/danger

Custom utility classes in `globals.css`: `.glass-panel`, `.hud-border`, `.text-cinematic`, `.text-gold-gradient`, `.text-glow`, `.border-glow`

Uses shadcn/ui pattern with `cn()` utility (`clsx` + `tailwind-merge`) in `src/lib/utils.ts`.

### Environment Variables

- `NEXT_PUBLIC_MAPBOX_TOKEN` — required for the map on `/search`. The map renders a fallback UI if missing.
- `NEXT_PUBLIC_BASE_URL` — used in metadata `metadataBase`; defaults to `http://localhost:3000`

### Testing

Tests are co-located with source files (e.g., `BunkerCard.test.tsx` next to `BunkerCard.tsx`). Setup file at `src/test/setup.ts` imports `@testing-library/jest-dom/vitest`. The `@` path alias is configured in `vitest.config.mts`.

### Path Alias

`@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vitest.config.mts`).
