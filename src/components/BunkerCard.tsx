"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Bunker } from "@/types";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { CompareButton } from "@/components/ui/CompareButton";
import { cn } from "@/lib/utils";

interface BunkerCardProps {
    bunker: Bunker;
    index?: number;
    variant?: "default" | "dotted" | "hazard" | "featured";
    size?: "sm" | "md" | "lg" | "tall";
}

export function BunkerCard({
    bunker,
    index = 0,
    variant = "default",
    size,
}: Readonly<BunkerCardProps>) {
    const variantClasses = {
        default: "bg-[var(--bone)] border border-[var(--soot)] shadow-[3px_3px_0_var(--soot)] hover:shadow-[5px_5px_0_var(--soot)]",
        dotted: "bg-[var(--bone)] border border-dashed border-[var(--soot)] hover:shadow-[3px_3px_0_var(--soot)]",
        hazard: "bg-[var(--bone)] border border-[var(--oxide)] shadow-[3px_3px_0_var(--oxide)] hover:shadow-[5px_5px_0_var(--oxide)]",
        featured: "bg-[var(--bone)] border-2 border-[var(--soot)] shadow-[4px_4px_0_var(--soot)] hover:shadow-[6px_6px_0_var(--soot)]",
    };

    const sizeClasses = {
        sm: "bento-sm",
        md: "bento-md",
        lg: "bento-lg",
        tall: "bento-tall",
    };

    return (
        <div className={size ? sizeClasses[size] : ""}>
            <Link href={`/bunkers/${bunker.id}`}>
                <div
                    className={cn(
                        "group relative h-full flex flex-col overflow-hidden",
                        "transition-shadow duration-200",
                        variantClasses[variant]
                    )}
                >
                    {/* Image Container */}
                    <div className="aspect-video relative overflow-hidden border-b border-[var(--soot)]">
                        <Image
                            src={bunker.images[0]}
                            alt={bunker.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
                            <div
                                className={cn(
                                    "folio-label px-2 py-1 font-bold border",
                                    bunker.features.radLevel <= 2
                                        ? "bg-[var(--soot)] text-[var(--geiger)] border-[var(--soot)]"
                                        : "bg-[var(--vellum)] text-[var(--oxide)] border-[var(--oxide)]"
                                )}
                            >
                                {bunker.features.radLevel <= 2 ? "RAD-SAFE" : "HAZARD"}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                            <CompareButton bunkerId={bunker.id} />
                            <FavoriteButton bunkerId={bunker.id} size="sm" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2 gap-2">
                            <div className="min-w-0">
                                <div className="folio-label flex items-center gap-1.5 text-muted-foreground mb-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{bunker.location.region}</span>
                                </div>
                                <h3 className="font-[family-name:var(--font-folio-display)] text-xl font-bold leading-tight line-clamp-1">
                                    {bunker.title}
                                </h3>
                            </div>
                            <span className="folio-label shrink-0 inline-flex items-center gap-1 border border-[var(--soot)] bg-[var(--vellum)] px-2 py-1 font-bold">
                                <Star className="h-3 w-3 fill-current" />
                                {bunker.rating.toFixed(1)}
                            </span>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-2 my-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 border-l border-[var(--soot)] pl-2">
                                <span>CAP:</span>
                                <span>{bunker.features.capacity} Units</span>
                            </div>
                            <div className="flex items-center gap-1.5 border-l border-[var(--soot)] pl-2">
                                <span>SEC:</span>
                                <span>Lvl {bunker.features.securityLevel}</span>
                            </div>
                        </div>

                        {/* Price Footer */}
                        <div className="mt-auto pt-3 border-t border-[var(--soot)] flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="folio-label text-muted-foreground">Rate / Night</span>
                                <div className="flex items-baseline gap-1.5 mt-1">
                                    <span className="font-mono text-xl font-bold tabular-nums">
                                        {bunker.price.caps}
                                    </span>
                                    <span className="folio-label">CAPS</span>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "h-9 w-9 flex items-center justify-center border border-[var(--soot)]",
                                    "transition-colors duration-200",
                                    "group-hover:bg-[var(--soot)] group-hover:text-[var(--geiger)]"
                                )}
                            >
                                <span className="sr-only">View</span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:rotate-45">
                                    <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
