"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Calendar, ShieldAlert, Users } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { SystemStatus } from "@/components/ui/SystemStatus";
import { FloatingStickers } from "@/components/ui/WarningStickers";
import { SurvivalTip } from "@/components/ui/SurvivalTip";
import { GuestStories } from "@/components/features/GuestStories";
import { MissionBriefing } from "@/components/features/MissionBriefing";
import { AnimatedHeroBackground, ScrollIndicator } from "@/components/ui/AnimatedHeroBackground";
import { CommandCenterStats } from "@/components/ui/CommandCenterStats";
import { IncidentCounter } from "@/components/ui/IncidentCounter";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { PageTransition, ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ui/PageTransition";

import { useBunkers } from "@/lib/hooks/useBunkers";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

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
            location:
                searchParams.location === "Anywhere (Rad-Free)"
                    ? ""
                    : searchParams.location,
            guests: searchParams.guests,
            radFree: true,
        });
        router.push("/search");
    };

    const featuredBunkers = bunkers.filter((b) => b.rating >= 4.65).slice(0, 6);

    return (
        <PageTransition className="min-h-screen bg-background relative overflow-hidden font-sans">
            {/* Scanline Effect Overlay */}
            <div className="pointer-events-none fixed inset-0 z-40 scanline opacity-15" />

            <Navbar />

            <main id="main-content" className="relative pt-24 pb-mobile-nav md:pb-20">
                {/* Floating Warning Stickers */}
                <FloatingStickers variant="hero" />

                {/* -- HERO SECTION -- */}
                <section className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-32 flex flex-col items-center text-center z-10 min-h-[90vh] justify-center">
                    {/* Animated Background */}
                    <AnimatedHeroBackground />

                    {/* Brand + alert */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-6 sm:mb-8 flex flex-col items-center gap-4"
                    >
                        <p className="font-mono text-sm sm:text-base tracking-[0.35em] text-primary uppercase">
                            APOC-BNB
                        </p>
                        <div className="inline-flex items-center gap-3 border-l-2 border-primary bg-primary/5 pl-4 pr-6 py-2 text-xs font-medium text-primary tracking-[0.2em] uppercase backdrop-blur-sm">
                            <ShieldAlert className="h-4 w-4 animate-pulse" />
                            <span>DEFCON 3: Weekends filling up fast</span>
                        </div>
                    </motion.div>

                    {/* Hero Headline with Typewriter */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-display text-white mb-6 sm:mb-8 leading-none"
                    >
                        <TypewriterText
                            text="SURVIVE IN"
                            speed={50}
                            delay={500}
                            showCursor={false}
                        />
                        <br className="hidden sm:block" />{" "}
                        <span className="font-bold text-gold-gradient">
                            <TypewriterText
                                text="STYLE"
                                speed={60}
                                delay={1200}
                                showCursor={false}
                            />
                        </span>
                    </motion.h1>

                    {/* Subheadline — what this actually is */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        <p className="text-body text-white/90 max-w-2xl mx-auto mb-3 px-4 text-base sm:text-lg leading-relaxed">
                            The world&apos;s first (and last) rental marketplace for bunkers,
                            vaults, and fortified hideouts. Airbnb energy. Fallout aesthetic.
                            Bottle caps accepted.
                        </p>
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-10 sm:mb-14 px-4 tracking-[0.15em] uppercase opacity-80">
                            The world ended. Your standards didn&apos;t.
                        </p>
                    </motion.div>

                    {/* -- SEARCH WIDGET -- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "w-full max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 p-2",
                            "shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-1 relative group",
                            "hover:border-primary/20 transition-colors duration-500"
                        )}
                    >
                        {/* HUD Corner Accents */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.2 }}
                            className="absolute top-0 left-0 w-4 h-4 border-l border-t border-primary/50 -translate-x-1 -translate-y-1"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.3 }}
                            className="absolute top-0 right-0 w-4 h-4 border-r border-t border-primary/50 translate-x-1 -translate-y-1"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.4 }}
                            className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-primary/50 -translate-x-1 translate-y-1"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-primary/50 translate-x-1 translate-y-1"
                        />

                        {/* Location Input */}
                        <div className="flex-1 bg-white/5 p-4 hover:bg-white/10 transition-colors cursor-pointer border-r border-white/5 relative z-10 group/item">
                            <div className="flex items-center gap-3 text-muted-foreground mb-1.5">
                                <MapPin className="h-3.5 w-3.5 text-primary/70 group-hover/item:text-primary transition-colors" />
                                <span className="text-label">Location</span>
                            </div>
                            <input
                                type="text"
                                aria-label="Search bunker location"
                                value={searchParams.location}
                                onChange={(e) =>
                                    setSearchParams({ ...searchParams, location: e.target.value })
                                }
                                className="font-light text-lg text-white bg-transparent border-none outline-none w-full placeholder:text-white/20"
                                placeholder="SECTOR 7..."
                            />
                        </div>

                        {/* Timeline */}
                        <div className="flex-1 bg-white/5 p-4 border-r border-white/5 relative z-10 group/item">
                            <div className="flex items-center gap-3 text-muted-foreground mb-1.5">
                                <Calendar className="h-3.5 w-3.5 text-secondary/70" />
                                <span className="text-label">Timeline</span>
                            </div>
                            <div className="font-light text-lg text-white/50">Next Impact</div>
                        </div>

                        {/* Personnel */}
                        <div className="flex-[0.6] bg-white/5 p-4 hover:bg-white/10 transition-colors relative z-10 group/item">
                            <div className="flex items-center gap-3 text-muted-foreground mb-1.5">
                                <Users className="h-3.5 w-3.5 text-muted-foreground group-hover/item:text-white transition-colors" />
                                <span className="text-label">Personnel</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-light text-lg text-white">
                                    {searchParams.guests} Units
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        aria-label="Decrease number of survivors"
                                        onClick={() =>
                                            setSearchParams({
                                                ...searchParams,
                                                guests: Math.max(1, searchParams.guests - 1),
                                            })
                                        }
                                        className="h-6 w-6 rounded-none border border-white/20 hover:bg-white/10 hover:border-white text-white flex items-center justify-center transition-all active:scale-95"
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Increase number of survivors"
                                        onClick={() =>
                                            setSearchParams({
                                                ...searchParams,
                                                guests: Math.min(50, searchParams.guests + 1),
                                            })
                                        }
                                        className="h-6 w-6 rounded-none border border-white/20 hover:bg-white/10 hover:border-white text-white flex items-center justify-center transition-all active:scale-95"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <Button
                            size="xl"
                            variant="default"
                            className={cn(
                                "md:w-auto w-full min-h-[70px] md:min-h-0 text-lg tracking-widest relative z-10 rounded-none",
                                "shadow-none hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]",
                                "overflow-hidden group/btn"
                            )}
                            onClick={handleSearch}
                        >
                            {/* Scan line effect */}
                            <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                <span className="absolute inset-0 translate-y-full group-hover/btn:translate-y-[-100%] transition-transform duration-700 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                            </span>
                            <span className="relative z-10">SEARCH</span>
                        </Button>
                    </motion.div>

                    {/* System Status — desktop only; too dense for mobile hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 }}
                        className="mt-12 hidden md:block"
                    >
                        <SystemStatus />
                    </motion.div>

                    {/* Scroll Indicator */}
                    <ScrollIndicator />
                </section>

                {/* -- WHAT THIS IS -- */}
                <MissionBriefing />

                {/* -- FEATURED BUNKERS -- */}
                <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                    <ScrollReveal>
                        <div className="flex items-end justify-between mb-12 pb-4 border-b border-white/10">
                            <div>
                                <div className="text-label text-secondary mb-2">
                                    Verified Locations · Rad-Checked
                                </div>
                                <h2 className="text-h1 text-white">
                                    Trending{" "}
                                    <span className="text-muted-foreground font-light">
                                        Havens
                                    </span>
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                                    Hand-picked shelters with working blast doors and hosts who
                                    (usually) respond on the radio.
                                </p>
                            </div>

                            <Button
                                variant="tactical"
                                className="hidden md:flex"
                                onClick={() => router.push("/search")}
                            >
                                View Global Map
                            </Button>
                        </div>
                    </ScrollReveal>

                    {isLoading ? (
                        <BunkerListSkeleton count={6} />
                    ) : (
                        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredBunkers.map((bunker, index) => (
                                <StaggerItem key={bunker.id}>
                                    <BunkerCard
                                        bunker={bunker}
                                        index={index}
                                        variant={
                                            index === 0
                                                ? "featured"
                                                : index === 5
                                                    ? "hazard"
                                                    : "default"
                                        }
                                    />
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                    )}

                    {/* Survival Tip */}
                    <ScrollReveal delay={0.3}>
                        <div className="mt-12 max-w-2xl mx-auto">
                            <SurvivalTip />
                        </div>
                    </ScrollReveal>
                </section>

                {/* -- GUEST HORROR STORIES -- */}
                <GuestStories />

                {/* -- COMMAND CENTER STATS -- */}
                <CommandCenterStats />

                <div className="container mx-auto px-4 pb-12 flex justify-center">
                    <IncidentCounter />
                </div>
            </main>

            <Footer />
            <MobileBottomNav />
        </PageTransition>
    );
}
