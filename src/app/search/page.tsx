"use client";

import DoomsdayMap from "@/components/map/DoomsdayMap";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FilterPanel } from "@/components/search/FilterPanel";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { usePrefetchBunker } from "@/lib/hooks/useBunker";
import { Star, MapPin, Radiation, Radio, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Radar sweep animation for empty state
function RadarSweep() {
    return (
        <div className="relative w-32 h-32 mx-auto mb-6">
            {/* Radar rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20" />
            <div className="absolute inset-4 rounded-full border border-primary/15" />
            <div className="absolute inset-8 rounded-full border border-primary/10" />
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-breathe" />
            {/* Sweep line */}
            <div
                className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
                style={{
                    background: 'linear-gradient(90deg, var(--primary), transparent)',
                    animation: 'radar-sweep 2s linear infinite'
                }}
            />
        </div>
    );
}

// HUD corner accents for tactical frame
function HUDCorners({ className = "" }: { className?: string }) {
    return (
        <>
            <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50 ${className}`} />
            <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50 ${className}`} />
            <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50 ${className}`} />
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50 ${className}`} />
        </>
    );
}

// Status header component
function OperationsHeader({ bunkerCount, total }: { bunkerCount: number; total: number }) {
    const [statusBlink, setStatusBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => setStatusBlink(prev => !prev), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden lg:flex items-center justify-between px-4 py-2 bg-black/60 border-b border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-primary transition-opacity ${statusBlink ? 'opacity-100' : 'opacity-40'}`} />
                    <span className="text-label text-primary">OPERATIONS CENTER ONLINE</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <span className="text-mono text-muted-foreground">
                    TARGETS: <span className="text-primary">{bunkerCount}</span>/<span className="text-secondary">{total}</span>
                </span>
            </div>
            <div className="flex items-center gap-4 text-mono text-xs text-muted-foreground">
                <span>LAT: 40.7128°N</span>
                <span>LON: 74.0060°W</span>
                <span className="text-primary">GRID: ACTIVE</span>
            </div>
        </div>
    );
}

// Bunker list item with enhanced styling
function BunkerListItem({
    bunker,
    index,
    onHover
}: {
    bunker: any;
    index: number;
    onHover: (id: string | null) => void;
}) {
    const prefetchBunker = usePrefetchBunker();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            <Link
                href={`/bunkers/${bunker.id}`}
                onMouseEnter={() => {
                    prefetchBunker(bunker.id);
                    onHover(bunker.id);
                }}
                onMouseLeave={() => onHover(null)}
            >
                <div className={`flex gap-3 md:gap-4 p-2.5 md:p-3 rounded-lg cursor-pointer group transition-all relative overflow-hidden
                    ${bunker.features.radLevel > 3
                        ? 'containment-card-critical'
                        : 'containment-card'
                    }`}
                >
                    {/* Scan line on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-scanline" />
                    </div>

                    {/* Image */}
                    <div className="w-28 sm:w-32 h-20 sm:h-24 bg-muted rounded-md relative overflow-hidden flex-shrink-0">
                        <Image
                            src={bunker.images[0]}
                            alt={bunker.title}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Rad indicator with pulse */}
                        <div className={`absolute top-2 left-2 flex items-center justify-center ${
                            bunker.features.radLevel > 4 ? 'animate-pulse' : ''
                        }`}>
                            <div className={`w-2 h-2 rounded-full ${
                                bunker.features.radLevel <= 2 ? "bg-primary shadow-[0_0_8px_var(--primary)]" :
                                bunker.features.radLevel <= 4 ? "bg-secondary shadow-[0_0_8px_var(--secondary)]" :
                                "bg-accent shadow-[0_0_8px_var(--accent)]"
                            }`} />
                        </div>
                        {/* HUD corner on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/60" />
                            <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/60" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {bunker.title}
                                </h3>
                                <span className="flex items-center gap-1 flex-shrink-0">
                                    <Star className="h-3 w-3 text-secondary fill-secondary" />
                                    <span className="text-sm font-bold">{bunker.rating.toFixed(1)}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                <span className="line-clamp-1">{bunker.location.name}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mt-2 gap-2">
                            <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded uppercase ${
                                bunker.features.radLevel <= 2
                                    ? "text-primary bg-primary/10 border border-primary/20"
                                    : bunker.features.radLevel <= 4
                                        ? "text-secondary bg-secondary/10 border border-secondary/20"
                                        : "text-accent bg-accent/10 border border-accent/20"
                            }`}>
                                {bunker.tags[0] || 'Available'}
                            </span>
                            <div className="text-right">
                                <span className="font-black text-base md:text-lg group-hover:text-glow transition-all">{bunker.price.caps}</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground ml-1">CAPS/night</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function SearchPage() {
    useEffect(() => { document.title = "Find a Bunker | APOC-BNB"; }, []);

    const { searchFilters } = useAppStore();
    const { bunkers, total, isLoading, isError } = useBunkers(searchFilters);
    const [hoveredBunkerId, setHoveredBunkerId] = useState<string | null>(null);

    return (
        <div id="main-content" className="min-h-screen bg-background flex flex-col font-sans noise-overlay">
            <Navbar />

            <div className="flex-1 flex flex-col pt-[60px] h-[calc(100vh-60px)]">
                {/* Operations Center Header */}
                <OperationsHeader bunkerCount={bunkers.length} total={total} />

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Mission Parameters Sidebar */}
                    <div className="w-full lg:w-[500px] xl:w-[600px] flex flex-col border-r border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden lg:h-full search-sidebar relative">
                        {/* Tactical frame corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/30 pointer-events-none z-20" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/30 pointer-events-none z-20 lg:hidden" />

                        {/* Filters Header - Mission Parameters */}
                        <div className="p-3 md:p-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-label text-primary">MISSION PARAMETERS</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                <FilterPanel />
                            </div>
                        </div>

                        {/* Scrollable Listings */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 pb-24 md:pb-4">
                            {isLoading && <BunkerListSkeleton />}

                            {isError && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 px-4"
                                >
                                    <div className="relative w-20 h-20 mx-auto mb-4">
                                        <Radiation className="h-20 w-20 text-accent animate-pulse" />
                                        <div className="absolute inset-0 bg-accent/20 rounded-full animate-radar-ping" />
                                    </div>
                                    <p className="text-label text-accent mb-2">SIGNAL LOST</p>
                                    <p className="text-body-sm text-muted-foreground">Failed to load bunkers. Check your connection.</p>
                                    <div className="mt-4 text-mono text-xs text-muted-foreground">
                                        ERROR CODE: RAD_INTERFERENCE_01
                                    </div>
                                </motion.div>
                            )}

                            <AnimatePresence mode="popLayout">
                                {!isLoading && !isError && bunkers.map((bunker, index) => (
                                    <BunkerListItem
                                        key={bunker.id}
                                        bunker={bunker}
                                        index={index}
                                        onHover={setHoveredBunkerId}
                                    />
                                ))}
                            </AnimatePresence>

                            {!isLoading && !isError && bunkers.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16 px-4"
                                >
                                    <RadarSweep />
                                    <p className="text-label text-muted-foreground mb-2">SECTOR EMPTY</p>
                                    <p className="text-body-sm text-muted-foreground">No bunkers match current parameters.</p>
                                    <p className="text-mono text-xs text-muted-foreground mt-4">
                                        Adjust filters to expand search radius.
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Tactical Footer */}
                        <div className="p-3 md:p-4 border-t border-primary/20 bg-black/60 backdrop-blur-sm hidden md:flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Radio className="h-3 w-3 text-primary animate-pulse" />
                                <span className="text-mono text-xs text-muted-foreground">SCANNING...</span>
                            </div>
                            <div className="text-mono text-xs">
                                <span className="text-primary">{bunkers.length}</span>
                                <span className="text-muted-foreground"> / </span>
                                <span className="text-secondary">{total}</span>
                                <span className="text-muted-foreground ml-2">TARGETS ACQUIRED</span>
                            </div>
                        </div>

                        {/* Bottom corner accent */}
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/30 pointer-events-none z-20" />
                    </div>

                    {/* Doomsday Radar Map Section */}
                    <div className="flex-1 h-[40vh] lg:h-full relative bg-black search-map order-first lg:order-last">
                        {/* Map tactical frame */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/40" />
                            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
                            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
                            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/40" />
                        </div>

                        <DoomsdayMap bunkers={bunkers} selectedBunkerId={hoveredBunkerId || undefined} />

                        {/* Mobile results count overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-20">
                            <div className="bg-black/90 backdrop-blur border border-primary/30 rounded-full px-4 py-2 text-xs font-mono flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-primary">{bunkers.length}</span>
                                <span className="text-muted-foreground">targets found</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MobileBottomNav />

            {/* CSS for radar sweep animation */}
            <style jsx>{`
                @keyframes radar-sweep {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
