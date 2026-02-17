"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skull, Heart, CalendarCheck } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useAppStore } from "@/lib/store";
import { DefconIndicator } from "@/components/ui/DefconIndicator";
import { SystemStatusCompact } from "@/components/ui/SystemStatus";
import { ApocMascot } from "@/components/ui/ApocMascot";

export function Navbar() {
    const { favorites, bookings } = useAppStore();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-2xl font-black uppercase tracking-[0.3em] text-white hover:text-primary transition-all group"
                    aria-label="APOC-BNB Home"
                >
                    <ApocMascot expression="happy" size="sm" animate={false} />
                    <span className="text-glow group-hover:text-glow-intense transition-all">APOC-BNB</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-light text-sm uppercase tracking-widest text-muted-foreground/80">
                    <Link href="/search" className="hover:text-primary hover:text-glow transition-all">
                        Find a Bunker
                    </Link>
                    <Link href="/host" className="hover:text-primary hover:text-glow transition-all">
                        Become a Warlord
                    </Link>
                    <Link href="/experiences" className="hover:text-primary hover:text-glow transition-all">
                        Raid Parties
                    </Link>
                    {favorites.length > 0 && (
                        <Link href="/favorites" className="hover:text-accent hover:text-glow-accent transition-all flex items-center gap-2">
                            <Heart className="h-4 w-4 fill-current" />
                            <span>({favorites.length})</span>
                        </Link>
                    )}
                    {bookings.length > 0 && (
                        <Link href="/bookings" className="hover:text-primary hover:text-glow transition-all flex items-center gap-2">
                            <CalendarCheck className="h-4 w-4" />
                            <span>({bookings.length})</span>
                        </Link>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <SystemStatusCompact />
                    <DefconIndicator />
                    <Button variant="tactical" size="sm" className="hidden lg:flex">
                        Sign In
                    </Button>
                    <Button variant="tactical-gold" size="sm" className="gap-2 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                        <Skull className="h-4 w-4" />
                        <span className="hidden sm:inline">Survivors Only</span>
                    </Button>
                </div>

                <MobileMenu />
            </div>
        </nav>
    );
}
