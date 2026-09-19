# Apoc BnB

Post-apocalyptic Airbnb parody: browse bunkers, fallout shelters, and fortified properties.
Creative/humorous frontend project, no real database. Live: https://apoc-bnb.vercel.app

## Stack

- Next.js 16 (App Router), React 19, TypeScript 7, Tailwind CSS v4
- TanStack React Query for data fetching/caching, Zustand for client state
- Mapbox GL (`react-map-gl` + `supercluster`) for the interactive map on `/search`
- Framer Motion for animations, `dinero.js` for price formatting
- Arcjet (`@arcjet/next`) for bot/rate-limit protection, `next-safe-action` for server actions
- Sentry, Axiom (`next-axiom`), PostHog for observability/analytics
- Vitest + React Testing Library (jsdom) for tests, MSW for API mocking
- Biome and ESLint (`eslint-config-next`) both configured
- Deployed on Vercel. Package manager: pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml`)

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm lint` - ESLint (next/core-web-vitals + next/typescript)
- `pnpm run biome:check` / `pnpm run biome:fix` / `pnpm run biome:format`
- `pnpm test` / `pnpm run test:watch` / `pnpm run test:coverage` - Vitest
- `pnpm run analyze` - bundle analyzer build (`ANALYZE=true next build`)
- `postbuild` runs `next-sitemap` automatically after `pnpm build`

## Data layer: no database

All data lives in `src/lib/data/` as static TypeScript arrays (`bunkers.ts`, `reviews.ts`,
`guest-stories.ts`, `host-quirks.ts`, `raids.ts`, `survival-tips.ts`, `loading-messages.ts`,
`terminal-logs.ts`). Route Handlers in `src/app/api/` (`src/app/api/bunkers/route.ts`,
`src/app/api/bunkers/[id]/route.ts`, `src/app/api/bookings/route.ts`) wrap these files to simulate a REST API,
including a 10% random failure rate on booking creation.

## State and data fetching

- `src/lib/store.ts` (Zustand, persisted to localStorage) - favorites, bookings, search filters
- `src/lib/hooks/useComparison.ts` (Zustand, persisted) - bunker comparison list (max 3)
- `src/lib/hooks/` - React Query hooks: `useBunkers`, `useBunker`, `useBookBunker`, plus
  `useMapClustering`, `useKonamiCode`, `useSoundEffects`, `useVisibleInterval`
- The bunker detail page (`src/app/bunkers/[id]/page.tsx`) is a server component reading
  `src/lib/data/` directly; it does not go through the API routes. Homepage and `/search`
  fetch through the API via React Query.

## Other notable modules

- `src/lib/safe-action.ts` - `next-safe-action` client setup
- `src/lib/apocAiResponses.ts` - AI chat responses (uses `GROQ_API_KEY`); backs
  `src/components/chat/`
- `src/lib/apoc-weather.ts`, `src/lib/pricing.ts` (dinero.js), `src/lib/posthog.ts`,
  `src/lib/site-url.ts`

## Styling

Tailwind v4 via `@tailwindcss/postcss`. Dark "survivalist" theme as CSS custom properties in
`globals.css`: primary `#39ff14`, secondary `#d4af37`, accent `#ff003c`. Custom utilities:
`.glass-panel`, `.hud-border`, `.text-cinematic`, `.text-gold-gradient`, `.text-glow`,
`.border-glow`. shadcn/ui pattern with `cn()` in `src/lib/utils.ts`.

## Testing

Tests co-located with source (`Component.test.tsx` next to `Component.tsx`). Two Vitest
configs exist (`vitest.config.ts` and `vitest.config.mts`) pointing at different setup files;
see Code Issues.

## Environment variables

Validated via `src/env.ts` (`@t3-oss/env-nextjs`): `GROQ_API_KEY` (required),
`NEXT_PUBLIC_POSTHOG_KEY` (required), `AXIOM_TOKEN`, `NEXT_PUBLIC_AXIOM_DATASET`,
`NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_SENTRY_DSN` (all optional). `SKIP_ENV_VALIDATION`
bypasses validation.

Read directly via `process.env` but not in the schema: `ARCJET_KEY`, `NEXT_PUBLIC_BASE_URL`
(defaults to `http://localhost:3000`, used in metadata `metadataBase`),
`NEXT_PUBLIC_MAPBOX_TOKEN` (map on `/search` falls back to a static UI if missing),
`VERCEL_PROJECT_PRODUCTION_URL`.

## Path alias

`@/*` maps to `./src/*` (configured in `tsconfig.json` and both vitest configs).
