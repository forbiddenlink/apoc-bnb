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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative hover:text-primary transition-colors duration-200 group py-2"
        >
            <span className="relative z-10">{children}</span>
            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary shadow-[0_0_8px_rgba(57,255,20,0.5)] group-hover:w-full transition-all duration-300 ease-out" />
        </Link>
    );
}

function GlitchLogo({ isScrolled }: { isScrolled: boolean }) {
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
                    "text-2xl font-black uppercase tracking-[0.3em] text-white transition-all duration-300",
                    isScrolled && "text-xl tracking-[0.25em]",
                    isGlitching && "animate-glitch"
                )}
            >
                <span
                    className={cn(
                        "text-glow group-hover:text-glow-intense transition-all inline-block",
                        isGlitching && "text-primary"
                    )}
                >
                    APOC
                </span>
                <span
                    className={cn(
                        "transition-all inline-block",
                        "group-hover:text-secondary group-hover:text-glow-gold"
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
}: {
    children: React.ReactNode;
    variant: "tactical" | "tactical-gold";
    className?: string;
    onClick?: () => void;
}) {
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

export function Navbar() {
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
                isScrolled
                    ? "border-primary/20 shadow-[0_1px_20px_rgba(57,255,20,0.1)]"
                    : "border-border"
            )}
            style={{
                backgroundColor: `rgba(5, 5, 5, ${bgOpacity})`,
                backdropFilter: `blur(${blurAmount}px)`,
            }}
        >
            <div
                className={cn(
                    "container mx-auto flex items-center justify-between px-4 h-full transition-all duration-300"
                )}
            >
                <GlitchLogo isScrolled={isScrolled} />

                <div className="hidden md:flex items-center gap-8 font-light text-sm uppercase tracking-widest text-muted-foreground/80">
                    <NavLink href="/search">Find a Bunker</NavLink>
                    <NavLink href="/host">Become a Warlord</NavLink>
                    <NavLink href="/experiences">Raid Parties</NavLink>
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
                    <SystemStatusCompact />
                    <DefconIndicator />
                    <ScanLineButton
                        variant="tactical"
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
                        className="shadow-[0_0_15px_rgba(212,175,55,0.15)]"
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

                <MobileMenu />
            </div>
        </nav>
    );
}
