---
date: 2026-02-09T18:16:08-08:00
session_name: general
researcher: Claude
git_commit: 19c59d5712a4a60a2d2dab5b843553e3e40607f7
branch: main
repository: apoc-bnb
topic: "APOC-BNB Codebase Improvements - Bug Fixes, Features, Content Enhancement"
tags: [next.js, react, content, theming, bug-fixes, accessibility, seo]
status: complete
last_updated: 2026-02-09
last_updated_by: Claude
type: implementation_strategy
root_span_id:
turn_span_id:
---

# Handoff: APOC-BNB Codebase Improvements

## Task(s)

### Completed
1. **Code Quality & Bug Fixes**
   - Fixed DoomsdayMap performance issue (6 redundant `.find()` calls)
   - Fixed BookingWidget currency display bug (total always showed CAPS)
   - Fixed FilterPanel state synchronization when modal reopens
   - Fixed Modal useEffect cleanup logic
   - Fixed pre-existing test failures (jest-dom setup, assertion fixes)
   - Cleaned up unused imports across codebase

2. **Accessibility Improvements**
   - Added `aria-label` to all search inputs
   - Added `type="button"` to increment/decrement buttons
   - Added `aria-pressed` states for currency toggles

3. **Image Diversity**
   - Replaced all repeating local images with unique Unsplash URLs
   - 6 bunkers now have 18 unique images total
   - 6 raids have 6 unique images
   - Configured `next.config.ts` for external images

4. **New Features Added**
   - Dynamic OG image generation (`opengraph-image.tsx`)
   - Dynamic favicon (`icon.tsx`) and Apple Touch Icon (`apple-icon.tsx`)
   - Twitter card image (`twitter-image.tsx`)
   - PWA manifest (`manifest.ts`)
   - SEO sitemap (`sitemap.ts`) and robots.txt (`robots.ts`)
   - Animated loading screen (`loading.tsx`)
   - Keyboard shortcuts system (press `?` to view)
   - DEFCON indicator in navbar (simulated threat level)
   - Confetti celebration on booking confirmation

5. **Content Enhancement (Apocalyptic Theme)**
   - Enhanced bunker long descriptions with lore, personality, dark humor
   - Added 10 detailed reviews with character voices and dark comedy
   - Enhanced raid descriptions with narrative depth, hazards, success rates
   - Updated RaidParty type to include `description` and `successRate` fields

### Planned/Not Started
- Host bios with detailed personalities
- AI chatbot bunker-specific responses
- World-building "About" page (The Event, zones, currency lore)
- Experiences page UI updates to show new raid fields
- Additional Easter eggs and hidden content

## Critical References
- `src/lib/data/bunkers.ts` - Main bunker data with enhanced descriptions
- `src/lib/data/raids.ts` - Raid data with new description/successRate fields
- `src/lib/data/reviews.ts` - Enhanced reviews with dark humor

## Recent changes

**Bug Fixes:**
- `src/components/map/DoomsdayMap.tsx:24-37` - Added memoized `selectedBunker`
- `src/components/booking/BookingWidget.tsx:7-26` - Fixed currency calculations
- `src/components/search/FilterPanel.tsx:3,14-18` - Fixed state sync
- `src/components/ui/Modal.tsx:16-30` - Improved useEffect cleanup

**New Features:**
- `src/app/opengraph-image.tsx` - Dynamic OG image
- `src/app/icon.tsx` - Dynamic favicon
- `src/app/apple-icon.tsx` - Apple touch icon
- `src/app/twitter-image.tsx` - Twitter card
- `src/app/manifest.ts` - PWA manifest
- `src/app/sitemap.ts` - SEO sitemap
- `src/app/robots.ts` - Robots.txt
- `src/app/loading.tsx` - Animated loading screen
- `src/components/ui/KeyboardShortcuts.tsx` - Keyboard nav (?, H, S, E, F)
- `src/components/ui/DefconIndicator.tsx` - Live threat indicator
- `src/components/ui/Confetti.tsx` - Booking celebration effect

**Content Updates:**
- `src/lib/data/bunkers.ts` - Enhanced longDescriptions for bunkers 1-4
- `src/lib/data/reviews.ts` - 10 reviews with dark humor
- `src/lib/data/raids.ts` - All 6 raids with descriptions/successRates
- `src/types/index.ts:63-74` - Added RaidParty fields

**Config:**
- `next.config.ts` - Added Unsplash image domain
- `vitest.config.mts` - Added test setup file
- `src/test/setup.ts` - jest-dom matchers

## Learnings

1. **This is a PARODY site** - User emphasized it's a fun/fake apocalyptic Airbnb, NOT a production app. Don't suggest auth/payments - enhance the THEME and HUMOR instead.

2. **Content > Features for this project** - The value is in immersive, funny copywriting, not technical features.

3. **Image reuse pattern** - Original codebase used only 3 images across 6 bunkers. Using Unsplash with unique URLs per bunker/raid solved this.

4. **Next.js 16 dynamic images** - `opengraph-image.tsx`, `icon.tsx` etc. auto-generate at request time. Very cool feature for showcasing skills.

5. **React hooks lint rules** - New React linting rules flag `setState` in effects. Refactored Confetti to use `useMemo` for piece generation instead.

## Post-Mortem

### What Worked
- **Explore agent for codebase understanding** - Gave comprehensive overview quickly
- **Code-reviewer agent** - Found specific bugs with line numbers
- **Parallel tool calls** - Reading multiple files simultaneously saved time
- **Unsplash for images** - Reliable, high-quality, themed images without local storage

### What Failed
- **Initially suggested auth/Stripe** - Wrong direction for a parody site. User correctly pushed back.
- **Confetti with useState in useEffect** - Triggered lint errors, had to refactor

### Key Decisions
- **Use external Unsplash URLs instead of local images**
  - Alternatives: Generate images, use placeholder service
  - Reason: High quality, themed, no storage needed

- **Dynamic OG/favicon generation instead of static files**
  - Alternatives: Static PNG files
  - Reason: Showcases Next.js skills, auto-updates with branding

- **Content-first improvements over technical features**
  - Alternatives: Add auth, database, payments
  - Reason: This is a parody site - humor and immersion matter more

## Artifacts

**New files created:**
- `thoughts/shared/handoffs/general/2026-02-09_18-16-08_apoc-bnb-improvements.md` (this file)
- `src/app/opengraph-image.tsx`
- `src/app/icon.tsx`
- `src/app/apple-icon.tsx`
- `src/app/twitter-image.tsx`
- `src/app/manifest.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/loading.tsx`
- `src/components/ui/KeyboardShortcuts.tsx`
- `src/components/ui/DefconIndicator.tsx`
- `src/components/ui/Confetti.tsx`
- `src/test/setup.ts`

**Modified files:**
- `src/lib/data/bunkers.ts` (enhanced descriptions)
- `src/lib/data/reviews.ts` (10 new reviews)
- `src/lib/data/raids.ts` (descriptions, successRates)
- `src/types/index.ts` (RaidParty fields)
- `src/components/map/DoomsdayMap.tsx` (performance fix)
- `src/components/booking/BookingWidget.tsx` (currency fix, confetti)
- `src/components/search/FilterPanel.tsx` (state sync fix)
- `src/components/ui/Modal.tsx` (cleanup fix)
- `src/components/layout/Navbar.tsx` (DefconIndicator)
- `src/app/layout.tsx` (metadata, KeyboardShortcuts)
- `src/app/page.tsx` (accessibility)
- `src/app/bunkers/[id]/page.tsx` (BookingWidget props)
- `next.config.ts` (Unsplash domain)
- `vitest.config.mts` (setup file)

## Action Items & Next Steps

### High Priority (Content)
1. **Add host bios** - Each host needs personality, quirks, house rules
   - File: `src/lib/data/bunkers.ts` - expand `host.bio` field

2. **Enhance AI chatbot** - Add bunker-specific and raid-specific responses
   - File: `src/lib/apocAiResponses.ts`

3. **Update Experiences page UI** - Show new `description` and `successRate` fields
   - File: `src/app/experiences/page.tsx`

### Medium Priority (World-Building)
4. **Create About/Lore page** - Explain "The Event", zones, CAPS currency, timeline
   - Create: `src/app/about/page.tsx`

5. **Add region-specific details** - Make locations feel real with backstory
   - Update location names in `bunkers.ts`

### Nice to Have
6. **Easter eggs** - Hidden content, konami code, secret pages
7. **Banned items list** - Funny restrictions per bunker
8. **Horror Stories section** - "Verified Incidents" reviews

## Other Notes

### Project Context
This is a **parody/portfolio project** - a fake post-apocalyptic Airbnb. The goal is:
- Showcase Next.js/React skills
- Be funny and immersive
- NOT be a real production app

### Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- Zustand 5 (state)
- Vitest (testing)

### Running the Project
```bash
npm run dev    # Development
npm run build  # Production build
npm run test   # Run tests (npx vitest run)
npm run lint   # ESLint
```

### Key Directories
- `src/lib/data/` - Mock data (bunkers, reviews, raids)
- `src/components/` - React components
- `src/app/` - Next.js pages and routes
- `public/images/` - Original local images (now mostly unused)
