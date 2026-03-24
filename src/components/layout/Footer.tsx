"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Radiation,
    Shield,
    AlertTriangle,
    Radio,
    MapPin,
    Mail,
    Skull,
} from "lucide-react";
import { ApocMascot } from "@/components/ui/ApocMascot";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const footerLinks = {
    discover: [
        { label: "Find Bunkers", href: "/search" },
        { label: "Raid Parties", href: "/experiences" },
        { label: "Safe Zones Map", href: "/search" },
        { label: "Survival Guides", href: "/about" },
    ],
    hosting: [
        { label: "Become a Warlord", href: "/host" },
        { label: "Host Resources", href: "#" },
        { label: "Insurance Claims", href: "#" },
        { label: "Community Forum", href: "#" },
    ],
    support: [
        { label: "Emergency Protocol", href: "#" },
        { label: "Radiation FAQ", href: "#" },
        { label: "Contact Bunker HQ", href: "#" },
        { label: "Report Mutant", href: "#" },
    ],
    legal: [
        { label: "Terms of Survival", href: "#" },
        { label: "Privacy Bunker", href: "#" },
        { label: "Liability Waiver", href: "#" },
        { label: "Cookie Rations", href: "#" },
    ],
};

function GlitchingWarningText() {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.1) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 200);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className={cn(
                "uppercase tracking-wider transition-all",
                isGlitching && "animate-glitch text-accent"
            )}
        >
            WARNING: Surface radiation levels elevated. Book shelter now.
        </span>
    );
}

function LastSystemCheck() {
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutes((prev) => {
                // Reset occasionally to simulate new check
                if (prev >= 15 || Math.random() < 0.05) {
                    return 0;
                }
                return prev + 1;
            });
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="tabular-nums">
            Last check: {minutes === 0 ? "just now" : `${minutes}m ago`}
        </span>
    );
}

function FooterLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    if (href === "#") {
        return (
            <button
                onClick={() =>
                    toast.info(`${label} coming soon.`, {
                        description:
                            "Satellite uplink required. Check back after next supply drop.",
                    })
                }
                className="text-sm text-muted-foreground hover:text-primary transition-colors text-left group"
            >
                <span className="relative">
                    {label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </span>
            </button>
        );
    }

    return (
        <Link
            href={href}
            className="text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
            <span className="relative">
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </span>
        </Link>
    );
}

export function Footer() {
    const [logoClickCount, setLogoClickCount] = useState(0);
    const [showSignalLost, setShowSignalLost] = useState(false);

    // Reset click count after 2 seconds of no clicks
    useEffect(() => {
        if (logoClickCount > 0 && logoClickCount < 5) {
            const timeout = setTimeout(() => {
                setLogoClickCount(0);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [logoClickCount]);

    const handleLogoClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            const newCount = logoClickCount + 1;
            setLogoClickCount(newCount);

            if (newCount === 5) {
                // Trigger SIGNAL LOST easter egg
                setShowSignalLost(true);
                setLogoClickCount(0);

                // Reset after animation
                setTimeout(() => {
                    setShowSignalLost(false);
                }, 1500);

                toast.success("SIGNAL RESTORED", {
                    description: "Emergency broadcast system operational.",
                });
            }
        },
        [logoClickCount]
    );

    return (
        <>
            {/* Signal Lost Overlay */}
            <AnimatePresence>
                {showSignalLost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: [0, 1, 1, 0.5, 1, 0], scale: 1 }}
                            transition={{ duration: 1.5, times: [0, 0.1, 0.3, 0.5, 0.7, 1] }}
                            className="text-center"
                        >
                            <div className="text-6xl md:text-8xl font-black text-accent animate-glitch mb-4">
                                SIGNAL LOST
                            </div>
                            <div className="text-sm font-mono text-muted-foreground animate-pulse">
                                ATTEMPTING TO RECONNECT...
                            </div>
                            {/* Static noise effect */}
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="footer-terminal relative z-10">
                {/* Warning Banner with Animated Hazard Stripes */}
                <div className="relative bg-secondary/10 border-b border-secondary/30 py-3 overflow-hidden">
                    {/* Animated hazard stripes background */}
                    <div
                        className="absolute inset-0 opacity-20 animate-hazard-scroll"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 10px,
                rgba(212, 175, 55, 0.3) 10px,
                rgba(212, 175, 55, 0.3) 20px
              )`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex items-center justify-center gap-3 text-secondary text-sm font-mono">
                            <AlertTriangle className="h-4 w-4 animate-pulse" />
                            <GlitchingWarningText />
                            <AlertTriangle className="h-4 w-4 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-3 lg:col-span-2">
                            <button
                                onClick={handleLogoClick}
                                className="flex items-center gap-3 mb-6 group text-left"
                            >
                                <ApocMascot expression="happy" size="md" animate={false} />
                                <div>
                                    <span className="text-2xl font-black uppercase tracking-tighter text-primary group-hover:text-glow-intense transition-all block">
                                        APOC-BNB
                                    </span>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                        Survival. Luxury. Radiation-Free.
                                    </p>
                                </div>
                            </button>

                            <p className="text-muted-foreground text-sm mb-6 max-w-sm leading-relaxed">
                                The premier marketplace for post-apocalyptic accommodation. When
                                civilization collapsed, our standards didn&apos;t.
                            </p>

                            {/* Status Indicators */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-mono">
                                    <Radio className="h-3 w-3 text-primary animate-pulse" />
                                    <span className="text-primary">BROADCASTING</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-mono">
                                    <Shield className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">ENCRYPTED</span>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Bunker HQ, Sector 7-G</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>distress@apoc-bnb.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                                <Radiation className="h-4 w-4 text-primary" />
                                Discover
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.discover.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                                <Skull className="h-4 w-4 text-secondary" />
                                Hosting
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.hosting.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                                Support
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                                Legal
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span>SYSTEM OPERATIONAL</span>
                                <span className="text-border">|</span>
                                <LastSystemCheck />
                                <span className="text-border hidden sm:inline">|</span>
                                <span className="hidden sm:inline">
                                    DAY{" "}
                                    {Math.floor(
                                        (Date.now() - new Date("2024-01-01").getTime()) / 86400000
                                    )}{" "}
                                    POST-COLLAPSE
                                </span>
                            </div>

                            <p className="text-xs text-muted-foreground text-center md:text-right">
                                &copy; {new Date().getFullYear()} APOC-BNB Inc. All rights
                                reserved.
                                <span className="hidden sm:inline">
                                    {" "}
                                    Survival not guaranteed.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl pointer-events-none" />
            </footer>
        </>
    );
}
