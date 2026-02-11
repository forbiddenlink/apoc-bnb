"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FavoritesPage() {
    const { favorites } = useAppStore();
    const { bunkers, isLoading } = useBunkers();

    const favoriteBunkers = bunkers.filter((bunker) =>
        favorites.includes(bunker.id)
    );

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="pt-24 pb-20 container mx-auto px-4 max-w-7xl">
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
                    <div className="text-center py-20">
                        <div className="mb-6">
                            <Heart className="h-24 w-24 text-muted mx-auto opacity-20" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-foreground">
                            No Favorites Yet
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Start adding bunkers to your favorites so you can easily find them later.
                            Click the heart icon on any bunker to save it.
                        </p>
                        <Link href="/search">
                            <Button variant="neobrutal" size="lg" className="gap-2">
                                <Search className="h-5 w-5" />
                                Browse Bunkers
                            </Button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
