"use client";

import { useEffect } from "react";
import { FolioShell } from "@/components/layout/FolioShell";
import { BunkerCard } from "@/components/BunkerCard";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { Heart, Search, Radiation, Target, Crosshair } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
    useEffect(() => { document.title = "Watchlist | APOC-BNB"; }, []);

    const { favorites } = useAppStore();
    const { bunkers, isLoading } = useBunkers();

    const favoriteBunkers = bunkers.filter((bunker) =>
        favorites.includes(bunker.id)
    );

    return (
        <FolioShell mainClassName="max-w-7xl">
            <div>
                {/* Header - Watchlist // Priority Targets */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 border-b-2 border-[var(--soot)] pb-6"
                >
                    <div className="folio-label mb-3 flex items-center gap-2 text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>WATCHLIST // PRIORITY TARGETS</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="folio-display flex items-center gap-3 text-[clamp(2.5rem,7vw,4.5rem)]">
                                <Heart className="hidden h-10 w-10 shrink-0 fill-current text-accent sm:block" aria-hidden="true" />
                                Your Favorites
                            </h1>
                            <p className="mt-3 text-muted-foreground">
                                {favoriteBunkers.length > 0
                                    ? <><span className="font-bold text-foreground">{favoriteBunkers.length}</span> shelter{favoriteBunkers.length === 1 ? '' : 's'} marked for potential acquisition</>
                                    : 'No targets acquired yet'}
                            </p>
                        </div>
                        {favoriteBunkers.length > 0 && (
                            <div className="folio-label flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-accent" />
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="folio-card relative mx-auto max-w-md p-8 md:p-12"
                        >
                            <div className="mb-6">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[var(--soot)]">
                                    <Crosshair className="h-12 w-12" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="folio-label mb-2 text-muted-foreground">NO TARGETS ACQUIRED</div>
                            <h2 className="folio-display mb-3 text-3xl">
                                Watchlist Empty
                            </h2>
                            <p className="mb-8 text-muted-foreground">
                                Add bunkers to your watchlist for quick access.
                                Click the heart icon on any bunker to mark it as a priority target.
                            </p>
                            <Link href="/search">
                                <Button variant="default" size="lg" className="min-h-11 gap-2">
                                    <Search className="h-5 w-5" />
                                    <span>Acquire Targets</span>
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </div>
        </FolioShell>
    );
}
