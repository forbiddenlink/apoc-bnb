"use client";
import { Navbar } from "@/components/layout/Navbar";
import { GlitchText } from "@/components/ui/GlitchText";
import { Button } from "@/components/ui/button";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { SystemStatus } from "@/components/ui/SystemStatus";
import { FloatingStickers, SurvivorApprovedSticker } from "@/components/ui/WarningStickers";
import { SurvivalTip } from "@/components/ui/SurvivalTip";
import { GuestStories } from "@/components/features/GuestStories";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { Search, MapPin, Calendar, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { updateSearchFilters } = useAppStore();
  const { bunkers, isLoading } = useBunkers();
  const [searchParams, setSearchParams] = useState({
    location: "Anywhere (Rad-Free)",
    guests: 2,
  });

  const handleSearch = () => {
    updateSearchFilters({
      location: searchParams.location === "Anywhere (Rad-Free)" ? "" : searchParams.location,
      guests: searchParams.guests,
      radFree: true,
    });
    router.push("/search");
  };

  const featuredBunkers = bunkers.filter(b => b.rating >= 4.65).slice(0, 6);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans selection:bg-primary selection:text-black">
      {/* Scanline Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 scanline opacity-20"></div>

      <Navbar />

      <main className="relative pt-24 pb-20">
        {/* Floating Warning Stickers - subtle background decoration */}
        <FloatingStickers variant="hero" />

        {/* -- HERO SECTION -- */}
        <section className="relative container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center text-center z-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-pulse">
            <ShieldAlert className="h-4 w-4" />
            <span className="uppercase tracking-widest">DEFCON 3: Weekends filling up fast</span>
          </div>



          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 uppercase tracking-tighter mb-6 leading-[1.1]"
          >
            Survival is <GlitchText text="Luxury" className="text-primary text-glow" />.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium">
              The world ended. Your standards didn&apos;t. Book verified fallout-free bunkers, orbital suites, and hollowed-out mountains.
              Because when the world ends, you should be sipping
              vintage wine in a hermetically sealed vault.
            </p>
          </motion.div>

          {/* -- SEARCH WIDGET -- */}
          <div className="w-full max-w-4xl bg-card border border-border rounded-xl p-2 shadow-2xl flex flex-col md:flex-row gap-2 relative group hover:border-primary/50 transition-colors">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex-1 bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-primary/20">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xs uppercase font-bold tracking-wider">Safe Zone</span>
              </div>
              <input
                type="text"
                aria-label="Search bunker location"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className="font-semibold text-foreground bg-transparent border-none outline-none w-full"
                placeholder="Enter location..."
              />
            </div>

            <div className="w-px bg-border my-2 hidden md:block"></div>

            <div className="flex-1 bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-primary/20">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4 text-secondary" />
                <span className="text-xs uppercase font-bold tracking-wider">Check-in</span>
              </div>
              <div className="font-semibold text-foreground">Next Impact</div>
            </div>

            <div className="w-px bg-border my-2 hidden md:block"></div>

            <div className="flex-[0.5] bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-colors border border-transparent hover:border-primary/20">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <span className="text-xs uppercase font-bold tracking-wider">Survivors</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease number of survivors"
                  onClick={() => setSearchParams({ ...searchParams, guests: Math.max(1, searchParams.guests - 1) })}
                  className="h-6 w-6 rounded bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="font-semibold text-foreground">{searchParams.guests}</span>
                <button
                  type="button"
                  aria-label="Increase number of survivors"
                  onClick={() => setSearchParams({ ...searchParams, guests: searchParams.guests + 1 })}
                  className="h-6 w-6 rounded bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <Button 
              size="xl" 
              variant="neobrutal" 
              className="md:w-auto w-full h-full min-h-[60px] md:min-h-0 bg-primary hover:bg-primary-dim text-black font-black text-xl"
              onClick={handleSearch}
            >
              <Search className="h-6 w-6 mr-2" />
              SEARCH
            </Button>
          </div>

          {/* System Status Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <SystemStatus />
          </motion.div>

        </section>

        {/* -- FEATURED BUNKERS -- */}
        <section className="container mx-auto px-4 py-12 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
                <span className="w-2 h-8 bg-secondary block"></span>
                Trending Safe Havens
              </h2>
              <div className="hidden md:block">
                <SurvivorApprovedSticker size="sm" seed={77} />
              </div>
            </div>
            <Button 
              variant="link" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => router.push("/search")}
            >
              View all Bunkers →
            </Button>
          </div>

          {isLoading ? (
            <BunkerListSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBunkers.map((bunker, index) => (
                <BunkerCard
                  key={bunker.id}
                  bunker={bunker}
                  index={index}
                  variant={index === 0 ? "featured" : index === 5 ? "hazard" : "default"}
                />
              ))}
            </div>
          )}

          {/* Survival Tip */}
          <div className="mt-12 max-w-2xl mx-auto">
            <SurvivalTip />
          </div>
        </section>

        {/* -- GUEST HORROR STORIES -- */}
        <GuestStories />

      </main>
    </div>
  );
}
