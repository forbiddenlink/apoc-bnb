"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { Heart, Search, Radiation } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
                        <Heart className="h-10 w-10 text-accent fill-current" />
                        Your Favorites
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {favoriteBunkers.length > 0 
                            ? `${favoriteBunkers.length} shelter${favoriteBunkers.length === 1 ? '' : 's'} you might want to survive in`
                            : 'No favorite bunkers yet'}
                    </p>
                </motion.div>

                {isLoading ? (
                    <BunkerListSkeleton count={favorites.length || 4} />
                ) : favoriteBunkers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoriteBunkers.map((bunker, index) => (
                            <BunkerCard key={bunker.id} bunker={bunker} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 md:py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="containment-card-dotted p-8 md:p-12 max-w-md mx-auto"
                        >
                            <div className="mb-6 relative">
                                <Heart className="h-20 w-20 md:h-24 md:w-24 text-accent/20 mx-auto" />
                                <Radiation className="h-8 w-8 text-accent/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                                No Favorites Yet
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground mb-8">
                                Start adding bunkers to your favorites so you can easily find them later.
                                Click the heart icon on any bunker to save it.
                            </p>
                            <Link href="/search">
                                <Button variant="default" size="lg" className="gap-2">
                                    <Search className="h-5 w-5" />
                                    Browse Bunkers
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
