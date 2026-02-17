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
            className="inline-flex items-center gap-3 border-l-2 border-primary bg-primary/5 pl-4 pr-6 py-2 text-xs font-medium text-primary tracking-[0.2em] uppercase mb-8 sm:mb-12 backdrop-blur-sm"
          >
            <ShieldAlert className="h-4 w-4 animate-pulse" />
            <span>DEFCON 3: Weekends filling up fast</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white uppercase tracking-widest mb-6 sm:mb-8 leading-none"
          >
            Survival <br className="hidden sm:block" />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/50 text-glow-intense">Luxury</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 sm:mb-14 font-medium px-4 tracking-widest uppercase opacity-80">
              The world ended. Your standards didn&apos;t. <br className="hidden md:block" />
              Book verified fallout-free bunkers & orbital suites.
            </p>
          </motion.div>

          {/* -- SEARCH WIDGET -- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 p-2 sm:p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-1 relative group"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-primary/50 -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-primary/50 translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-primary/50 -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-primary/50 translate-x-1 translate-y-1" />

            <div className="flex-1 bg-white/5 p-4 hover:bg-white/10 transition-colors cursor-pointer border-r border-white/5 relative z-10 group/item">
              <div className="flex items-center gap-3 text-muted-foreground mb-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary/70 group-hover/item:text-primary transition-colors" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Location</span>
              </div>
              <input
                type="text"
                aria-label="Search bunker location"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className="font-light text-lg text-white bg-transparent border-none outline-none w-full placeholder:text-white/20"
                placeholder="SECTOR 7..."
              />
            </div>

            <div className="flex-1 bg-white/5 p-4 hover:bg-white/10 transition-colors cursor-pointer border-r border-white/5 relative z-10 group/item">
              <div className="flex items-center gap-3 text-muted-foreground mb-1.5">
                <Calendar className="h-3.5 w-3.5 text-secondary/70 group-hover/item:text-secondary transition-colors" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Timeline</span>
              </div>
              <div className="font-light text-lg text-white">Next Impact</div>
            </div>

            <div className="flex-[0.6] bg-white/5 p-4 hover:bg-white/10 transition-colors relative z-10 group/item">
              <div className="flex items-center gap-3 text-muted-foreground mb-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground group-hover/item:text-white transition-colors" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Personnel</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-light text-lg text-white">{searchParams.guests} Units</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Decrease number of survivors"
                    onClick={() => setSearchParams({ ...searchParams, guests: Math.max(1, searchParams.guests - 1) })}
                    className="h-6 w-6 rounded-none border border-white/20 hover:bg-white/10 hover:border-white text-white flex items-center justify-center transition-all"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    aria-label="Increase number of survivors"
                    onClick={() => setSearchParams({ ...searchParams, guests: searchParams.guests + 1 })}
                    className="h-6 w-6 rounded-none border border-white/20 hover:bg-white/10 hover:border-white text-white flex items-center justify-center transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <Button
              size="xl"
              variant="default"
              className="md:w-auto w-full min-h-[70px] md:min-h-0 text-lg tracking-widest relative z-10 rounded-none shadow-none hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
              onClick={handleSearch}
            >
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
        <section className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex items-end justify-between mb-12 pb-4 border-b border-white/10">
            <div>
               <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">Verified Locations</div>
               <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-white">
                 Trending <span className="text-muted-foreground">Havens</span>
               </h2>
            </div>
            
            <Button 
              variant="tactical" 
              className="hidden md:flex"
              onClick={() => router.push("/search")}
            >
              View Global Map
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
        {/* -- STATS BANNER -- */}
        <section className="py-24 border-y border-white/5 bg-black/60 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { value: "2,847", label: "Verified Bunkers", icon: Radiation, color: "text-primary" },
                { value: "99.9%", label: "Survival Rate", icon: ShieldAlert, color: "text-secondary" },
                { value: "12.5K", label: "Active Residents", icon: Users, color: "text-white" },
                { value: "0", label: "Breach Incidents", icon: ShieldAlert, color: "text-accent" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  <div className={`p-3 rounded-full bg-white/5 mb-4 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20`}>
                    <stat.icon className={`h-6 w-6 ${stat.color} opacity-80`} />
                  </div>
                  <span className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">
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
