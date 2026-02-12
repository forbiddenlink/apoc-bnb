"use client";

import DoomsdayMap from "@/components/map/DoomsdayMap";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FilterPanel } from "@/components/search/FilterPanel";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { usePrefetchBunker } from "@/lib/hooks/useBunker";
import { Star, MapPin, Radiation } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
    const { searchFilters } = useAppStore();
    const { bunkers, total, isLoading, isError } = useBunkers(searchFilters);
    const prefetchBunker = usePrefetchBunker();

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans noise-overlay">
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row pt-[60px] h-[calc(100vh-60px)]">

                {/* Listings Sidebar */}
                <div className="w-full lg:w-[500px] xl:w-[600px] flex flex-col border-r border-border bg-card/30 backdrop-blur-sm overflow-hidden lg:h-full search-sidebar">
                    {/* Filters Header */}
                    <div className="p-3 md:p-4 border-b border-border flex gap-2 overflow-x-auto no-scrollbar bg-background/50 sticky top-0 z-10">
                        <FilterPanel />
                    </div>

                    {/* Scrollable Listings */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 pb-24 md:pb-4">
                        {isLoading && <BunkerListSkeleton />}

                        {isError && (
                            <div className="text-center py-12 px-4">
                                <Radiation className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse" />
                                <p className="text-accent font-bold">SIGNAL LOST</p>
                                <p className="text-sm text-muted-foreground mt-2">Failed to load bunkers. Please try again.</p>
                            </div>
                        )}

                        {!isLoading && !isError && bunkers.map((bunker) => (
                            <Link
                                key={bunker.id}
                                href={`/bunkers/${bunker.id}`}
                                onMouseEnter={() => prefetchBunker(bunker.id)}
                            >
                                <div className={`flex gap-3 md:gap-4 p-2.5 md:p-3 rounded-lg cursor-pointer group transition-all
                                    ${bunker.features.radLevel > 3
                                        ? 'containment-card-critical'
                                        : 'containment-card'
                                    }`}
                                >
                                    {/* Image */}
                                    <div className="w-28 sm:w-32 h-20 sm:h-24 bg-muted rounded-md relative overflow-hidden flex-shrink-0">
                                        <Image
                                            src={bunker.images[0]}
                                            alt={bunker.title}
                                            fill
                                            sizes="128px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {/* Rad indicator dot */}
                                        <div className={`absolute top-2 left-2 w-2 h-2 rounded-full ${
                                            bunker.features.radLevel <= 2 ? "bg-primary" :
                                            bunker.features.radLevel <= 4 ? "bg-secondary" : "bg-accent animate-ping"
                                        }`} />
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
                                                    ? "text-primary bg-primary/10"
                                                    : bunker.features.radLevel <= 4
                                                        ? "text-secondary bg-secondary/10"
                                                        : "text-accent bg-accent/10"
                                            }`}>
                                                {bunker.tags[0] || 'Available'}
                                            </span>
                                            <div className="text-right">
                                                <span className="font-black text-base md:text-lg">{bunker.price.caps}</span>
                                                <span className="text-[10px] md:text-xs text-muted-foreground ml-1">CAPS/night</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {!isLoading && !isError && bunkers.length === 0 && (
                            <div className="text-center py-12 px-4">
                                <Radiation className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-foreground font-bold">NO BUNKERS FOUND</p>
                                <p className="text-sm text-muted-foreground mt-2">Try adjusting your search filters.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-3 md:p-4 border-t border-border text-center text-xs text-muted-foreground font-mono bg-background/50 hidden md:block">
                        <span className="text-primary">{bunkers.length}</span> of <span className="text-primary">{total}</span> BUNKERS IN RANGE
                    </div>
                </div>

                {/* Map Section */}
                <div className="flex-1 h-[40vh] lg:h-full relative bg-black search-map order-first lg:order-last">
                    <DoomsdayMap bunkers={bunkers} />
                    {/* Mobile results count overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
                        <div className="bg-card/90 backdrop-blur border border-border rounded-full px-4 py-2 text-xs font-mono">
                            <span className="text-primary">{bunkers.length}</span> bunkers found
                        </div>
                    </div>
                </div>

            </div>

            <MobileBottomNav />
        </div>
    );
}
