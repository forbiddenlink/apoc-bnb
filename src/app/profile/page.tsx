"use client";

import { FolioShell } from "@/components/layout/FolioShell";
import { Button } from "@/components/ui/button";
import { ApocMascot } from "@/components/ui/ApocMascot";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { User, Shield, Heart, Calendar, Settings, LogOut, ChevronRight, Radiation, Fingerprint, Award, Star, Map, Skull, Crosshair, Crown, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Animated counter component
function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span>{count}</span>;
}

export default function ProfilePage() {
    useEffect(() => { document.title = "Survivor Profile | APOC-BNB"; }, []);

    const { favorites, bookings } = useAppStore();
    const [survivorId] = useState(() => `SRV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

    const menuItems = [
        { label: "My Favorites", icon: Heart, href: "/favorites", count: favorites.length, color: "text-accent" },
        { label: "My Bookings", icon: Calendar, href: "/bookings", count: bookings.length, color: "text-primary" },
        { label: "Survival Stats", icon: Shield, href: "/about", color: "text-secondary" },
        { label: "Settings", icon: Settings, href: "/about", color: "text-muted-foreground" },
    ];

    return (
        <FolioShell mainClassName="max-w-2xl">
            <div>
                {/* Survivor ID Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 relative"
                >
                    <div className="folio-card relative overflow-hidden p-5 md:p-6">
                        {/* Card header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Fingerprint className="h-5 w-5 text-primary" />
                                <span className="folio-label font-bold">SURVIVOR ID CARD</span>
                            </div>
                            <div className="text-mono text-xs text-muted-foreground">
                                {survivorId}
                            </div>
                        </div>

                        {/* Profile info */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="relative">
                                <div className="h-20 w-20 bg-[var(--soot)] border-2 border-[var(--soot)] flex items-center justify-center overflow-hidden">
                                    <ApocMascot expression="happy" size="lg" animate={false} />
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                    <Radiation className="h-3 w-3 text-primary-foreground" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h1 className="folio-display text-3xl mb-1">
                                    Anonymous Survivor
                                </h1>
                                <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground mb-2">
                                    <span>REGISTERED: YEAR 3 PE</span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                    <span>CLEARANCE: STANDARD</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[var(--oxide)]" />
                                    <span className="folio-label font-bold">VERIFIED SURVIVOR</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Stats - Animated Counters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 gap-4 mb-8"
                >
                    <div className="folio-card p-4 text-center relative overflow-hidden">
                        <div className="text-3xl font-bold font-mono tabular-nums">
                            <AnimatedCounter value={bookings.length} />
                        </div>
                        <div className="folio-label text-muted-foreground">Missions</div>
                    </div>
                    <div className="folio-card p-4 text-center relative overflow-hidden">
                        <div className="text-3xl font-bold font-mono tabular-nums">
                            <AnimatedCounter value={favorites.length} />
                        </div>
                        <div className="folio-label text-muted-foreground">Targets</div>
                    </div>
                    <div className="folio-card p-4 text-center relative overflow-hidden">
                        <div className="text-3xl font-bold font-mono tabular-nums">100%</div>
                        <div className="folio-label text-muted-foreground">Survival</div>
                    </div>
                </motion.div>

                {/* Menu Items - Navigation Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 mb-8"
                >
                    <div className="folio-label text-muted-foreground mb-3 px-1 border-b border-[var(--soot)] pb-2">QUICK ACCESS</div>
                    {menuItems.map((item, index) => (
                        <Link key={item.label} href={item.href}>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
                                className="folio-row flex min-h-14 items-center justify-between border-t border-[var(--soot)] p-4 transition-colors hover:bg-[var(--bone)] group relative overflow-hidden"
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="border border-[var(--soot)] bg-[var(--vellum)] p-2">
                                        <item.icon className="h-4 w-4" />
                                    </div>
                                    <span className="font-[family-name:var(--font-folio-display)] text-xl font-semibold">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-3 relative z-10">
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className="folio-label bg-[var(--soot)] text-[var(--geiger)] px-2 py-0.5">
                                            {item.count}
                                        </span>
                                    )}
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

                {/* Achievement Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-8"
                >
                    <div className="folio-label text-muted-foreground mb-3 px-1 border-b border-[var(--soot)] pb-2">ACHIEVEMENTS</div>

                    {/* Survival Rank Progress Bar */}
                    {(() => {
                        const achievements = [
                            { icon: Shield, label: "First Shelter", description: "Booked your first bunker", unlocked: bookings.length > 0, color: "primary" },
                            { icon: Star, label: "5-Star Survivor", description: "Left a 5-star review", unlocked: false, color: "secondary" },
                            { icon: Map, label: "Zone Explorer", description: "Visited 3+ zones", unlocked: false, color: "primary" },
                            { icon: Heart, label: "Collector", description: "Saved 5+ favorites", unlocked: favorites.length >= 5, color: "accent" },
                            { icon: Skull, label: "Death Defier", description: "Survived a Suicide Mission raid", unlocked: false, color: "accent" },
                            { icon: Radiation, label: "Rad Resistant", description: "Stayed in a Rad Level 3+ bunker", unlocked: false, color: "secondary" },
                            { icon: Crosshair, label: "Raider", description: "Joined 3+ raid parties", unlocked: false, color: "primary" },
                            { icon: Crown, label: "Warlord VIP", description: "Spent 1000+ CAPS total", unlocked: false, color: "secondary" },
                        ];
                        const unlockedCount = achievements.filter(a => a.unlocked).length;
                        const percentage = Math.round((unlockedCount / achievements.length) * 100);
                        const rank = unlockedCount === 0 ? "Rookie" : unlockedCount <= 2 ? "Scavenger" : unlockedCount <= 5 ? "Wasteland Vet" : "Warlord";

                        return (
                            <>
                                {/* Progress bar */}
                                <div className="folio-card p-4 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="folio-label font-bold">SURVIVAL RANK: {rank}</span>
                                        <span className="text-mono text-xs text-muted-foreground">{unlockedCount}/{achievements.length} achievements unlocked</span>
                                    </div>
                                    <div className="w-full h-3 bg-[var(--vellum)] overflow-hidden border border-[var(--soot)]">
                                        <div
                                            className="h-full bg-[var(--soot)] transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <div className="text-mono text-xs text-muted-foreground mt-1 text-right">{percentage}%</div>
                                </div>

                                {/* Achievement grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {achievements.map((badge, index) => {
                                        const IconComponent = badge.icon;
                                                                                return (
                                            <div
                                                key={index}
                                                className={`relative p-3 border text-center transition-all ${
                                                    badge.unlocked
                                                        ? 'bg-[var(--bone)] border-[var(--soot)] shadow-[3px_3px_0_var(--soot)]'
                                                        : 'bg-[var(--vellum)] border-dashed border-[var(--ash)]'
                                                }`}
                                               
                                            >
                                                {!badge.unlocked && (
                                                    <div className="absolute top-1.5 right-1.5">
                                                        <Lock className="h-3 w-3 text-muted-foreground" />
                                                    </div>
                                                )}
                                                <div className="mb-1 flex justify-center">
                                                    <IconComponent className={`h-6 w-6 ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`} />
                                                </div>
                                                <div className={`text-xs font-bold uppercase ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{badge.label}</div>
                                                <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{badge.description}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        );
                    })()}
                </motion.div>

                {/* Sign In CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="folio-card relative overflow-hidden p-6 text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[var(--soot)]">
                        <Fingerprint className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="folio-display mb-2 text-3xl">Sign in for full access</h3>
                    <p className="text-body-sm text-muted-foreground mb-6">
                        Sync your favorites and bookings across devices. Unlock all achievements.
                    </p>
                    <Button
                        variant="default"
                        className="min-h-11 w-full sm:w-auto"
                        onClick={() => toast.info("Authentication systems offline.", { description: "Survivor ID verification requires a working satellite uplink." })}
                    >
                        <span>Authenticate</span>
                    </Button>
                </motion.div>

            </div>
        </FolioShell>
    );
}
