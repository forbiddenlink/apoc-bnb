"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
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
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-2xl">
                {/* Survivor ID Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 relative"
                >
                    <div className="bg-card border border-primary/30 rounded-xl p-6 relative overflow-hidden">
                        {/* Holographic shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer pointer-events-none" />

                        {/* HUD corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50" />

                        {/* Card header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Fingerprint className="h-5 w-5 text-primary" />
                                <span className="text-label text-primary">SURVIVOR ID CARD</span>
                            </div>
                            <div className="text-mono text-xs text-muted-foreground">
                                {survivorId}
                            </div>
                        </div>

                        {/* Profile info */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-lg bg-black border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                                    <ApocMascot expression="happy" size="lg" animate={false} />
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_var(--primary)]">
                                    <Radiation className="h-3 w-3 text-black" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-h3 font-black uppercase tracking-tight mb-1">
                                    Anonymous Survivor
                                </h1>
                                <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground mb-2">
                                    <span>REGISTERED: YEAR 3 PE</span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                    <span>CLEARANCE: STANDARD</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-xs text-primary">VERIFIED SURVIVOR</span>
                                </div>
                            </div>
                        </div>

                        {/* Scan line */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scanline" />
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
                    <div className="bg-card border border-border rounded-lg p-4 text-center relative overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="text-2xl font-black text-primary font-mono">
                            <AnimatedCounter value={bookings.length} />
                        </div>
                        <div className="text-label text-muted-foreground">Missions</div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20 group-hover:bg-primary/50 transition-colors" />
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center relative overflow-hidden group hover:border-accent/30 transition-colors">
                        <div className="text-2xl font-black text-accent font-mono">
                            <AnimatedCounter value={favorites.length} />
                        </div>
                        <div className="text-label text-muted-foreground">Targets</div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/20 group-hover:bg-accent/50 transition-colors" />
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center relative overflow-hidden group hover:border-secondary/30 transition-colors">
                        <div className="text-2xl font-black text-secondary font-mono">100%</div>
                        <div className="text-label text-muted-foreground">Survival</div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary/20 group-hover:bg-secondary/50 transition-colors" />
                    </div>
                </motion.div>

                {/* Menu Items - Navigation Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 mb-8"
                >
                    <div className="text-label text-muted-foreground mb-3 px-1">QUICK ACCESS</div>
                    {menuItems.map((item, index) => (
                        <Link key={item.label} href={item.href}>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
                                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group relative overflow-hidden"
                            >
                                {/* Scan line on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                                </div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`p-2 rounded border ${item.color.replace('text-', 'border-')}/20 ${item.color.replace('text-', 'bg-')}/10`}>
                                        <item.icon className={`h-4 w-4 ${item.color}`} />
                                    </div>
                                    <span className="font-bold">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-3 relative z-10">
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className="text-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
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
                    <div className="text-label text-muted-foreground mb-3 px-1">ACHIEVEMENTS</div>

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
                                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-label text-primary">SURVIVAL RANK: {rank}</span>
                                        <span className="text-mono text-xs text-muted-foreground">{unlockedCount}/{achievements.length} achievements unlocked</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden border border-border">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_8px_var(--primary)]"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <div className="text-mono text-[10px] text-muted-foreground mt-1 text-right">{percentage}%</div>
                                </div>

                                {/* Achievement grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {achievements.map((badge, index) => {
                                        const IconComponent = badge.icon;
                                        const colorVar = badge.color === "primary" ? "var(--primary)" : badge.color === "secondary" ? "var(--secondary)" : "var(--accent)";
                                        return (
                                            <div
                                                key={index}
                                                className={`relative p-3 rounded-lg border text-center transition-all ${
                                                    badge.unlocked
                                                        ? `bg-${badge.color}/10 border-${badge.color}/30`
                                                        : 'bg-muted/20 border-border opacity-40'
                                                }`}
                                                style={badge.unlocked ? { boxShadow: `0 0 12px color-mix(in srgb, ${colorVar} 25%, transparent)` } : undefined}
                                            >
                                                {!badge.unlocked && (
                                                    <div className="absolute top-1.5 right-1.5">
                                                        <Lock className="h-3 w-3 text-muted-foreground" />
                                                    </div>
                                                )}
                                                <div className="mb-1 flex justify-center">
                                                    <IconComponent className={`h-6 w-6 ${badge.unlocked ? `text-${badge.color}` : 'text-muted-foreground'}`} />
                                                </div>
                                                <div className={`text-[11px] font-bold uppercase ${badge.unlocked ? `text-${badge.color}` : 'text-muted-foreground'}`}>{badge.label}</div>
                                                <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{badge.description}</div>
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
                    className="containment-active p-6 text-center relative overflow-hidden"
                >
                    {/* HUD corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50" />

                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Fingerprint className="h-8 w-8 text-primary opacity-60" />
                    </div>
                    <h3 className="text-h3 mb-2">Sign in for full access</h3>
                    <p className="text-body-sm text-muted-foreground mb-6">
                        Sync your favorites and bookings across devices. Unlock all achievements.
                    </p>
                    <Button
                        variant="default"
                        className="w-full sm:w-auto relative overflow-hidden group"
                        onClick={() => toast.info("Authentication systems offline.", { description: "Survivor ID verification requires a working satellite uplink." })}
                    >
                        <span className="relative z-10">Authenticate</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    </Button>
                </motion.div>

            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
