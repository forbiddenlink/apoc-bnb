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
        <div className="hidden lg:flex items-center justify-between px-4 py-2 bg-[var(--bone)] border-b border-[var(--soot)]">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-[var(--oxide)] transition-opacity ${statusBlink ? 'opacity-100' : 'opacity-40'}`} />
                    <span className="folio-label font-bold">OPERATIONS CENTER ONLINE</span>
                </div>
                <div className="w-px h-4 bg-[var(--soot)]/50" />
                <span className="folio-label text-muted-foreground">
                    TARGETS: <span className="font-bold text-foreground">{bunkerCount}</span>/<span className="font-bold text-foreground">{total}</span>
                </span>
            </div>
            <div className="folio-label flex items-center gap-4 text-muted-foreground">
                <span>LAT: 40.7128°N</span>
                <span>LON: 74.0060°W</span>
                <span className="font-bold text-foreground">GRID: ACTIVE</span>
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
                <div className="folio-row group relative flex cursor-pointer gap-3 overflow-hidden border-t border-[var(--soot)] py-3 pr-12 transition-colors hover:bg-[var(--bone)] md:gap-4 md:p-3 md:pr-3">
                    {/* Image */}
                    <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden border border-[var(--soot)] bg-muted sm:w-32">
                        <Image
                            src={bunker.images[0]}
                            alt={bunker.title}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="line-clamp-2 font-[family-name:var(--font-folio-display)] text-lg font-bold leading-tight md:text-xl">
                                    {bunker.title}
                                </h3>
                                <span className="flex flex-shrink-0 items-center gap-1">
                                    <Star className="h-3.5 w-3.5 fill-current" />
                                    <span className="font-mono text-sm font-bold">{bunker.rating.toFixed(1)}</span>
                                </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="line-clamp-1">{bunker.location.name}</span>
                                <span className="folio-label ml-1 flex-shrink-0">RAD {bunker.features.radLevel}</span>
                            </div>
                        </div>

                        <div className="mt-2 flex items-end justify-between gap-2">
                            <span className={`folio-label whitespace-nowrap border px-2 py-0.5 font-bold ${
                                bunker.features.radLevel <= 2
                                    ? "border-[var(--soot)] bg-[var(--soot)] text-[var(--geiger)]"
                                    : "border-[var(--oxide)] text-[var(--oxide)]"
                            }`}>
                                {bunker.tags[0] || 'Available'}
                            </span>
                            <div className="text-right">
                                <span className="font-mono text-lg font-bold tabular-nums">{bunker.price.caps}</span>
                                <span className="ml-1 text-xs text-muted-foreground">CAPS/night</span>
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
        <>
            <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                <Navbar variant="folio" />
            </div>
            <div id="main-content" className="folio folio-inner flex min-h-screen flex-col overflow-x-clip">

            <div className="flex-1 flex flex-col pt-20 lg:h-[100vh]">
                {/* Operations Center Header */}
                <OperationsHeader bunkerCount={bunkers.length} total={total} />

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Mission Parameters Sidebar */}
                    <div className="w-full lg:w-[500px] xl:w-[600px] flex flex-col border-r border-[var(--soot)] bg-[var(--vellum)] overflow-hidden lg:h-full search-sidebar relative">

                        {/* Filters Header - Mission Parameters */}
                        <div className="p-3 md:p-4 border-b-2 border-[var(--soot)] bg-[var(--vellum)] sticky top-0 z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="h-4 w-4" />
                                <span className="folio-label font-bold">MISSION PARAMETERS</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                <FilterPanel />
                            </div>
                        </div>

                        {/* Scrollable Listings */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-4 pb-44 md:pb-4">
                            {isLoading && <BunkerListSkeleton />}

                            {isError && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 px-4"
                                >
                                    <div className="relative w-20 h-20 mx-auto mb-4">
                                        <Radiation className="h-20 w-20 text-accent" />
                                    </div>
                                    <p className="folio-label font-bold text-accent mb-2">SIGNAL LOST</p>
                                    <p className="text-body-sm text-muted-foreground">Failed to load bunkers. Check your connection.</p>
                                    <div className="mt-4 folio-label text-muted-foreground">
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
                                    <p className="folio-label font-bold mb-2">SECTOR EMPTY</p>
                                    <p className="text-body-sm text-muted-foreground">No bunkers match current parameters.</p>
                                    <p className="folio-label text-muted-foreground mt-4">
                                        Adjust filters to expand search radius.
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Tactical Footer */}
                        <div className="p-3 md:p-4 border-t border-primary/20 bg-muted backdrop-blur-sm hidden md:flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Radio className="h-3 w-3 text-primary animate-pulse" />
                                <span className="folio-label text-muted-foreground">SCANNING...</span>
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
                    <div className="flex-none lg:flex-1 h-[40vh] lg:h-[calc(100vh-98px)] relative folio-soot bg-[var(--soot)] border-b border-[var(--soot)] lg:border-b-0 search-map order-first lg:order-last">
                        <DoomsdayMap bunkers={bunkers} selectedBunkerId={hoveredBunkerId || undefined} />

                        {/* Mobile results count overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-20">
                            <div className="bg-[var(--vellum)] border border-[var(--soot)] shadow-[3px_3px_0_var(--soot)] px-4 py-2 text-xs font-mono flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--oxide)]" />
                                <span className="font-bold text-[var(--soot)]">{bunkers.length}</span>
                                <span className="text-[var(--ash)]">targets found</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                <MobileBottomNav />
            </div>

            {/* CSS for radar sweep animation */}
            <style jsx>{`
                @keyframes radar-sweep {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}
