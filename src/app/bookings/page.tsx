"use client";

import { FolioShell } from "@/components/layout/FolioShell";
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
                    className={`folio-label flex min-h-11 items-center gap-2 border border-[var(--soot)] px-4 py-2 font-bold transition-colors whitespace-nowrap ${
                        active === tab.id
                            ? 'bg-[var(--soot)] text-[var(--geiger)]'
                            : 'bg-[var(--vellum)] text-[var(--soot)] hover:bg-[var(--bone)]'
                    }`}
                >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {counts[tab.id] > 0 && (
                        <span className={`px-1.5 py-0.5 text-xs ${
                            active === tab.id ? 'bg-[var(--geiger)] text-[var(--soot)]' : 'bg-[var(--bone)]'
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
        pending: { chip: "border-dashed border-[var(--soot)] bg-[var(--vellum)] text-[var(--soot)]", border: "border-[var(--soot)]", icon: AlertCircle, label: "AWAITING CONFIRMATION" },
        confirmed: { chip: "border-[var(--soot)] bg-[var(--soot)] text-[var(--geiger)]", border: "border-[var(--soot)]", icon: CheckCircle2, label: "CONFIRMED" },
        cancelled: { chip: "border-[var(--oxide)] bg-[var(--vellum)] text-[var(--oxide)]", border: "border-[var(--oxide)]", icon: XCircle, label: "CANCELLED" },
    };

    const status = statusConfig[booking.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`folio-card relative overflow-hidden p-5 md:p-6 ${status.border}`}
        >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div className="min-w-0">
                    <span className={`folio-label mb-3 inline-flex items-center gap-1.5 border px-2 py-1 font-bold ${status.chip}`}>
                        <status.icon className="h-3.5 w-3.5" />
                        {status.label}
                    </span>
                    <h3 className="font-[family-name:var(--font-folio-display)] text-2xl font-bold leading-tight">
                        {booking.bunkerName}
                    </h3>
                </div>
                <div className="text-left sm:text-right">
                    <div className="folio-label text-muted-foreground mb-1">TOTAL</div>
                    <div className="font-mono text-2xl font-bold tabular-nums">
                        {booking.total} <span className="text-sm font-normal text-muted-foreground">{booking.currency}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="border border-[var(--soot)] bg-[var(--vellum)] p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Timer className="h-3.5 w-3.5" />
                        <span className="folio-label">Duration</span>
                    </div>
                    <span className="font-bold">{booking.nights} night{booking.nights !== 1 ? 's' : ''}</span>
                </div>
                <div className="border border-[var(--soot)] bg-[var(--vellum)] p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="h-3.5 w-3.5" />
                        <span className="folio-label">Party Size</span>
                    </div>
                    <span className="font-bold">{booking.guests} survivor{booking.guests !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-[var(--soot)]">
                <div className="folio-label text-muted-foreground">
                    MISSION ID: <span className="font-bold text-foreground">{booking.confirmationNumber}</span>
                </div>
                <Link href={`/bunkers/${booking.bunkerId}`}>
                    <Button variant="ghost" size="sm" className="min-h-11 gap-1 hover:bg-[var(--vellum)] hover:text-primary">
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
        <FolioShell mainClassName="max-w-4xl">
            <div>
                {/* Header - Mission Log */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 border-b-2 border-[var(--soot)] pb-6"
                >
                    <div className="folio-label mb-3 flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>MISSION LOG</span>
                    </div>
                    <h1 className="folio-display flex items-center gap-3 text-[clamp(2.5rem,7vw,4.5rem)]">
                        <CalendarCheck className="hidden h-10 w-10 shrink-0 sm:block" aria-hidden="true" />
                        Your Bookings
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        {bookings.length > 0
                            ? <><span className="font-bold text-foreground">{counts.confirmed}</span> confirmed mission{counts.confirmed === 1 ? '' : 's'} logged</>
                            : 'No missions logged yet'}
                    </p>
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="folio-card relative mx-auto max-w-md p-8 md:p-12"
                        >
                            <div className="mb-6">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[var(--soot)]">
                                    <FileText className="h-12 w-12" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="folio-label mb-2 text-muted-foreground">NO MISSIONS LOGGED</div>
                            <h2 className="folio-display mb-3 text-3xl">
                                Mission Log Empty
                            </h2>
                            <p className="mb-8 text-muted-foreground">
                                You haven&apos;t secured any shelters yet. When the bombs drop,
                                you&apos;ll want somewhere safe to hide.
                            </p>
                            <Link href="/search">
                                <Button variant="default" size="lg" className="min-h-11 gap-2">
                                    <Search className="h-5 w-5" />
                                    <span>Begin Mission</span>
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </div>
        </FolioShell>
    );
}
