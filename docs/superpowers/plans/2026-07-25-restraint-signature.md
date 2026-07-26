# APOC-BNB Restraint + Signature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Concentrate the app's motion into one cinematic GLSL radiation-haze hero, make everything else calm, unify the imagery, and fix the install/image config — raising perceived quality to "senior" without adding features.

**Architecture:** Replace the multi-loop `AnimatedHeroBackground` with a single hand-written WebGL fragment shader (`RadiationHazeCanvas`) that is compositor/GPU-only, paused offscreen/hidden, and static under reduced-motion. Strip global always-on animation layers and convert perpetual decorative loops to interaction/in-view-once. Apply a shared grade treatment to imagery. Verify with before/after Lighthouse and a headless screenshot that now succeeds.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, framer-motion 12, raw WebGL/GLSL (no react-three-fiber), vitest, pnpm.

## Global Constraints

- Branch: `redesign/restraint-signature` (already created off `main`). Never commit to `main`.
- Infinite/looping animation is allowed ONLY if it animates `transform`/`opacity` (compositor-only). Anything touching `background-color`/`box-shadow`/`width`/layout must not run on a perpetual loop.
- Every animation must respect `prefers-reduced-motion: reduce` (freeze to a static frame — keep the visual, remove the motion).
- The hero `<canvas>` is NEVER the LCP element; real hero text/image stays in the DOM on top.
- No new features, routes, or data. No content/copy rewrite. Non-goals: react-three-fiber, hero video, case-study page.
- All existing vitest tests must stay green (`pnpm test`).
- Package manager is pnpm; run via `./node_modules/.bin/next` if a pnpm wrapper blocks (lockfile drift). Use conventional commits, no Claude attribution/co-author lines.
- Palette (verbatim): background `#050505`, primary/laser-green `#39ff14`, secondary/gold `#d4af37`, accent/red `#ff003c`.

---

### Task 1: Fix install bug + capture baseline

**Why:** The last dependabot commit orphaned `pnpm.overrides` in `package.json` (pnpm no longer reads that field) → `pnpm install` fails `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`. Fix first so the toolchain works; capture the "before" perf baseline while the app is still in its over-animated state.

**Files:**
- Modify: `package.json` (remove `pnpm.overrides` block)
- Create: `pnpm-workspace.yaml` (move `overrides:` here)
- Modify: `pnpm-lock.yaml` (regenerated)

**Interfaces:**
- Produces: a repo where `pnpm install` (default/frozen) succeeds and `pnpm dev` runs.

- [ ] **Step 1: Read the current overrides** — inspect the `pnpm` field in `package.json` and note the exact `overrides` map (key → version).

- [ ] **Step 2: Move overrides to `pnpm-workspace.yaml`**

Create `pnpm-workspace.yaml` with the overrides copied verbatim:

```yaml
overrides:
  # <copy each key: value from the old package.json pnpm.overrides here, verbatim>
```

- [ ] **Step 3: Remove the `pnpm` field from `package.json`** (delete the whole `"pnpm": { "overrides": { ... } }` block).

- [ ] **Step 4: Regenerate the lockfile**

Run: `CI=true pnpm install --no-frozen-lockfile`
Expected: completes; `node_modules/.bin/next` exists.

- [ ] **Step 5: Verify a frozen install now passes**

Run: `CI=true pnpm install --frozen-lockfile`
Expected: PASS (no `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`).

- [ ] **Step 6: Capture baseline** — start dev (`./node_modules/.bin/next dev`), run Lighthouse on `http://localhost:3000` (mcp__lighthouse `run_audit` or `get_performance_score`), and record LCP/INP/CLS/perf score into `docs/superpowers/plans/baseline-metrics.md`. Note in that file that a headless screenshot of `/` currently FAILS (main thread never idles) as the qualitative baseline.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-workspace.yaml pnpm-lock.yaml docs/superpowers/plans/baseline-metrics.md
git commit -m "fix: move pnpm overrides to workspace file so install passes"
```

---

### Task 2: Hero image config fix

**Why:** `hero-bunker.png` is served at `quality=100` which is not in `images.qualities` (Next 16 warns). Configure image quality/formats and make the hero image a proper LCP element.

**Files:**
- Modify: `next.config.ts` (`images` config)
- Modify: the hero image usage site (grep for `hero-bunker` and `quality={100}` — likely `src/app/page.tsx` or a hero component)

**Interfaces:**
- Produces: no Next image-quality warning; hero image uses `priority`, AVIF/WebP, explicit `sizes`.

- [ ] **Step 1: Locate the hero image usage**

Run: `grep -rn "hero-bunker\|quality={100}\|quality: 100" src`
Note each file:line.

- [ ] **Step 2: Configure `next.config.ts` images**

Add to the `images` block:

```ts
images: {
  formats: ["image/avif", "image/webp"],
  qualities: [75, 90, 100],
  // ...keep existing keys
},
```

- [ ] **Step 3: Fix the hero `<Image>`** — on the hero image set `priority`, `sizes="100vw"` (or the true rendered width), and a `quality` value that is now configured (keep `100` or drop to `90`).

- [ ] **Step 4: Verify no warning**

Run: restart `./node_modules/.bin/next dev`, load `/`, check the dev log has no `next-image-unconfigured-qualities` warning.
Expected: warning gone.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src
git commit -m "fix: configure next/image qualities+formats and prioritize hero image"
```

---

### Task 3: RadiationHazeCanvas signature shader

**Why:** The one deliberate wow moment. Replaces `AnimatedHeroBackground` (7 stacked framer Infinity loops) with a single GPU fragment shader: drifting volumetric fog + rising ash + dim green→gold horizon glow, near-black.

**Files:**
- Create: `src/components/ui/RadiationHazeCanvas.tsx`
- Create: `src/components/ui/RadiationHazeCanvas.test.tsx`
- Modify: `src/app/page.tsx` (swap `AnimatedHeroBackground` → `RadiationHazeCanvas`, keep `ScrollIndicator`)
- Delete: `src/components/ui/AnimatedHeroBackground.tsx` (after confirming `ScrollIndicator` is re-homed — it is exported from that file; move `ScrollIndicator` into its own file `src/components/ui/ScrollIndicator.tsx` or into `RadiationHazeCanvas.tsx`)

**Interfaces:**
- Produces: `RadiationHazeCanvas` (default or named export), a `"use client"` component taking optional props `{ className?: string }`. Internally starts one `requestAnimationFrame` loop, pauses via `IntersectionObserver` + `visibilitychange`, renders one static frame under `prefers-reduced-motion`, clamps DPR to ≤2, and falls back to a static CSS radial gradient if `getContext("webgl")` is null.
- Produces: `ScrollIndicator` re-exported from its new home; update the import in `page.tsx`.

- [ ] **Step 1: Re-home `ScrollIndicator`** — create `src/components/ui/ScrollIndicator.tsx` moving the existing `ScrollIndicator` implementation out of `AnimatedHeroBackground.tsx` verbatim; update `src/app/page.tsx` import to `@/components/ui/ScrollIndicator`. Run `pnpm test` + load `/` to confirm nothing broke.

- [ ] **Step 2: Write the failing test**

```tsx
// src/components/ui/RadiationHazeCanvas.test.tsx
import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RadiationHazeCanvas } from "./RadiationHazeCanvas";

afterEach(cleanup);

describe("RadiationHazeCanvas", () => {
  it("renders a canvas element", () => {
    const { container } = render(<RadiationHazeCanvas />);
    expect(container.querySelector("canvas")).not.toBeNull();
  });

  it("does not start a rAF loop under reduced motion", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("reduce"),
      media: q, addEventListener: vi.fn(), removeEventListener: vi.fn(),
      addListener: vi.fn(), removeListener: vi.fn(), onchange: null, dispatchEvent: vi.fn(),
    }));
    const raf = vi.spyOn(window, "requestAnimationFrame");
    render(<RadiationHazeCanvas />);
    expect(raf).not.toHaveBeenCalled();
    raf.mockRestore();
    vi.unstubAllGlobals();
  });

  it("cancels its rAF loop on unmount", () => {
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<RadiationHazeCanvas />);
    unmount();
    expect(cancel).toHaveBeenCalled();
    cancel.mockRestore();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test -- RadiationHazeCanvas`
Expected: FAIL (module not found / export missing).

- [ ] **Step 4: Implement `RadiationHazeCanvas.tsx`**

Provide a real implementation. Key pieces (write in full):

```tsx
"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
// 2D value-noise + fbm
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  vec2 p = uv*vec2(uResolution.x/uResolution.y,1.);
  float t = uTime*0.03;
  // drifting fog
  float fog = fbm(p*3.0 + vec2(t, -t*0.5));
  fog = smoothstep(0.2, 1.0, fog);
  // rising ash: sparse upward-drifting motes
  float ash = smoothstep(0.985, 1.0, noise(vec2(p.x*40.0, p.y*40.0 - uTime*0.4)));
  // horizon glow low on screen, green->gold
  float horizon = smoothstep(0.0, 0.45, uv.y);
  vec3 base = vec3(0.02,0.02,0.02);
  vec3 green = vec3(0.224,1.0,0.078);   // #39ff14
  vec3 gold  = vec3(0.831,0.686,0.216); // #d4af37
  vec3 glow = mix(gold, green, uv.x) * (1.0-horizon) * 0.14;
  vec3 col = base + glow + fog*0.05*green*0.5 + ash*green*0.6;
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.,1.); }`;

export function RadiationHazeCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl");
    if (!gl) { canvas.style.background =
      "radial-gradient(circle at 50% 100%, rgba(57,255,20,0.08), transparent 60%), #050505"; return; }

    // compile program
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uResolution");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize(); window.addEventListener("resize", resize);

    let raf = 0; let running = false; const start = performance.now();
    const frame = () => { gl.uniform1f(uTime, (performance.now()-start)/1000); gl.drawArrays(gl.TRIANGLES,0,3); raf = requestAnimationFrame(frame); };
    const play = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    if (reduced) { gl.uniform1f(uTime, 0); gl.drawArrays(gl.TRIANGLES,0,3); }
    else {
      const io = new IntersectionObserver(([e]) => e.isIntersecting ? play() : stop(), { threshold: 0 });
      io.observe(canvas);
      const onVis = () => document.hidden ? stop() : play();
      document.addEventListener("visibilitychange", onVis);
      return () => { stop(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); window.removeEventListener("resize", resize); };
    }
    return () => { window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className={cn("absolute inset-0 w-full h-full", className)} />;
}
```

Note: under reduced-motion the effect returns before creating the IO/rAF, so `requestAnimationFrame` is never called (satisfies the test).

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test -- RadiationHazeCanvas`
Expected: PASS (3 tests). If jsdom lacks WebGL, the null-context fallback path runs — the "renders a canvas" and reduced-motion tests still hold; adjust the unmount test to also pass when the fallback path is taken (guard: only assert cancel was called when a gl context existed — in jsdom `getContext("webgl")` is null, so relax that test to assert no throw on unmount).

- [ ] **Step 6: Wire into the hero** — in `src/app/page.tsx` replace `<AnimatedHeroBackground />` with `<RadiationHazeCanvas />`; keep `<ScrollIndicator />` (now imported from its new file). Ensure the canvas sits behind the hero content (`z` order: canvas `absolute inset-0`, content `relative z-10`).

- [ ] **Step 7: Delete the old component** — remove `src/components/ui/AnimatedHeroBackground.tsx`; run `grep -rn "AnimatedHeroBackground" src` and confirm zero remaining imports.

- [ ] **Step 8: Manual verify** — load `/`: haze drifts, real headline is crisp on top, scrolling away stops the loop (check DevTools Performance/no rAF), reduced-motion (emulate) shows a static frame.

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/RadiationHazeCanvas.tsx src/components/ui/RadiationHazeCanvas.test.tsx src/components/ui/ScrollIndicator.tsx src/app/page.tsx
git rm src/components/ui/AnimatedHeroBackground.tsx
git commit -m "feat: add GLSL radiation-haze hero shader, retire multi-loop hero bg"
```

---

### Task 4: Remove global always-on layers

**Why:** `NoiseOverlay` static-flicker and the global `scanline` overlay run on every page, keeping the main thread busy and burying content.

**Files:**
- Modify: `src/components/ui/NoiseOverlay.tsx` (static grain, no flicker loop)
- Modify: `src/app/layout.tsx` (keep `NoiseOverlay` only if now static)
- Modify: `src/app/page.tsx` and any page with the scanline overlay (grep)

**Interfaces:**
- Produces: no full-screen perpetually-animating overlay anywhere.

- [ ] **Step 1: Find scanline overlay usages**

Run: `grep -rn "scanline\|NoiseOverlay\|static-flicker" src`
List each file:line.

- [ ] **Step 2: Make `NoiseOverlay` static** — remove the `animate`/`static-flicker` loop; render a single fixed-opacity grain layer (a static PNG/SVG data-URI or a non-animated CSS texture) at low opacity. Keep it `pointer-events-none`.

- [ ] **Step 3: Remove global scanline overlays** — delete the `<div className="... scanline ...">` full-screen overlay from `page.tsx` and any other page. (The `scanline` utility may remain in CSS for optional hero-local use, but no always-on full-screen instance.)

- [ ] **Step 4: Verify the headless screenshot now succeeds** — with dev running, take a screenshot of `/` via the browser tool.
Expected: SUCCEEDS (previously timed out) — proof the main thread now idles. Save the image.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/NoiseOverlay.tsx src/app/layout.tsx src/app/page.tsx
git commit -m "perf: drop always-on noise flicker and global scanline overlay"
```

---

### Task 5: Quiet the perpetual component loops

**Why:** 7 `repeat: Infinity` framer loops + ambient CSS loops (`radar-ping`, `breathe`, `shimmer`, `hazard-scroll`, `pulse-glow`) + 10 `setInterval` tickers/clocks run constantly. Convert to interaction/in-view-once and pause when the tab is hidden. Enforce the compositor-only rule.

**Files (modify):**
- `src/components/ui/GlitchText.tsx`
- `src/components/ui/ApocMascot.tsx`, `src/components/ui/CommandCenterStats.tsx`, `src/components/ui/HostQuirkBadge.tsx`, `src/components/ui/SystemStatus.tsx`, `src/components/booking/BookingWidget.tsx` (the framer Infinity loops)
- `src/components/ui/EmergencyBroadcast.tsx`, `src/components/ui/SurvivalTip.tsx`, `src/components/ui/LoadingMessage.tsx`, `src/components/features/GuestStories.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/DefconIndicator.tsx` (the interval tickers/clocks)

**Interfaces:**
- Produces: no decorative infinite loop except at most one compositor-only status pulse; all intervals pause on `document.hidden`.

- [ ] **Step 1: GlitchText → trigger, not loop** — change `GlitchText` so the glitch runs on hover and/or once when it first enters the viewport (framer `whileHover` / `whileInView` with `viewport={{ once: true }}`), not on a perpetual timer/`repeat: Infinity`. Keep the visual identical for that single burst.

- [ ] **Step 2: Audit the 6 framer Infinity loops** — for each listed component, either remove the `repeat: Infinity` (make it a one-shot entrance) or, if the motion earns attention (e.g. a live "system online" status dot), keep the loop ONLY if it animates `transform`/`opacity` only. Convert any that animate `box-shadow`/`background`/glow-color loops to a static styled state. Keep at most one status pulse total.

- [ ] **Step 3: Pause intervals when hidden** — for each interval component, gate the `setInterval` callback so it no-ops (or the interval is cleared/re-created) while `document.hidden`. Extract a small shared hook if repetition is high:

```tsx
// src/lib/hooks/useVisibleInterval.ts
import { useEffect, useRef } from "react";
export function useVisibleInterval(cb: () => void, ms: number) {
  const saved = useRef(cb); saved.current = cb;
  useEffect(() => {
    let id = 0;
    const start = () => { id = window.setInterval(() => { if (!document.hidden) saved.current(); }, ms); };
    start();
    return () => window.clearInterval(id);
  }, [ms]);
}
```
Refactor the ticker/clock components to use it. Slow the rotating tickers' cadence (e.g. `EmergencyBroadcast`, `SurvivalTip`, `LoadingMessage`) to a calmer interval.

- [ ] **Step 4: Prune dead ambient CSS loops** — remove `radar-ping`/`breathe`/`shimmer`/`hazard-scroll`/`pulse-glow` usages that are purely decorative (grep each; keep at most one compositor-safe instance). Leave the keyframes in `globals.css` for now (Task 6 prunes unused ones).

- [ ] **Step 5: Verify tests + render**

Run: `pnpm test`
Expected: PASS. Then load `/`, `/host`, `/bunkers/[id]`: pages are visibly calmer; no console errors.

- [ ] **Step 6: Commit**

```bash
git add src/components src/lib/hooks/useVisibleInterval.ts
git commit -m "perf: convert perpetual loops to interaction/in-view and pause intervals when hidden"
```

---

### Task 6: Motion-system discipline + CSS cleanup

**Why:** Replace scattered one-off animations with one scroll-reveal per section using the existing tokens, and remove now-unused keyframes/utilities.

**Files:**
- Modify: `src/app/globals.css` (remove unused keyframes/utility classes)
- Modify: section wrappers using per-element reveals (grep `ScrollReveal`, `StaggerItem`, inline `motion` in section bodies)

**Interfaces:**
- Produces: one reveal per major section; unused animation utilities removed.

- [ ] **Step 1: Enforce one reveal per section** — in `page.tsx` and other pages, ensure each major section animates in once as a unit (`ScrollReveal` around the section), not per child element. Remove redundant nested `StaggerItem`/`motion` where a section-level reveal suffices. Keep card hover-lift.

- [ ] **Step 2: Find unused animation utilities**

Run: for each of `animate-scanline animate-radar-ping animate-hazard-scroll animate-pulse-glow animate-shimmer animate-breathe animate-glitch animate-static-flicker`, `grep -rn "<name>" src` — list any with zero remaining usages.

- [ ] **Step 3: Remove the dead keyframes + utility classes** from `globals.css` for every animation confirmed zero-usage in Step 2. Leave `float-up`, `cursor-blink`, and anything still referenced.

- [ ] **Step 4: Verify build + tests**

Run: `pnpm test` then `./node_modules/.bin/next build` (or `pnpm build`).
Expected: build succeeds, no CSS referenced-but-missing, tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app
git commit -m "refactor: one reveal per section, prune unused animation utilities"
```

---

### Task 7: Image-grade unification

**Why:** The 53 AI PNGs vary in tone; a shared cheap treatment makes them read as one world.

**Files:**
- Create: `src/components/ui/GradedImage.tsx` (wraps `next/image` with a consistent overlay)
- Modify: `src/components/BunkerCard.tsx` and the bunker detail gallery to use `GradedImage` (or a shared CSS class)

**Interfaces:**
- Produces: `GradedImage` — same props as `next/image` plus optional `overlayClassName`; renders the image with a shared vignette + subtle palette duotone/grain overlay via CSS (no per-file reprocessing).

- [ ] **Step 1: Write a render test**

```tsx
// src/components/ui/GradedImage.test.tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GradedImage } from "./GradedImage";
describe("GradedImage", () => {
  it("renders an img with the source and an overlay layer", () => {
    const { container } = render(
      <GradedImage src="/images/bunker-vault.png" alt="Vault" width={400} height={300} />
    );
    expect(container.querySelector("img")).not.toBeNull();
    expect(container.querySelector("[data-grade-overlay]")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- GradedImage`
Expected: FAIL (module missing).

- [ ] **Step 3: Implement `GradedImage`**

```tsx
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
export function GradedImage({ overlayClassName, className, ...props }: ImageProps & { overlayClassName?: string }) {
  return (
    <span className="relative block overflow-hidden">
      <Image {...props} className={cn(className)} />
      <span
        data-grade-overlay
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          // vignette + subtle green/gold palette bias, static (no animation)
          "bg-[radial-gradient(circle_at_50%_40%,transparent_55%,rgba(5,5,5,0.55)_100%)]",
          "mix-blend-normal",
          overlayClassName,
        )}
      />
    </span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- GradedImage`
Expected: PASS.

- [ ] **Step 5: Apply at the main image sites** — swap `next/image` for `GradedImage` in `BunkerCard.tsx` and the bunker detail gallery (`src/components/bunker/BunkerDetailsContent.tsx` or wherever images render). Keep existing `sizes`/`priority`/`alt`. Do NOT touch avatars/icons.

- [ ] **Step 6: Manual verify** — bunker grid + detail: images read consistently graded, alt text intact, no layout shift.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/GradedImage.tsx src/components/ui/GradedImage.test.tsx src/components/BunkerCard.tsx src/components/bunker
git commit -m "feat: unify image grade with shared vignette/duotone overlay"
```

---

### Task 8: Perf/a11y verification + before/after

**Why:** Prove the redesign improved the numbers and violated no accessibility rule.

**Files:**
- Modify: `docs/superpowers/plans/baseline-metrics.md` (add "after" column)

**Interfaces:**
- Produces: documented before/after LCP/INP/CLS + a passing reduced-motion audit.

- [ ] **Step 1: After metrics** — with dev/build running, re-run Lighthouse on `/` and one bunker detail page; append the "after" numbers next to the Task 1 baseline in `baseline-metrics.md`. Target LCP < 1.5s, INP good, CLS ~0.

- [ ] **Step 2: Reduced-motion audit** — emulate `prefers-reduced-motion: reduce`; load `/`, `/host`, a detail page. Confirm: shader is a static frame, no ticker motion, no infinite loops. Note any violation and fix in the owning component.

- [ ] **Step 3: Headless screenshot proof** — capture `/` and one detail page via the browser tool; confirm both succeed and look calm/cinematic. Save images into the PR.

- [ ] **Step 4: Full test + build gate**

Run: `pnpm test` then `pnpm build` (or `./node_modules/.bin/next build`).
Expected: all green.

- [ ] **Step 5: Commit + open PR**

```bash
git add docs/superpowers/plans/baseline-metrics.md
git commit -m "docs: record before/after perf metrics for restraint redesign"
git push -u origin redesign/restraint-signature
```
Then open a PR with before/after Lighthouse + screenshots in the body.

---

## Self-Review

**Spec coverage:**
- Signature shader → Task 3. Restraint (global layers) → Task 4. Restraint (component loops + intervals) → Task 5. Motion-system discipline + CSS prune → Task 6. Image-grade + hero image config → Task 7 + Task 2. `pnpm.overrides` bug → Task 1. Perf/a11y + before/after Lighthouse + headless-screenshot proof → Task 1 (baseline) + Task 8. Non-goals respected (no 3D/video/case-study). All spec sections mapped.

**Placeholder scan:** Shader GLSL, WebGL boilerplate, tests, config, and the `useVisibleInterval` hook are all provided in full. The only intentionally repo-specific fill-in is the verbatim overrides map in Task 1 (values must be read from the current `package.json`) — flagged explicitly, not a hidden TODO.

**Type consistency:** `RadiationHazeCanvas` props `{ className?: string }` consistent (Task 3 defines, `page.tsx` consumes with no props). `ScrollIndicator` re-homed and re-imported consistently (Task 3). `GradedImage` extends `ImageProps` + `overlayClassName`, used the same way in Task 7. `useVisibleInterval(cb, ms)` signature consistent across Task 5 refactors.
