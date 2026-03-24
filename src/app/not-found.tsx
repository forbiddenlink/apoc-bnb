"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApocMascot } from "@/components/ui/ApocMascot";
import { Radiation, Radio, Home } from "lucide-react";
import { useEffect, useState } from "react";

// Static noise effect
function StaticNoise() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
            <svg className="w-full h-full">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}

// Glitching text effect
function GlitchText({ children }: { children: string }) {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 100);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={`relative inline-block ${glitch ? 'animate-glitch' : ''}`}>
            {children}
            {glitch && (
                <>
                    <span className="absolute top-0 left-0.5 text-accent opacity-70 clip-glitch-1">{children}</span>
                    <span className="absolute top-0 -left-0.5 text-primary opacity-70 clip-glitch-2">{children}</span>
                </>
            )}
        </span>
    );
}

export default function NotFound() {
    const [errorCode] = useState(() => `ERR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
            {/* Static noise background */}
            <StaticNoise />

            {/* Scanlines Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[2]" />

            {/* Scan line sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent animate-scanline" />
            </div>

            {/* HUD corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/50" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/50" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/50" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/50" />

            {/* Warning indicators */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                <Radiation className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-label text-accent">SIGNAL INTERRUPTED</span>
                <Radiation className="h-4 w-4 text-accent animate-pulse" />
            </div>

            <div className="relative z-20 space-y-6 max-w-lg">
                <div className="flex justify-center mb-6">
                    <ApocMascot
                        expression="dead"
                        size="xl"
                        speech="ERROR: Location vaporized"
                        animate={true}
                    />
                </div>

                <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-accent via-accent to-transparent tracking-tighter">
                    <GlitchText>404</GlitchText>
                </h1>

                <h2 className="text-2xl font-bold uppercase tracking-widest text-accent text-glow-accent flex items-center justify-center gap-3">
                    <Radio className="h-5 w-5 animate-pulse" />
                    SIGNAL LOST
                    <Radio className="h-5 w-5 animate-pulse" />
                </h2>

                <p className="text-muted-foreground font-mono text-sm">
                    The coordinates you provided lead to a crater.<br />
                    Ideally, you are not currently standing in it.
                </p>

                {/* Error details */}
                <div className="bg-black/50 border border-accent/30 rounded p-4 font-mono text-xs text-left">
                    <div className="text-accent mb-2">[SYSTEM DIAGNOSTIC]</div>
                    <div className="text-muted-foreground space-y-1">
                        <div>ERROR CODE: <span className="text-accent">{errorCode}</span></div>
                        <div>STATUS: <span className="text-accent">LOCATION_NOT_FOUND</span></div>
                        <div>RECOMMENDATION: <span className="text-primary">RETURN TO BASE</span></div>
                    </div>
                </div>

                <div className="pt-4">
                    <Link href="/">
                        <Button size="xl" variant="default" className="w-full gap-2 relative overflow-hidden group">
                            <Home className="h-5 w-5" />
                            <span className="relative z-10">RETURN TO SAFETY</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Bottom status bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-mono text-xs text-muted-foreground z-20">
                APOC-BNB EMERGENCY PROTOCOL • {errorCode}
            </div>
        </div>
    );
}
