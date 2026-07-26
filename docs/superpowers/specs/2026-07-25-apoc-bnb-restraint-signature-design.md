# APOC-BNB — Restraint + Signature Redesign

**Snapshot as of:** 2026-07-25
**Written against:** `155845e` (main)
**Status:** Design approved (direction + shader mood), spec under review

## Problem

APOC-BNB is already a mature, feature-complete post-apocalyptic Airbnb parody
(60+ components, deep tactical design system, 53 real AI-rendered images, Mapbox,
AI chat, booking, reviews, easter eggs, full observability + tests). It is
*over-built*, not under-built. The portfolio weakness is not missing features —
it is **motion noise and lack of a focal moment**:

- Every page stacks always-on animation: global `RouteProgress` + `NoiseOverlay`
  static-flicker + per-page `scanline` (10 uses) on top of **10 components running
  `setInterval` loops** and **7 running `repeat: Infinity` framer loops**, plus
  ambient `radar-ping` / `breathe` / `shimmer` / `hazard-scroll`. On the home page
  these fire simultaneously — the main thread never idles (a headless browser
  cannot even capture a still frame). This reads as "junior/trying-hard," buries
  the strong imagery, and hurts INP/LCP.
- No single jaw-drop moment. Effort is spread across many small effects instead of
  concentrated into one memorable hero beat.
- The 53 AI images vary in lighting/palette; `hero-bunker.png` is mis-served at
  `quality=100` (Next warns).
- A recent dependabot commit orphaned `pnpm.overrides` in `package.json` (pnpm no
  longer reads that field) → `pnpm install` fails with `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`.

## Goal / success criteria

Elevate perceived quality to *senior* by concentrating motion into **one signature
hero moment** and making everything else **calm**, while unifying the imagery.

Done means:
- One deliberate cinematic hero (GLSL radiation-haze shader); the page is otherwise quiet.
- Continuous decorative animation removed or converted to interaction/rare; only
  compositor-safe (`transform`/`opacity`) motion runs on a loop.
- Images read as one world (shared grade treatment); hero image config fixed.
- Lighthouse: LCP < 1.5s, INP good, no reduced-motion violations. Measurable
  before/after.
- `pnpm install` works clean.
- No feature regressions; all existing tests green.

## Non-goals (chosen direction: Restraint + 1 Signature)

- No 3D/react-three-fiber interactive bunker viewer.
- No hero video (2026 commentary flags templated hero-loop video as an AI-slop tell).
- No standalone case-study page or recorded walkthrough (deferrable follow-up).
- No new features, routes, or data. No content rewrite.

## Design

### 1. Signature moment — GLSL radiation-haze hero

Replace `src/components/ui/AnimatedHeroBackground.tsx` (7 stacked framer Infinity
loops) with a single hand-written fragment shader.

- **Technique:** raw WebGL fullscreen-triangle + GLSL fragment shader on a
  `<canvas>`. **No react-three-fiber** (its scene-graph overhead only pays off for
  real 3D/GLTF/physics). Near-zero bundle beyond the shader source. Optionally OGL
  (~3-8KB) only if raw-GL boilerplate proves noisy; default is raw GL.
- **Visual (approved: "Radiation haze + ash"):** slow volumetric fog drifting across
  a near-black sky, faint ash/embers rising, a dim green→gold fallout glow low on
  the horizon. Palette-bound (near-black base, low `#39ff14` / `#d4af37` bleed).
  Ominous, cinematic, calm.
- **Composition:** canvas is a fixed/absolute background layer; the real hero
  headline + subhead + search widget stay in the DOM on top. Canvas is NOT the LCP
  element — real text/hero image is.
- **Structure:** a reusable `RadiationHazeCanvas` client component
  (`"use client"`, mounted client-only / deferred rAF start). Uniforms: `uTime`,
  `uResolution`, `uReducedMotion`, palette colors. Single `requestAnimationFrame`
  loop.
- **Perf/a11y guardrails (hard requirements):**
  - `IntersectionObserver` → `cancelAnimationFrame` when hero scrolls offscreen;
    resume on re-enter.
  - Pause on `document.hidden` (visibilitychange).
  - `prefers-reduced-motion: reduce` → render ONE static frame, stop the loop (keep
    the visual, remove the motion).
  - Clamp `devicePixelRatio` to ~1.5–2.0 to avoid GPU overkill on high-DPI.
  - WebGL-unavailable fallback: a static CSS radial-gradient approximation (the
    current body gradient is a fine base).

### 2. Restraint pass (make everything else calm)

Enforce: **infinite loops only if compositor-only (`transform`/`opacity`).** Anything
animating `background-color` / `box-shadow` / `width` / layout must not run forever.

- **Remove global always-on layers:**
  - `NoiseOverlay` continuous `static-flicker` → static grain at fixed low opacity,
    or drop. (`src/components/ui/NoiseOverlay.tsx`, mounted in `layout.tsx`.)
  - Global `scanline` overlay on `page.tsx` (and other pages) → remove as an
    always-on full-screen layer; if kept anywhere, hero-only and subtle.
- **Convert to interaction / in-view-once (kill the constant loop):**
  - `GlitchText` — trigger on hover or first in-view, not perpetual.
    (`src/components/ui/GlitchText.tsx`, 4 `animate-glitch` sites.)
  - The 7 `repeat: Infinity` framer components — audit each; keep a loop ONLY if
    compositor-safe AND it earns attention (e.g. one status pulse). Offenders:
    `AnimatedHeroBackground` (replaced), `ApocMascot`, `CommandCenterStats`,
    `GlitchText`, `HostQuirkBadge`, `SystemStatus`, `BookingWidget`.
  - Ambient CSS loops `radar-ping` (4), `breathe` (3), `shimmer` (2),
    `hazard-scroll` (2), `pulse-glow` (1) — remove where purely decorative; keep at
    most one, compositor-safe.
- **Throttle interval churn (10 `setInterval` components):** rotating tickers
  (`EmergencyBroadcast`, `SurvivalTip`, `LoadingMessage`, `GuestStories`) slow their
  cadence and pause on `document.hidden`. Clocks (`SystemStatus`, `Footer`,
  `DefconIndicator`) keep 1s but pause when tab hidden. `TypewriterText` stays
  (one-shot). `DoomsdayMap` / `SecretTerminal` intervals reviewed for pause-when-hidden.
- **Motion system discipline:** one scroll-reveal per *section*, not per element.
  Use existing timing/easing CSS tokens (`--duration-*`, `--ease-*`); stop the
  one-off inline transitions. Where scroll-reveal is used, prefer CSS
  `animation-timeline: view()` wrapped in `@supports`, with framer `useScroll` as
  the JS fallback (Firefox stable still flag-gates scroll-timeline mid-2026).

### 3. Image-grade unification

- Shared treatment so 53 PNGs read as one world: a lightweight overlay/wrapper
  (subtle duotone-toward-palette + vignette + fine grain) applied via one component
  or CSS utility on bunker/hero imagery. Keep it cheap (CSS filters / one gradient
  overlay), no per-image reprocessing required for v1.
- Fix `next.config.ts` `images.qualities` to include the values in use (e.g.
  `[75, 100]`) OR drop hero `quality` to a configured value. Hero image → `priority`,
  AVIF/WebP `formats`, explicit `sizes`.

### 4. Guardrails + bug fix

- **Fix `pnpm.overrides`:** move overrides to the location pnpm now reads
  (`pnpm-workspace.yaml` `overrides:` or the supported `package.json` path per
  current pnpm), regenerate lockfile so `pnpm install` (frozen) passes. Verify a
  clean `pnpm install` + `pnpm dev`.
- **Perf/a11y verification:** Lighthouse (or `mcp__lighthouse`) before/after on home
  + one detail page; capture LCP/INP/CLS. Confirm every animation respects
  `prefers-reduced-motion`. No horizontal scroll, no layout shift from the shader.

## Components / files touched (anticipated)

- New: `src/components/ui/RadiationHazeCanvas.tsx` (+ shader source, inline or `.glsl`).
- Replace/retire: `src/components/ui/AnimatedHeroBackground.tsx`.
- Edit: `src/app/page.tsx` (hero swap, remove global scanline), `src/app/layout.tsx`
  (NoiseOverlay), `globals.css` (retire dead animation utilities), the interval/loop
  components listed above, `next.config.ts` (image config), `package.json` /
  `pnpm-workspace.yaml` (overrides).
- Image-grade: one new utility/component + application at bunker/hero image sites.

## Testing / verification

- Existing vitest suite stays green (`pnpm test`).
- New: a render/smoke test for `RadiationHazeCanvas` (mounts, respects
  reduced-motion prop, cleans up rAF on unmount) — mock WebGL context.
- Manual: home + detail render, hero shader animates, pauses offscreen + on hidden
  tab, static under reduced-motion, WebGL-off fallback shows.
- Lighthouse before/after captured in the PR.
- Headless screenshot of home now succeeds (proof the main thread idles).

## Rollout

Single feature branch off `main`; not committed to `main` directly. Before/after
Lighthouse + screenshots in the PR body. Keep changes reversible per component.
