"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { CalendarCheck, Search, Clock, Users, MapPin, Shield, Radiation, FileText, Timer, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Booking } from "@/types";
import { useState, useEffect } from "react";

// Status tab component
function StatusTabs({ active, onChange, counts }: {
    active: string;
    onChange: (status: string) => void;
    counts: Record<string, number>;
}) {
    const tabs = [
        { id: "all", label: "ALL", icon: FileText },
        { id: "confirmed", label: "UPCOMING", icon: CheckCircle2 },
        { id: "pending", label: "PENDING", icon: AlertCircle },
        { id: "cancelled", label: "CANCELLED", icon: XCircle },
    ];

    return (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded border text-sm font-bold transition-all whitespace-nowrap ${
                        active === tab.id
                            ? 'bg-primary/10 border-primary/50 text-primary'
                            : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                    }`}
                >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {counts[tab.id] > 0 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                            active === tab.id ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                            {counts[tab.id]}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
    const statusConfig = {
        pending: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30", icon: AlertCircle, label: "AWAITING CONFIRMATION" },
        confirmed: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30", icon: CheckCircle2, label: "CONFIRMED" },
        cancelled: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/30", icon: XCircle, label: "CANCELLED" },
    };

    const status = statusConfig[booking.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-card border rounded-xl p-6 transition-all relative overflow-hidden ${status.border} hover:shadow-lg`}
        >
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30" />

            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-label ${status.text} flex items-center gap-1`}>
                            <status.icon className="h-3 w-3" />
                            {status.label}
                        </span>
                    </div>
                    <h3 className="text-h3 text-foreground">
                        {booking.bunkerName}
                    </h3>
                </div>
                <div className="text-right">
                    <div className="text-mono text-xs text-muted-foreground mb-1">TOTAL</div>
                    <div className="text-2xl font-black text-primary">
                        {booking.total} <span className="text-sm font-normal text-muted-foreground">{booking.currency}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className={`p-3 rounded border ${status.bg} ${status.border}`}>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Timer className="h-3 w-3" />
                        <span className="text-label">Duration</span>
                    </div>
                    <span className="font-bold">{booking.nights} night{booking.nights !== 1 ? 's' : ''}</span>
                </div>
                <div className={`p-3 rounded border ${status.bg} ${status.border}`}>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="h-3 w-3" />
                        <span className="text-label">Party Size</span>
                    </div>
                    <span className="font-bold">{booking.guests} survivor{booking.guests !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-mono text-xs text-muted-foreground">
                    MISSION ID: <span className="text-primary">{booking.confirmationNumber}</span>
                </div>
                <Link href={`/bunkers/${booking.bunkerId}`}>
                    <Button variant="ghost" size="sm" className="gap-1 hover:text-primary">
                        <MapPin className="h-3 w-3" />
                        View Location
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}

export default function BookingsPage() {
    useEffect(() => { document.title = "Mission Log | APOC-BNB"; }, []);

    const { bookings } = useAppStore();
    const [activeTab, setActiveTab] = useState("all");

    // Sort by most recent first
    const sortedBookings = [...bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Filter by status
    const filteredBookings = activeTab === "all"
        ? sortedBookings
        : sortedBookings.filter(b => b.status === activeTab);

    const counts = {
        all: bookings.length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        pending: bookings.filter(b => b.status === "pending").length,
        cancelled: bookings.filter(b => b.status === "cancelled").length,
    };

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-4xl">
                {/* Header - Mission Log */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-label text-primary">MISSION LOG</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-h1 font-black uppercase tracking-tight mb-2 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded border border-primary/30">
                                    <CalendarCheck className="h-8 w-8 text-primary" />
                                </div>
                                Your Bookings
                            </h1>
                            <p className="text-muted-foreground">
                                {bookings.length > 0
                                    ? <><span className="text-primary font-bold">{counts.confirmed}</span> confirmed mission{counts.confirmed === 1 ? '' : 's'} logged</>
                                    : 'No missions logged yet'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Status Tabs */}
                {bookings.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <StatusTabs active={activeTab} onChange={setActiveTab} counts={counts} />
                    </motion.div>
                )}

                {filteredBookings.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        {filteredBookings.map((booking, index) => (
                            <BookingCard key={booking.id} booking={booking} index={index} />
                        ))}
                    </motion.div>
                ) : bookings.length > 0 ? (
                    // No bookings in current filter
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="text-muted-foreground">
                            No {activeTab} missions found.
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center py-16 md:py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-md mx-auto relative overflow-hidden"
                        >
                            {/* HUD corners */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/30" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/30" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/30" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/30" />

                            <div className="mb-6 relative">
                                <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
                                    <FileText className="h-12 w-12 text-primary/30" />
                                </div>
                            </div>
                            <div className="text-label text-primary mb-2">NO MISSIONS LOGGED</div>
                            <h2 className="text-h3 mb-3 text-foreground">
                                Mission Log Empty
                            </h2>
                            <p className="text-body-sm text-muted-foreground mb-8">
                                You haven&apos;t secured any shelters yet. When the bombs drop,
                                you&apos;ll want somewhere safe to hide.
                            </p>
                            <Link href="/search">
                                <Button variant="default" size="lg" className="gap-2 relative overflow-hidden group">
                                    <Search className="h-5 w-5" />
                                    <span className="relative z-10">Begin Mission</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
