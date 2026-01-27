"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Radiation, Skull, Heart } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useAppStore } from "@/lib/store";

export function Navbar() {
    const { favorites } = useAppStore();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link 
                    href="/" 
                    className="flex items-center gap-2 text-2xl font-black uppercase tracking-tighter text-primary hover:text-glow transition-all"
                    aria-label="APOC-BNB Home"
                >
                    <Radiation className="h-8 w-8 animate-spin-slow" aria-hidden="true" />
                    <span>APOC-BNB</span>
                </Link>

                <div className="hidden md:flex items-center gap-6 font-mono text-sm uppercase text-muted-foreground">
                    <Link href="/search" className="hover:text-primary transition-colors">
                        Find a Bunker
                    </Link>
                    <Link href="/host" className="hover:text-primary transition-colors">
                        Become a Warlord
                    </Link>
                    <Link href="/experiences" className="hover:text-primary transition-colors">
                        Raid Parties
                    </Link>
                    {favorites.length > 0 && (
                        <Link href="/favorites" className="hover:text-accent transition-colors flex items-center gap-1">
                            <Heart className="h-4 w-4 fill-current" />
                            <span>({favorites.length})</span>
                        </Link>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                        Sign In
                    </Button>
                    <Button variant="neobrutal" size="sm" className="gap-2">
                        <Skull className="h-4 w-4" />
                        <span className="hidden sm:inline">Survivors Only</span>
                    </Button>
                </div>

                <MobileMenu />
            </div>
        </nav>
    );
}
