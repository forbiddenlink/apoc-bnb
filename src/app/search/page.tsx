"use client";

import DoomsdayMap from "@/components/map/DoomsdayMap";
import { Navbar } from "@/components/layout/Navbar";
import { FilterPanel } from "@/components/search/FilterPanel";
import { BunkerListSkeleton } from "@/components/ui/BunkerSkeleton";
import { useAppStore } from "@/lib/store";
import { useBunkers } from "@/lib/hooks/useBunkers";
import Link from "next/link";

export default function SearchPage() {
    const { searchFilters } = useAppStore();

    const { bunkers, total, isLoading, isError } = useBunkers(searchFilters);

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row pt-[60px] h-[calc(100vh-60px)]">

                {/* Listings Sidebar */}
                <div className="w-full lg:w-[600px] flex flex-col border-r border-border bg-card/30 backdrop-blur-sm overflow-hidden h-full">
                    {/* Filters Header */}
                    <div className="p-4 border-b border-border flex gap-2 overflow-x-auto no-scrollbar">
                        <FilterPanel />
                    </div>

                    {/* Scrollable Listings */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {isLoading && <BunkerListSkeleton />}

                        {isError && (
                            <div className="text-center py-12">
                                <p className="text-destructive">Failed to load bunkers.</p>
                                <p className="text-sm text-muted-foreground/60 mt-2">Please try again later.</p>
                            </div>
                        )}

                        {!isLoading && !isError && bunkers.map((bunker) => (
                            <Link key={bunker.id} href={`/bunkers/${bunker.id}`}>
                                <div className={`flex gap-4 p-3 containment-card cursor-pointer group ${bunker.features.radLevel > 3 ? 'border-accent/50' : ''}`}>
                                    <div
                                        className="w-32 h-24 bg-muted rounded-md relative overflow-hidden flex-shrink-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${bunker.images[0]})` }}
                                    >
                                        <div className="absolute top-2 right-2 z-10">
                                            <div className="h-6 w-6 rounded-full bg-background/80 flex items-center justify-center">
                                                <span className="text-xs">❤️</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                    {bunker.title}
                                                </h3>
                                                <span className="text-secondary text-sm font-mono flex items-center gap-1 flex-shrink-0">
                                                    {bunker.rating} ★
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                                {bunker.location.name} • {bunker.features.depth}ft Deep
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-end mt-2">
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                                {bunker.tags[0] || 'Available'}
                                            </span>
                                            <div className="text-right">
                                                <span className="font-bold text-lg">{bunker.price.caps} CAPS</span>
                                                <span className="text-xs text-muted-foreground"> / night</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {!isLoading && !isError && bunkers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No bunkers match your filters.</p>
                                <p className="text-sm text-muted-foreground/60 mt-2">Try adjusting your search criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-4 border-t border-border text-center text-xs text-muted-foreground">
                        Displaying {bunkers.length} of {total} Bunkers
                    </div>
                </div>

                {/* Map Section */}
                <div className="flex-1 h-[50vh] lg:h-full relative bg-black">
                    <DoomsdayMap bunkers={bunkers} />
                </div>

            </div>
        </div>
    );
}
