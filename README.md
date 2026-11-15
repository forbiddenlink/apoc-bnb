# Apoc BnB

A post-apocalyptic Airbnb parody: browse bunkers, fallout shelters, and fortified
properties. Creative/humorous frontend project, no real database.

Live: <https://apoc-bnb.vercel.app>

## Features

- Browse post-apocalyptic bunker/shelter listings, with an interactive map on `/search`
- Filter, compare (up to 3 at once), and favorite listings
- Booking flow with a simulated 10% random failure rate
- A chat widget that answers with scripted in-character replies (`src/lib/apocAiResponses.ts`); it makes no model call
- Konami code and other easter eggs

## Quick start

```bash
pnpm install
pnpm dev
```

Requires Node 20 or newer (`engines`) and pnpm (pinned by `packageManager`). Open [http://localhost:3000](http://localhost:3000). `GROQ_API_KEY` and
`NEXT_PUBLIC_POSTHOG_KEY` are required by the schema in `src/env.ts`, although no code outside that file reads `GROQ_API_KEY`. Set
`SKIP_ENV_VALIDATION` to bypass validation for a build without full secrets.
`NEXT_PUBLIC_MAPBOX_TOKEN` is optional - the `/search` map falls back to a static UI
without it.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- TanStack React Query + Zustand for data/state
- Mapbox GL for the interactive map
- Framer Motion for animations
- Vitest and Testing Library for tests, Biome and ESLint for linting
- Optional Sentry, PostHog, Axiom and Arcjet
- Deployed on Vercel

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` / `build` / `start` | Next.js dev server / production build / start |
| `pnpm lint` | ESLint |
| `pnpm run biome:check` / `biome:fix` | Biome |
| `pnpm test` / `test:watch` / `test:coverage` | Vitest |
| `pnpm run analyze` | Bundle analyzer build |

See `CLAUDE.md` for the full layout, data-layer, and environment-variable reference.

## License

MIT. See `LICENSE`.
