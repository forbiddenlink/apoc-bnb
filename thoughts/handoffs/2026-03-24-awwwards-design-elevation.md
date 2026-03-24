# Handoff: APOC-BNB Awwwards Design Elevation

## Goal
Elevate APOC-BNB from "good template" to expert-level, Awwwards-worthy design across ALL pages.

## Design Philosophy
**"Tactical Luxury Cinema"** - Every interaction feels like a high-budget post-apocalyptic film.

Three pillars:
1. **Tension & Release** - Build anticipation with reveals, scroll progression
2. **Environmental Storytelling** - UI reacts like bunker equipment (flickers, scan lines, static)
3. **Earned Delight** - Micro-interactions reward exploration

## What's DONE (Phases 1-2)

### Phase 1: Foundation ✅
- **Typography scale** in `globals.css`: display, h1-h3, body, label, mono tokens
- **Animation keyframes**: glitch, scanline, pulse-glow, radar-ping, cursor-blink, float-up, hazard-scroll, draw-line, shimmer, breathe
- **Utility classes**: animate-*, hover-lift, hover-glow, stagger-1 through stagger-8, transition-fast/normal/slow
- **Navbar** (`src/components/layout/Navbar.tsx`): Scroll shrink h-20→h-16, opacity/blur increase, bottom border glow, logo glitch on hover, nav link animated underlines, DEFCON tooltip with threat details + random flicker, CTA buttons with scan line + radar ping
- **Footer** (`src/components/layout/Footer.tsx`): Animated hazard stripes, pulsing status indicators, real-time "last check" timestamp, "SIGNAL LOST" easter egg (click logo 5x)
- **Page transitions**: `RouteProgress` component (green progress bar), `PageTransition` wrapper, `ScrollReveal`, `StaggerGrid`, `StaggerItem`

### Phase 2: Homepage ✅
- **Hero section**: `TypewriterText` component for headline, `AnimatedHeroBackground` with moving gradients + radar pulse + floating particles, `ScrollIndicator`
- **Search widget**: Delayed entrance (1.8s), animated HUD corners, scan line on search button
- **Featured bunkers**: Uses `StaggerGrid` for scroll-triggered stagger
- **BunkerCard** (`src/components/BunkerCard.tsx`): Choreographed hover (0ms border, 50ms corners expand, 100ms image scale, 150ms glow), grid background parallax
- **Stats banner**: Replaced with `CommandCenterStats` - animated counters, pulsing icons, scan line sweep, tactical card styling

### Phase 3: Bunker Details ✅
- **BookingWidget** (`src/components/booking/BookingWidget.tsx`): "Mission Briefing Console" - HUD corners, tactical styling, animated price, expandable cost breakdown, scan line CTA
- **BunkerDetailsContent** (`src/components/bunker/BunkerDetailsContent.tsx`):
  - Image gallery with thumbnails and active state
  - Host "Warlord Dossier" styling with CLASSIFIED stamp
  - `RadiationGauge` SVG component with animated needle
  - `SpecCard` components with corner accents
  - System Diagnostics panel
  - Contraband section with warning styling
  - All sections wrapped in `ScrollReveal`

## What's NOT DONE (Phases 4-6)

### Phase 4: Search & Discovery 🔴
**File**: `src/app/search/page.tsx`

Needs:
- Layout frame with "OPERATIONS CENTER ONLINE" border
- Filter panel as "Mission Parameters" with custom styled inputs
- Map as "Doomsday Radar" with dark Mapbox style, custom hex markers, pulse on update
- Results list with stagger, hover syncs with map marker
- Empty state: "SECTOR EMPTY" with radar animation

### Phase 5: Secondary Pages 🔴

**About page** (`src/app/about/page.tsx`):
- "Declassified Archives" styling
- Scroll-driven chapter reveals
- Horizontal timeline component
- Interactive zone map (SVG with hover tooltips)
- Document cards with torn edges, redacted reveals

**Host page** (`src/app/host/page.tsx`):
- "Recruitment Briefing" styling
- Staggered scroll benefits (each ~50vh)
- 3-step process with animated connecting line
- "ENLIST NOW" CTA with rotating dash border

**Profile page** (`src/app/profile/page.tsx`):
- "Survivor ID Card" styling
- Holographic shimmer effect
- Stats with animated counters
- Achievement badges grid

**Favorites page** (`src/app/favorites/page.tsx`):
- "Watchlist // Priority Targets" header
- Availability badges, price change indicators
- Remove with shrink animation

**Bookings page** (`src/app/bookings/page.tsx`):
- "Mission Log" tabs: UPCOMING, IN PROGRESS, COMPLETED, CANCELLED
- Countdown timers for upcoming
- Day counter for active

**Compare page** (`src/app/compare/page.tsx`):
- "Tactical Analysis" header
- Side-by-side radiation gauges
- Visual comparison bars
- Auto "winner" highlights

### Phase 6: Final Polish 🔴
- Sound system (off by default, toggle in footer)
- More easter eggs (Konami code, cursor trail)
- 404 page: "SIGNAL LOST" with static background
- Accessibility audit
- Performance optimization

## Key Files Reference

```
src/app/globals.css                    # Design tokens, animations
src/components/layout/Navbar.tsx       # ✅ Enhanced
src/components/layout/Footer.tsx       # ✅ Enhanced
src/components/ui/PageTransition.tsx   # ✅ New - animation wrappers
src/components/ui/RouteProgress.tsx    # ✅ New - route loading bar
src/components/ui/TypewriterText.tsx   # ✅ New - typewriter effect
src/components/ui/AnimatedHeroBackground.tsx  # ✅ New - hero bg
src/components/ui/CommandCenterStats.tsx      # ✅ New - stats section
src/components/BunkerCard.tsx          # ✅ Enhanced hover
src/components/booking/BookingWidget.tsx      # ✅ Enhanced - tactical
src/components/bunker/BunkerDetailsContent.tsx # ✅ Enhanced - diagnostics
src/app/page.tsx                       # ✅ Enhanced homepage
src/app/search/page.tsx                # 🔴 Needs work
src/app/about/page.tsx                 # 🔴 Needs work
src/app/host/page.tsx                  # 🔴 Needs work
src/app/profile/page.tsx               # 🔴 Needs work
```

## Design Plan Document
Full specs at: `docs/plans/2026-03-24-awwwards-design-elevation.md`

## How to Continue

1. Start with Search page - high traffic, currently very template-like
2. Then About page - rich lore content deserves scroll-driven treatment
3. Then remaining secondary pages
4. Apply `PageTransition`, `ScrollReveal`, `StaggerGrid` to all pages
5. Ensure consistent use of typography classes: `text-display`, `text-h1`, `text-h2`, `text-label`, `text-mono`
6. Use HUD corner accents on key containers
7. Add scan line effects on hover for interactive elements

## Commands
```bash
pnpm dev     # Start dev server
pnpm build   # Verify build
```

## Current Status
~55-60% complete. Core user flow (homepage → detail → booking) is good. Secondary pages still template-level.
