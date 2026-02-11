# APOC-BNB ☢️

> **"Survival is Luxury."**

The world's first (and last) premium rental platform for the post-apocalyptic elite. Book verified fallout-free bunkers, orbital suites, and hollowed-out mountains with your hard-earned Bottle Caps.

![Hero Image](./public/images/hero-bunker.png)

## 🌟 Features

### Core Features
* **14 Unique Bunker Locations**: From underwater research stations to prison suites to school bus caravans
* **Hilarious Host Characters**: Each location run by memorable survivors with personality (Captain Nemo/Dave, Karen the Warlord, Dr. Glow, etc.)
* **Doomsday Map**: Interactive fallout zones using Mapbox with multiple bunker markers, color-coded by radiation level
* **Dynamic Pricing**: Currency automatically converts between BTC and Bottle Caps (CAPS)
* **Survivalist Verified**: "Superhost" badges for "Rad-Free", "Mutant-Proof", and "Cannibal-Free" listings
* **Apoc-AI Chatbot**: An intelligent concierge that cares (mostly about your survival) with context-aware responses
* **Raid Parties**: Book guided looting tours with local Warlords - 6 unique experiences available
* **Advanced Search & Filters**: Filter by price, rating, radiation level, and amenities
* **Favorites System**: Save your favorite bunkers with persistent storage
* **Real-time Booking**: Book bunkers with interactive pricing calculator
* **Reviews System**: Read verified survivor reviews and ratings

### Technical Features
* **State Management**: Zustand store with persistent favorites
* **Toast Notifications**: Beautiful toast system using Sonner
* **Error Boundaries**: Graceful error handling throughout the app
* **Loading States**: Skeleton loaders for better UX
* **Modal System**: Reusable modal component for filters and more
* **Mobile Responsive**: Full mobile menu drawer with hamburger navigation
* **API Routes**: RESTful API endpoints for bunkers data
* **Testing**: Vitest test suite with React Testing Library
* **TypeScript**: Fully typed with comprehensive interfaces
* **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Custom "Neobrutal Dystopian" Theme
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
* **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
* **Testing**: [Vitest](https://vitest.dev/) + React Testing Library
* **Maps**: [react-map-gl](https://visgl.github.io/react-map-gl/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **UI Components**: Custom components with Radix UI primitives

## 🚀 Getting Started

1. **Install Dependencies**:

    ```bash
    npm install
    ```

2. **Set Up Environment Variables**:

    Create a `.env.local` file:

    ```bash
    NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
    ```

    *(Note: The app will run in "Fallback Mode" without a token, showing a warning instead of the map.)*

3. **Run the Development Server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to confirm you are still alive.

4. **Run Tests**:

    ```bash
    npm run test
    # or
    npx vitest
    ```

5. **Build for Production**:

    ```bash
    npm run build
    npm start
    ```

## 📁 Project Structure

```
apoc-bnb/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── api/                  # API routes
│   │   │   └── bunkers/          # Bunker endpoints
│   │   ├── bunkers/[id]/         # Dynamic bunker detail pages
│   │   ├── experiences/          # Raid parties page
│   │   ├── favorites/            # Favorites page
│   │   ├── host/                 # Become a host page
│   │   ├── search/               # Search & filters page
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── booking/              # Booking widget
│   │   ├── chat/                 # AI chatbot
│   │   ├── layout/               # Navbar, mobile menu
│   │   ├── map/                  # Mapbox map component
│   │   ├── reviews/              # Review cards and lists
│   │   ├── search/               # Filter panel
│   │   ├── ui/                   # Reusable UI components
│   │   ├── BunkerCard.tsx        # Bunker listing card
│   │   └── ErrorBoundary.tsx     # Error boundary
│   ├── lib/
│   │   ├── data/                 # Mock data & utilities
│   │   │   ├── bunkers.ts        # Bunker data
│   │   │   ├── raids.ts          # Raid party data
│   │   │   └── reviews.ts        # Reviews data
│   │   ├── apocAiResponses.ts    # AI chatbot logic
│   │   ├── store.ts              # Zustand state management
│   │   └── utils.ts              # Utility functions
│   └── types/
│       └── index.ts              # TypeScript interfaces
├── public/
│   └── images/                   # Static assets
├── tests/                        # Test files
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary (Radioactive Green)**: `#39ff14` - Safe zones, primary actions
- **Secondary (Hazard Yellow)**: `#ffea00` - Warnings, ratings
- **Accent (Alert Red)**: `#ff003c` - Danger zones, alerts
- **Background**: `#0a0a0a` - Deep black
- **Card**: `#171717` - Surface elements
- **Muted**: `#262626` - Borders, disabled states

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code/data)
- **Headings**: Bold, uppercase, tight tracking
- **Body**: Readable with proper line-height

### Components
- **Neobrutal Buttons**: Bold shadows, no rounded corners
- **Glitch Text**: Animated glitch effect for emphasis
- **Cards**: Hover effects with border glow
- **Modals**: Full-screen overlays with blur backdrop

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Coverage includes:
- BookingWidget pricing calculations
- BunkerCard rendering
- GlitchText animation
- AI chatbot responses
- Store functionality

## 🗺️ Key Features Explained

### Dynamic Search & Filters
- Real-time filtering by price, rating, and radiation level
- Persistent filter state using Zustand
- Modal-based advanced filters
- Quick filters for common options

### Favorites System
- Click heart icon to save bunkers
- Persisted to localStorage via Zustand
- Dedicated favorites page
- Counter in navbar

### AI Chatbot
- Context-aware responses based on keywords
- Multiple response variations
- Typing delay simulation
- Expandable/collapsible interface

### Interactive Map
- Multiple markers color-coded by danger level
- Click markers to view bunker info
- Popup with quick details and link
- Legend and status overlay

### Booking Flow
- Interactive guest and night selectors
- Real-time price calculation
- Oxygen tax and protection fees
- Currency toggle (CAPS/BTC)
- Toast notifications on booking

## 🔮 Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Real database integration (Prisma + PostgreSQL)
- [ ] Payment processing (Stripe)
- [ ] Email notifications (Resend)
- [ ] Image uploads for hosts
- [ ] Calendar availability system
- [ ] Advanced search (dates, amenities)
- [ ] User profiles and badges
- [ ] Host dashboard
- [ ] Booking management
- [ ] More AI chatbot integrations
- [ ] Dark/light mode toggle
- [ ] Internationalization (i18n)

## 🎯 Credits

* **Design**: Inspired by the end of the world
* **Images**: AI Generated (Stable Diffusion / Midjourney style)
* **Theme**: Post-apocalyptic + Neobrutal + Y2K aesthetics
* **Sound Design**: (Coming soon) Geiger counters and alert sirens

## 📄 License

This project is a portfolio/demo project. Feel free to use it as inspiration for your own projects!

---

*No refunds if the nukes drop before check-in.*

**Stay rad-free, survivor.** ☢️
