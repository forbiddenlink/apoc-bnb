# Baseline Performance Metrics ("Before" — over-animated state)

Captured: 2026-07-25, on branch `redesign/restraint-signature`, immediately after fixing the
`pnpm install` bug (Task 1), before any restraint/signature redesign changes landed.

- Server: `./node_modules/.bin/next dev` (Turbopack), Next.js 16.2.7
- Target: `http://localhost:3000/` (home page)
- Tool: Lighthouse MCP (`mcp__lighthouse__run_audit`), mobile emulation, throttling on (default)

## Lighthouse — Performance category

| Metric | Value | Score |
|---|---|---|
| Performance score | **0.26** (26/100) | — |
| First Contentful Paint (FCP) | 7.8 s | 0 |
| Largest Contentful Paint (LCP) | **11.1 s** | 0 |
| Total Blocking Time (TBT) | 430 ms | 0.65 |
| Cumulative Layout Shift (CLS) | **0.477** | 0.18 |
| Speed Index | 7.8 s | 0.23 |
| Time to Interactive (TTI) | 11.3 s | 0.19 |

**INP**: not captured — INP is a field metric (based on real user interaction timing) and is not
emitted by a Lighthouse lab audit; TBT (430 ms) is the closest lab proxy for main-thread
responsiveness and is included above.

## Qualitative baseline: headless screenshot capture

A screenshot with a strict wait-for-idle strategy (network-idle / animation-settle) does not
reliably resolve on `/` in its current state, because the main thread never truly idles. Verified
directly via Playwright (`document.getAnimations({ subtree: true })` on the home page):

- **23 running animations**, of which **23 are infinite-iteration** (`animation-iteration-count:
  infinite` equivalents) — e.g. `pulse`, `shine`, `ping`, `hazard-scroll`, plus decorative
  radiating-ring elements.
- A plain viewport screenshot (no explicit idle wait) still succeeds quickly, but any capture
  strategy that waits for the page to reach a quiescent/idle state (network-idle, animation-idle)
  will not resolve on its own — there is always at least one infinite CSS animation running,
  so "idle" is never reached without an explicit timeout/cutoff.

This is the qualitative "before" signal for the redesign: the home page is permanently animating
(23 concurrent infinite loops), which is consistent with the very high LCP/TTI/CLS numbers above
(constant repaint/reflow work competing with the main thread during load).

## Environment notes

- `pnpm install --frozen-lockfile` (`CI=true`) passes cleanly as of this commit (see Task 1
  report for full install output) — this baseline was captured on a working install.
- Lighthouse run: single pass, mobile emulation, default throttling. Not averaged across multiple
  runs — treat as directional "before" baseline, to be compared against the same single-pass
  methodology after the redesign lands.
