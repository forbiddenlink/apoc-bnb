"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { GlitchText } from "@/components/ui/GlitchText";
import { Button } from "@/components/ui/button";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { SystemStatus } from "@/components/ui/SystemStatus";
import { FloatingStickers, SurvivorApprovedSticker } from "@/components/ui/WarningStickers";
import { SurvivalTip } from "@/components/ui/SurvivalTip";
import { GuestStories } from "@/components/features/GuestStories";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { Search, MapPin, Calendar, ShieldAlert, Radiation, Users } from "lucide-react";
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
    <div className="min-h-screen bg-background relative overflow-hidden font-sans noise-overlay">
      {/* Scanline Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 scanline opacity-15"></div>

      <Navbar />

      <main className="relative pt-24 pb-20 md:pb-20 pb-mobile-nav">
        {/* Floating Warning Stickers - subtle background decoration */}
        <FloatingStickers variant="hero" />

        {/* -- HERO SECTION -- */}
        <section className="relative container mx-auto px-4 py-12 sm:py-20 lg:py-32 flex flex-col items-center text-center z-10">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6 sm:mb-8"
          >
            <ShieldAlert className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
            <span className="uppercase tracking-widest">DEFCON 3: Weekends filling up fast</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 uppercase tracking-tighter mb-4 sm:mb-6 leading-[1.1]"
          >
            Survival is <GlitchText text="Luxury" className="text-primary text-glow-intense" />.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 font-medium px-2">
              The world ended. Your standards didn&apos;t. Book verified fallout-free bunkers, orbital suites, and hollowed-out mountains.
            </p>
          </motion.div>

          {/* -- SEARCH WIDGET -- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl bg-card border border-border rounded-xl p-2 sm:p-3 shadow-2xl flex flex-col md:flex-row gap-2 relative group hover:border-primary/50 transition-colors"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex-1 bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-primary/20 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider">Safe Zone</span>
              </div>
              <input
                type="text"
                aria-label="Search bunker location"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className="font-semibold text-sm sm:text-base text-foreground bg-transparent border-none outline-none w-full"
                placeholder="Enter location..."
              />
            </div>

            <div className="w-px bg-border my-2 hidden md:block"></div>

            <div className="flex-1 bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-primary/20 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4 text-secondary" />
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider">Check-in</span>
              </div>
              <div className="font-semibold text-sm sm:text-base text-foreground">Next Impact</div>
            </div>

            <div className="w-px bg-border my-2 hidden md:block"></div>

            <div className="flex-[0.5] bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-colors border border-transparent hover:border-primary/20 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground mb-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider">Survivors</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease number of survivors"
                  onClick={() => setSearchParams({ ...searchParams, guests: Math.max(1, searchParams.guests - 1) })}
                  className="h-7 w-7 rounded-md bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold transition-colors"
                >
                  -
                </button>
                <span className="font-semibold text-foreground min-w-[1.5rem] text-center">{searchParams.guests}</span>
                <button
                  type="button"
                  aria-label="Increase number of survivors"
                  onClick={() => setSearchParams({ ...searchParams, guests: searchParams.guests + 1 })}
                  className="h-7 w-7 rounded-md bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              size="xl"
              variant="neobrutal"
              className="md:w-auto w-full min-h-[52px] md:min-h-0 text-base sm:text-xl relative z-10"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
              SEARCH
            </Button>
          </motion.div>

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

        {/* -- STATS BANNER -- */}
        <section className="py-16 border-y border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "2,847", label: "Verified Bunkers", icon: Radiation },
                { value: "98.7%", label: "Survival Rate", icon: ShieldAlert },
                { value: "12.5K", label: "Happy Survivors", icon: Users },
                { value: "0", label: "Mutant Incidents", icon: Radiation },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="h-6 w-6 text-primary mb-3 opacity-60" />
                  <span className="text-3xl md:text-4xl font-black text-foreground mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
