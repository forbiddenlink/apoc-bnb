"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { ApocMascot } from "@/components/ui/ApocMascot";
import { useAppStore } from "@/lib/store";
import { User, Shield, Heart, Calendar, Settings, LogOut, ChevronRight, Radiation } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
    const { favorites, bookings } = useAppStore();

    const menuItems = [
        { label: "My Favorites", icon: Heart, href: "/favorites", count: favorites.length, color: "text-accent" },
        { label: "My Bookings", icon: Calendar, href: "/bookings", count: bookings.length, color: "text-primary" },
        { label: "Survival Stats", icon: Shield, href: "#", color: "text-secondary" },
        { label: "Settings", icon: Settings, href: "#", color: "text-muted-foreground" },
    ];

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-2xl">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="relative inline-block mb-4">
                        <div className="h-24 w-24 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mx-auto">
                            <ApocMascot expression="happy" size="lg" animate={false} />
                        </div>
                        <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <Radiation className="h-3 w-3 text-black" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tight mb-1">
                        Anonymous Survivor
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Vault Dweller since 2024
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 gap-4 mb-8"
                >
                    <div className="containment-card-dotted p-4 text-center">
                        <div className="text-2xl font-black text-primary">{bookings.length}</div>
                        <div className="text-xs text-muted-foreground uppercase">Trips</div>
                    </div>
                    <div className="containment-card-dotted p-4 text-center">
                        <div className="text-2xl font-black text-accent">{favorites.length}</div>
                        <div className="text-xs text-muted-foreground uppercase">Saved</div>
                    </div>
                    <div className="containment-card-dotted p-4 text-center">
                        <div className="text-2xl font-black text-secondary">100%</div>
                        <div className="text-xs text-muted-foreground uppercase">Survival</div>
                    </div>
                </motion.div>

                {/* Menu Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 mb-8"
                >
                    {menuItems.map((item) => (
                        <Link key={item.label} href={item.href}>
                            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <item.icon className={`h-5 w-5 ${item.color}`} />
                                    <span className="font-bold">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                            {item.count}
                                        </span>
                                    )}
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>

                {/* Sign In CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="containment-active p-6 text-center"
                >
                    <User className="h-12 w-12 text-primary mx-auto mb-4 opacity-60" />
                    <h3 className="text-lg font-bold mb-2">Sign in for full access</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Sync your favorites and bookings across devices
                    </p>
                    <Button variant="neobrutal" className="w-full sm:w-auto">
                        Sign In
                    </Button>
                </motion.div>

            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
