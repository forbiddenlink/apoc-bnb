# APOC-BNB: Awwwards Design Elevation

**Design Philosophy**: Tactical Luxury Cinema
**Goal**: Elevate from "good template" to award-winning experience
**Approach**: Bold & expressive animations, full experience elevation

---

## Design Pillars

### 1. Tension & Release
Build anticipation with loading states, reveals, and scroll progression. Neon green "activates" elements; gold signals safety/luxury achieved.

### 2. Environmental Storytelling
UI elements react like they're in a bunker: flickers, scan lines on hover, static interference on transitions, radiation meters that pulse.

### 3. Earned Delight
Micro-interactions reward exploration. Hover a bunker card? HUD corners animate inward. Complete a booking? Confetti is fallout particles.

---

## Motion Principles

| Context | Treatment |
|---------|-----------|
| Page transitions | Glitch/static effect (200ms) between routes |
| Scroll reveals | Fade up with Y-translation, 50ms stagger |
| Hover states | Respond <100ms, scale(1.02) + glow intensify |
| Loading states | Pulsing scan line, never static spinners |

---

## Wave 1: Global Foundation

### Typography Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display` | 6xl-9xl | 200 | Hero headlines only |
| `h1` | 4xl-5xl | 700 | Page titles |
| `h2` | 2xl-3xl | 600 | Section headers |
| `h3` | xl | 600 | Card titles |
| `body` | base | 400 | Primary content |
| `body-sm` | sm | 400 | Secondary content |
| `label` | xs | 500, uppercase, tracking-widest | Tags, metadata |
| `mono` | sm | Geist Mono | Data, coordinates |

### Spacing System

- Section padding: `py-24` (desktop), `py-16` (mobile)
- Card gaps: `gap-6` standard, `gap-8` featured grids
- Component padding: `p-6` cards, `p-4` compact elements
- Line heights: `leading-none` headings, `leading-relaxed` body

### Navbar Upgrades

1. **Scroll behavior**: Shrinks h-20→h-16, opacity 80%→95%, blur intensifies, bottom border gains green glow
2. **Logo interaction**: "APOC" glitches on hover (2-3 frames), "BNB" pulses gold
3. **Nav links**: Underline animates from left, active link has glow pulse
4. **DEFCON Indicator**: Interactive tooltip with threat level, occasional flicker (every 60s)
5. **CTA button**: Scan line sweeps every 5s, hover expands glow like radar ping

### Footer Upgrades

1. **Warning banner**: Hazard stripes animate (diagonal scroll), text glitches
2. **Status indicators**: Green dots pulse, "Last system check: 3m ago" updates real-time
3. **Easter egg**: Logo 5x click triggers "SIGNAL LOST" blackout (500ms)

---

## Wave 2: Homepage

### Hero Section

**Background**:
- Animated grain overlay (existing)
- Slow-moving radial gradient (30s cycle)
- Grid lines pulse outward every 10s (radar ping)

**Headline animation**:
- Typewriter effect (40ms/char)
- Cursor blinks twice then disappears
- "STYLE" in gold gradient

**Search widget**:
- 800ms delay entrance
- Slides up with scale 0.95→1.0
- Border glows green on arrival

**Scroll indicator**:
- Bouncing chevron
- "SCROLL TO EXPLORE" in mono
- Fades after 100px scroll

**Atmospheric**: 2-3 floating dust/ash particles

### Featured Bunkers Grid

**Entrance**:
- Header slides from left, underline draws itself
- Cards stagger in (100ms delay each)
- Start at opacity-0, translateY(30px)

**Card hover choreography**:
- 0ms: Border shifts to primary green
- 50ms: HUD corners animate inward 4px
- 100ms: Image scales to 1.05
- 150ms: Glow intensifies
- Grid pattern scrolls on hover

**Enhancements**:
- Price flickers on render (mono font)
- Rating stars fill sequentially (50ms each)
- Tags pulse on hover
- Featured variant: spans 2 columns, "EDITOR'S PICK" badge

### Stats Banner → Command Center Status Strip

- Full-width segmented bar
- Icons pulse, numbers count up on scroll (1500ms)
- Labels in mono: "ACTIVE BUNKERS", "SURVIVORS HOUSED", "CAPS EXCHANGED"
- Scan line sweeps every 8s
- Subtle hazard stripe background (5% opacity)

### Guest Stories → Survivor Transmissions

**Visual frame**:
- CRT screen curve effect
- Scan lines at 20% opacity
- Corner timestamp: "REC ● 2087.03.24 // 14:32:07" (real-time)

**Story cards**:
- Avatar has static overlay
- Quote types out when active (30ms/char)
- Stars load with flicker

**Navigation**:
- Rectangular "frequency bars" instead of dots
- Auto-advance 6s with progress bar
- Transition: static burst (100ms), then typewriter

### Trending → Live Intel Feed

- Header: "TRENDING // LIVE" with pulsing red dot
- Horizontal scroll (feels like data ticker)
- Narrower, info-dense cards
- "Views in 24h" with trending arrow
- Ambient auto-scroll when idle

---

## Wave 3: Bunker Detail Pages

### Image Gallery

**Hero image**:
- 60vh height
- Ken Burns effect (slow zoom/pan, 20s loop)
- Bottom gradient overlay
- Title/location overlaid on image

**Thumbnail strip**:
- Horizontal scroll
- Active: green border + lift
- Hover: "VIEW" overlay with scan

**Lightbox**:
- Scale-up from thumbnail position
- Pulsing nav arrows
- "03 / 12" counter (mono)
- Keyboard support with visual feedback

**Loading**: Blur-up placeholders, scan line skeleton, "SIGNAL LOST" for broken

### Specs → Bunker Diagnostics Panel

**Container**: Diagnostic readout frame, "SYSTEM DIAGNOSTICS" header with cursor

**Radiation gauge**:
- Animated semicircle with needle
- Colors: green→yellow→orange→red by level
- Geiger sound toggle (off by default)

**Security rating**:
- 5 shields fill sequentially (200ms stagger)
- Filled shields glow
- Hover tooltip with details

**Data rows**:
- Left: label (mono, muted), Right: value (bold)
- Values count up on view
- Animated icons (spinning turbine, water ripple)

### Amenities → Survival Features Grid

- 3-column icon grid (2 mobile)
- Available: full opacity, glow on hover
- Unavailable: 30% opacity, "OFFLINE" badge
- Premium amenities: gold border, "RARE" shimmer tag
- Icons in hex containers, bounce on hover

### Banned Items

- "CONTRABAND // DO NOT BRING" header
- Typewriter reveal on scroll
- Prohibited icon per item
- Shake animation on hover

### Host Profile → Warlord Dossier

**Frame**: Classified file styling, "CLASSIFIED" stamp

**Avatar**:
- 120px, vignette border
- Superhost badge rotates/scales in
- Static flicker on hover

**Quirk styling by type**:
- Military: rigid borders
- Dangerous: red glow edges
- Eccentric: 1-2deg tilt

**Stats**: Response time types out, rate has mini progress bar

### Reviews → Survivor Reports

**Header**:
- Count animates up
- Overall rating large, stars fill in
- Breakdown bars animate widths

**Cards**: Field report styling, "VERIFIED SURVIVOR" badge, expandable

**Filtering**: Chips with glow, fade/stagger on change

**Highlights**: Auto-extracted phrases as glowing tags

### Booking Widget → Mission Briefing Console

**Container**: Sticky, thick border, animated HUD corners, lock icon header

**Price**: Large with CAPS icon, BTC below, pulses green on view

**Date picker**:
- Labels: "ARRIVAL DATE", "EXTRACTION DATE"
- Dark calendar, green highlights
- "OCCUPIED" on unavailable hover
- Night count display

**Guests**: "SURVIVORS IN PARTY", glowing stepper, capacity warning

**Breakdown**: Expandable, items slide in, total line draws itself

**CTA**:
- "INITIATE BOOKING"
- Scan line sweep on hover
- Depresses + "PROCESSING..." on click
- Success: green transform + checkmark

---

## Wave 4: Search & Discovery

### Layout

- Full viewport height, scroll inside panels
- Green border frame: "OPERATIONS CENTER ONLINE"
- Top bar: search summary
- Drag handle between panels (desktop)
- Mobile: animated flip between list/map

### Filter Panel → Mission Parameters

**Price slider**: Hex handles, glowing track, real-time values

**Rating**: Interactive stars, preview on hover

**Toggles**: Custom switch, green glow when on

**Capacity**: Segmented buttons

**Active filters**: Removable pills with shrink animation

**Apply**: "EXECUTE SEARCH" with radar ping, count animates

### Map → Doomsday Radar

**Styling**:
- Dark Mapbox style
- Grid overlay
- Zone boundaries visible
- Subtle radar sweep

**Markers**:
- Custom hexagon icons
- Color by availability
- Pulse on results update
- Cluster with expanding ring

**Interactions**:
- Hover: scale 1.3, mini preview card appears
- Click: zoom + center, expanded preview
- Custom zoom buttons (hexagonal)

**Bonus**: Radiation heat map toggle

### Results List → Target Acquisition List

**Header**: "23 TARGETS ACQUIRED", animated count, segmented sort

**Cards**:
- Hover syncs with map marker
- Click pans map
- Active highlight

**Loading**: Skeleton with scan line, "SCANNING FOR HAVENS..."

**Quick actions**: Favorite burst, compare checkmark, floating compare bar

---

## Wave 5: Secondary Pages

### About → Declassified Archives

- Full-width immersive sections
- Progress indicator with chapter dots
- "CLASSIFIED // NOW DECLASSIFIED" stamp animation
- Horizontal scrolling timeline
- Interactive zone map (SVG, hover tooltips)
- Animated CAPS coin
- Document cards with torn edges, tilt on hover, redacted reveals

### Host Page → Recruitment Briefing

- "CLAIM YOUR TERRITORY" dramatic hero
- Staggered scroll benefits (50vh each)
- 3-step process with drawing connection line
- Gold-accented host testimonials
- "ENLIST NOW" with rotating dash border

### Profile → Survivor ID Card

- Laminated badge styling with holographic shimmer
- Stats count up with sparklines
- Achievement badges (earned glow, locked silhouette)
- "SYSTEM ACCESS" action panel

### Favorites → Watchlist

- "YOUR WATCHLIST" with availability badges
- Price change indicators
- Remove with shrink animation
- Notification toggle prompt

### Bookings → Mission Log

**Tabs**: UPCOMING, IN PROGRESS, COMPLETED, CANCELLED

**Upcoming**: Countdown (real-time), pre-arrival checklist

**Active**: "MISSION ACTIVE" pulse, day counter, extend CTA

**Completed**: "MISSION COMPLETE" stamp, review CTA glows

**Cancelled**: Dim, strikethrough, rebook suggestion

### Compare → Tactical Analysis

- Sticky bunker headers
- Collapsible row categories
- Visual comparisons (gauges, bar charts)
- Auto "winner" highlights
- "RECOMMENDED" badge
- Sticky footer with book CTAs

---

## Wave 6: Global Polish

### Page Transitions

1. Fade to black (150ms) with static burst
2. Progress bar / "LOADING..." types
3. Fade in (200ms)
4. Back nav: slide from left

### Scroll Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Headings | Fade up + Y translate | 20% viewport |
| Cards | Fade up, 80ms stagger | 10% viewport |
| Images | Fade + scale 1.02→1 | 10% viewport |
| Stats | Count up | 50% viewport |
| Dividers | Draw left→right | 30% viewport |
| Badges | Pop + bounce | Parent visible |

### Cursor (optional)

- Default: crosshair
- Interactive: expanding circle
- Click: contract feedback
- Toggle in settings

### Focus & Selection

- Green glow focus rings
- Selection: green at 30% opacity
- Skip-to-content link

### Sound (off by default)

- Clicks: Geiger tick
- Hover: quiet hum
- Success: confirmation beep
- Errors: warning tone
- Transitions: static burst
- Toggle in footer

### Easter Eggs

- **Terminal**: Footer "©" 3x reveals access, success unlocks badge
- **Konami Code**: "SECURITY BREACH" animation, reveals Bunker Zero
- **Cursor trail**: Type "RADGLOW" anywhere
- **404**: "SIGNAL LOST", static background, click static 10x for coordinates

---

## Implementation Order

### Phase 1: Foundation (globals.css, layout)
- [ ] Typography scale CSS variables
- [ ] Spacing standardization
- [ ] Navbar scroll behavior + interactions
- [ ] Footer animations + easter egg
- [ ] Page transition wrapper component

### Phase 2: Homepage
- [ ] Hero animations (typewriter, parallax, particles)
- [ ] Search widget entrance
- [ ] Featured grid stagger + card hover choreography
- [ ] Stats banner → Command Center
- [ ] Guest Stories → Survivor Transmissions
- [ ] Trending → Live Intel Feed

### Phase 3: Bunker Details
- [ ] Image gallery with lightbox
- [ ] Specs → Diagnostics Panel with gauges
- [ ] Amenities grid + Banned Items
- [ ] Host → Warlord Dossier
- [ ] Reviews → Survivor Reports
- [ ] Booking → Mission Briefing Console

### Phase 4: Search
- [ ] Layout frame + transitions
- [ ] Filter panel redesign
- [ ] Map styling + custom markers
- [ ] Results list enhancements

### Phase 5: Secondary Pages
- [ ] About page scroll experience
- [ ] Host page benefits sequence
- [ ] Profile ID card styling
- [ ] Favorites/Bookings/Compare polish

### Phase 6: Polish
- [ ] Scroll animation system (reusable)
- [ ] Loading skeletons standardized
- [ ] Sound system (optional)
- [ ] Easter eggs
- [ ] Accessibility audit
- [ ] Performance optimization

---

## Technical Notes

### Animation Library
Use Framer Motion (already installed) for:
- Page transitions (AnimatePresence)
- Scroll-triggered animations (useInView)
- Gesture handling (hover, tap)
- Layout animations

### Performance
- `will-change` sparingly
- Only animate `transform` and `opacity`
- Respect `prefers-reduced-motion`
- Lazy load below-fold content

### Accessibility
- All animations respect reduced motion
- Focus states on all interactive elements
- Keyboard navigation throughout
- Sound off by default, toggle available
