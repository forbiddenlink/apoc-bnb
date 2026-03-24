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
        default:
            "bg-black/40 border border-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]",
        dotted:
            "bg-black/40 border border-dashed border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]",
        hazard:
            "bg-black/40 border border-accent/30 hover:border-accent hover:shadow-[0_0_30px_rgba(255,0,60,0.2)]",
        featured:
            "bg-gradient-to-br from-black/60 to-primary/5 border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(57,255,20,0.15)]",
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
                        "group relative h-full flex flex-col backdrop-blur-sm overflow-hidden rounded-sm",
                        "transition-all duration-500",
                        variantClasses[variant]
                    )}
                >
                    {/* HUD Corner Accents - Animate inward on hover */}
                    <div
                        className={cn(
                            "absolute top-0 left-0 w-2 h-2 border-l border-t z-30",
                            "transition-all duration-300 ease-out",
                            "border-white/20 group-hover:border-primary",
                            "group-hover:w-4 group-hover:h-4"
                        )}
                    />
                    <div
                        className={cn(
                            "absolute top-0 right-0 w-2 h-2 border-r border-t z-30",
                            "transition-all duration-300 ease-out delay-[50ms]",
                            "border-white/20 group-hover:border-primary",
                            "group-hover:w-4 group-hover:h-4"
                        )}
                    />
                    <div
                        className={cn(
                            "absolute bottom-0 left-0 w-2 h-2 border-l border-b z-30",
                            "transition-all duration-300 ease-out delay-[100ms]",
                            "border-white/20 group-hover:border-primary",
                            "group-hover:w-4 group-hover:h-4"
                        )}
                    />
                    <div
                        className={cn(
                            "absolute bottom-0 right-0 w-2 h-2 border-r border-b z-30",
                            "transition-all duration-300 ease-out delay-[150ms]",
                            "border-white/20 group-hover:border-primary",
                            "group-hover:w-4 group-hover:h-4"
                        )}
                    />

                    {/* Image Container */}
                    <div className="aspect-video relative overflow-hidden border-b border-white/5">
                        {/* Green overlay on hover */}
                        <div
                            className={cn(
                                "absolute inset-0 z-10 mix-blend-overlay",
                                "bg-primary/10 opacity-0 group-hover:opacity-100",
                                "transition-opacity duration-300"
                            )}
                        />

                        {/* Scanline Effect on Hover */}
                        <div
                            className={cn(
                                "absolute inset-0 z-20 pointer-events-none",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                "bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]",
                                "bg-size-[100%_4px,3px_100%]"
                            )}
                        />

                        <Image
                            src={bunker.images[0]}
                            alt={bunker.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className={cn(
                                "object-cover",
                                "transition-transform duration-700 ease-out",
                                "group-hover:scale-105",
                                "filter group-hover:contrast-110"
                            )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
                            <div
                                className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest backdrop-blur-md border",
                                    bunker.features.radLevel <= 2
                                        ? "bg-primary/10 text-primary border-primary/30"
                                        : "bg-accent/10 text-accent border-accent/30 animate-pulse"
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
                    <div className="p-4 flex-1 flex flex-col relative">
                        {/* Grid Background Effect - scrolls on hover */}
                        <div
                            className={cn(
                                "absolute inset-0 pointer-events-none opacity-20",
                                "bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]",
                                "bg-size-[20px_20px]",
                                "transition-all duration-700",
                                "group-hover:bg-position-[10px_10px]"
                            )}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                                        <MapPin className="h-3 w-3 text-primary/70" />
                                        <span>{bunker.location.region}</span>
                                    </div>
                                    <h3
                                        className={cn(
                                            "font-bold text-lg leading-tight text-white font-sans tracking-wide line-clamp-1",
                                            "transition-all duration-300",
                                            "group-hover:text-primary group-hover:text-glow"
                                        )}
                                    >
                                        {bunker.title}
                                    </h3>
                                </div>
                                {/* Rating - stars fill in sequentially */}
                                <div
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-bold",
                                        "text-secondary bg-secondary/5 px-1.5 py-0.5 rounded border border-secondary/20",
                                        "transition-all duration-300 delay-100",
                                        "group-hover:bg-secondary/10 group-hover:border-secondary/40"
                                    )}
                                >
                                    <Star className="h-3.5 w-3.5 fill-secondary transition-transform duration-300 group-hover:scale-110" />
                                    <span>{bunker.rating.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-2 my-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5 border-l border-white/10 pl-2 group-hover:border-primary/30 transition-colors duration-300">
                                    <span className="text-white/40">CAP:</span>
                                    <span className="text-white/80">
                                        {bunker.features.capacity} Units
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 border-l border-white/10 pl-2 group-hover:border-primary/30 transition-colors duration-300 delay-75">
                                    <span className="text-white/40">SEC:</span>
                                    <span className="text-white/80">
                                        Lvl {bunker.features.securityLevel}
                                    </span>
                                </div>
                            </div>

                            {/* Price Footer */}
                            <div className="mt-auto pt-3 border-t border-white/5 group-hover:border-white/10 transition-colors flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                        Rate / Night
                                    </span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-bold text-lg text-secondary font-mono tabular-nums">
                                            {bunker.price.caps}
                                        </span>
                                        <span className="text-xs font-bold text-secondary/70">
                                            CAPS
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow button */}
                                <div
                                    className={cn(
                                        "h-8 w-8 flex items-center justify-center rounded-sm",
                                        "border border-white/10",
                                        "transition-all duration-300",
                                        "group-hover:bg-primary group-hover:text-black group-hover:border-primary",
                                        "group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                                    )}
                                >
                                    <span className="sr-only">View</span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        className="transform group-hover:rotate-45 transition-transform duration-300"
                                    >
                                        <path
                                            d="M1 11L11 1M11 1H1M11 1V11"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
