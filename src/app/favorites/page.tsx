"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { Heart, Search, Radiation, Target, Crosshair } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
    const { favorites } = useAppStore();
    const { bunkers, isLoading } = useBunkers();

    const favoriteBunkers = bunkers.filter((bunker) =>
        favorites.includes(bunker.id)
    );

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-7xl">
                {/* Header - Watchlist // Priority Targets */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-accent" />
                        <span className="text-label text-accent">WATCHLIST // PRIORITY TARGETS</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-h1 font-black uppercase tracking-tight mb-2 flex items-center gap-3">
                                <div className="p-2 bg-accent/10 rounded border border-accent/30">
                                    <Heart className="h-8 w-8 text-accent fill-current" />
                                </div>
                                Your Favorites
                            </h1>
                            <p className="text-muted-foreground">
                                {favoriteBunkers.length > 0
                                    ? <><span className="text-accent font-bold">{favoriteBunkers.length}</span> shelter{favoriteBunkers.length === 1 ? '' : 's'} marked for potential acquisition</>
                                    : 'No targets acquired yet'}
                            </p>
                        </div>
                        {favoriteBunkers.length > 0 && (
                            <div className="text-mono text-xs text-muted-foreground flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                MONITORING ACTIVE
                            </div>
                        )}
                    </div>
                </motion.div>

                {isLoading ? (
                    <BunkerListSkeleton count={favorites.length || 4} />
                ) : favoriteBunkers.length > 0 ? (
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {favoriteBunkers.map((bunker, index) => (
                                <motion.div
                                    key={bunker.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <BunkerCard bunker={bunker} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="text-center py-16 md:py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-md mx-auto relative overflow-hidden"
                        >
                            {/* HUD corners */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/30" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/30" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/30" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/30" />

                            <div className="mb-6 relative">
                                <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-accent/30 flex items-center justify-center">
                                    <Crosshair className="h-12 w-12 text-accent/30" />
                                </div>
                            </div>
                            <div className="text-label text-accent mb-2">NO TARGETS ACQUIRED</div>
                            <h2 className="text-h3 mb-3 text-foreground">
                                Watchlist Empty
                            </h2>
                            <p className="text-body-sm text-muted-foreground mb-8">
                                Add bunkers to your watchlist for quick access.
                                Click the heart icon on any bunker to mark it as a priority target.
                            </p>
                            <Link href="/search">
                                <Button variant="default" size="lg" className="gap-2 relative overflow-hidden group">
                                    <Search className="h-5 w-5" />
                                    <span className="relative z-10">Acquire Targets</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
