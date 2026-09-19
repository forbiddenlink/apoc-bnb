# Apoc BnB

A post-apocalyptic Airbnb parody: browse bunkers, fallout shelters, and fortified
properties. Creative/humorous frontend project, no real database.

[![Live Demo](https://img.shields.io/badge/Live_Demo-000?style=for-the-badge&logo=vercel&logoColor=white)](https://apoc-bnb.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

Live: <https://apoc-bnb.vercel.app>

## Features

- Browse post-apocalyptic bunker/shelter listings, with an interactive map on `/search`
- Filter, compare (up to 3 at once), and favorite listings
- Booking flow with a simulated 10% random failure rate
- AI chat backed by Groq
- Konami code and other easter eggs

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). `GROQ_API_KEY` and
`NEXT_PUBLIC_POSTHOG_KEY` are required (validated via `src/env.ts`); set
`SKIP_ENV_VALIDATION` to bypass for a build without full secrets.
`NEXT_PUBLIC_MAPBOX_TOKEN` is optional - the `/search` map falls back to a static UI
without it.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- TanStack React Query + Zustand for data/state
- Mapbox GL for the interactive map
- Framer Motion for animations
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
