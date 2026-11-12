"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Skull, Heart, CalendarCheck } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useAppStore } from "@/lib/store";
import { DefconIndicator } from "@/components/ui/DefconIndicator";
import { SystemStatusCompact } from "@/components/ui/SystemStatus";
import { ApocMascot } from "@/components/ui/ApocMascot";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function NavLink({
    href,
    children,
    folio,
}: {
    href: string;
    children: React.ReactNode;
    folio?: boolean;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "relative transition-colors duration-200 group py-2 whitespace-nowrap",
                folio ? "hover:text-[#15130f]" : "hover:text-primary"
            )}
        >
            <span className="relative z-10">{children}</span>
            {/* Animated underline */}
            <span
                className={cn(
                    "absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ease-out",
                    folio
                        ? "bg-[#15130f]"
                        : "bg-primary shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                )}
            />
        </Link>
    );
}

function GlitchLogo({ isScrolled, folio }: { isScrolled: boolean; folio?: boolean }) {
    const [isGlitching, setIsGlitching] = useState(false);

    const triggerGlitch = useCallback(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
    }, []);

    return (
        <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="APOC-BNB Home"
            onMouseEnter={triggerGlitch}
        >
            <ApocMascot expression="happy" size="sm" animate={false} />
            <span
                className={cn(
                    "text-2xl font-black uppercase tracking-[0.3em] text-white transition-all duration-300 whitespace-nowrap",
                    isScrolled && "text-xl tracking-[0.25em]",
                    folio && "text-[#15130f] text-xl lg:text-2xl tracking-[0.2em] lg:tracking-[0.3em]",
                    isGlitching && "animate-glitch"
                )}
            >
                <span
                    className={cn(
                        "transition-all inline-block",
                        !folio && "text-glow group-hover:text-glow-intense",
                        isGlitching && "text-primary"
                    )}
                >
                    APOC
                </span>
                <span
                    className={cn(
                        "transition-all inline-block",
                        !folio && "group-hover:text-secondary group-hover:text-glow-gold"
                    )}
                >
                    -BNB
                </span>
            </span>
        </Link>
    );
}

function ScanLineButton({
    children,
    variant,
    className,
    onClick,
    folio,
}: {
    children: React.ReactNode;
    variant: "tactical" | "tactical-gold";
    className?: string;
    onClick?: () => void;
    folio?: boolean;
}) {
    if (folio) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={cn(
                    "items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15130f]",
                    variant === "tactical-gold"
                        ? "flex bg-[#15130f] text-[#c8f03a]"
                        : "flex border border-[#15130f] text-[#15130f]",
                    className
                )}
            >
                {children}
            </button>
        );
    }
    return (
        <Button
            variant={variant}
            size="sm"
            className={cn(
                "relative overflow-hidden group active-press",
                className
            )}
            onClick={onClick}
        >
            {/* Scan line effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 ease-linear bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </span>
            {/* Radar ping on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <span
                    className={cn(
                        "absolute inset-0 rounded-sm",
                        variant === "tactical-gold"
                            ? "group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4),0_0_40px_rgba(212,175,55,0.2)]"
                            : "group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4),0_0_40px_rgba(57,255,20,0.2)]"
                    )}
                    style={{ transition: "box-shadow 0.3s ease-out" }}
                />
            </span>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Button>
    );
}

export function Navbar({ variant = "default" }: { variant?: "default" | "folio" }) {
    const folio = variant === "folio";
    const { favorites, bookings } = useAppStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate dynamic values based on scroll
    const navHeight = isScrolled ? "h-16" : "h-20";
    const bgOpacity = Math.min(0.95, 0.8 + scrollY / 500);
    const blurAmount = Math.min(16, 12 + scrollY / 50);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
                navHeight,
                folio
                    ? "border-[#15130f]"
                    : isScrolled
                      ? "border-primary/20 shadow-[0_1px_20px_rgba(57,255,20,0.1)]"
                      : "border-border"
            )}
            style={{
                backgroundColor: folio
                    ? `rgba(241, 234, 219, ${Math.max(0.94, bgOpacity)})`
                    : `rgba(5, 5, 5, ${bgOpacity})`,
                backdropFilter: `blur(${blurAmount}px)`,
            }}
        >
            <div
                className={cn(
                    "container mx-auto flex items-center justify-between px-4 h-full transition-all duration-300"
                )}
            >
                <GlitchLogo isScrolled={isScrolled} folio={folio} />

                <div
                    className={cn(
                        "hidden md:flex items-center gap-8 font-light text-sm uppercase tracking-widest text-muted-foreground",
                        folio &&
                            "gap-4 lg:gap-8 text-xs lg:text-sm tracking-wider lg:tracking-widest text-[#5e574a]"
                    )}
                >
                    <NavLink href="/search" folio={folio}>Find a Bunker</NavLink>
                    <NavLink href="/host" folio={folio}>Become a Warlord</NavLink>
                    <NavLink href="/experiences" folio={folio}>Raid Parties</NavLink>
                    {favorites.length > 0 && (
                        <Link
                            href="/favorites"
                            className="hover:text-accent transition-all flex items-center gap-2 group"
                        >
                            <Heart className="h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
                            <span className="tabular-nums">({favorites.length})</span>
                        </Link>
                    )}
                    {bookings.length > 0 && (
                        <Link
                            href="/bookings"
                            className="hover:text-primary transition-all flex items-center gap-2 group"
                        >
                            <CalendarCheck className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            <span className="tabular-nums">({bookings.length})</span>
                        </Link>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className={cn("items-center gap-4", folio ? "hidden 2xl:flex" : "flex")}>
                        <SystemStatusCompact />
                        <DefconIndicator />
                    </div>
                    <ScanLineButton
                        variant="tactical"
                        folio={folio}
                        className="hidden lg:flex"
                        onClick={() =>
                            toast.info("Authentication systems offline.", {
                                description:
                                    "Survivor ID verification requires a working satellite uplink.",
                            })
                        }
                    >
                        Sign In
                    </ScanLineButton>
                    <ScanLineButton
                        variant="tactical-gold"
                        folio={folio}
                        className={folio ? undefined : "shadow-[0_0_15px_rgba(212,175,55,0.15)]"}
                        onClick={() =>
                            toast.info("Survivors Only access coming soon.", {
                                description:
                                    "Elite membership requires 3+ confirmed apocalypse survivals.",
                            })
                        }
                    >
                        <Skull className="h-4 w-4" />
                        <span className="hidden sm:inline">Survivors Only</span>
                    </ScanLineButton>
                </div>

                <MobileMenu buttonClassName={folio ? "text-[#15130f] hover:bg-[#15130f]/10" : undefined} />
            </div>
        </nav>
    );
}
