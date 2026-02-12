"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { CalendarCheck, Search, Clock, Users, MapPin, Shield, Radiation } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Booking } from "@/types";

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
    const statusColors = {
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        confirmed: "bg-green-500/20 text-green-400 border-green-500/50",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/50",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                        {booking.bunkerName}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded border ${statusColors[booking.status]}`}>
                        {booking.status.toUpperCase()}
                    </span>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-primary">
                        {booking.total} {booking.currency}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{booking.nights} night{booking.nights !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{booking.guests} survivor{booking.guests !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                    Confirmation: <span className="font-mono text-primary">{booking.confirmationNumber}</span>
                </div>
                <Link href={`/bunkers/${booking.bunkerId}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        View Bunker
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}

export default function BookingsPage() {
    const { bookings } = useAppStore();

    // Sort by most recent first
    const sortedBookings = [...bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const confirmedCount = bookings.filter(b => b.status === "confirmed").length;

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
                        <CalendarCheck className="h-10 w-10 text-primary" />
                        Your Bookings
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {bookings.length > 0
                            ? `${confirmedCount} confirmed shelter${confirmedCount === 1 ? '' : 's'} for the apocalypse`
                            : 'No bookings yet'}
                    </p>
                </motion.div>

                {sortedBookings.length > 0 ? (
                    <div className="space-y-4">
                        {sortedBookings.map((booking, index) => (
                            <BookingCard key={booking.id} booking={booking} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 md:py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="containment-card-dotted p-8 md:p-12 max-w-md mx-auto"
                        >
                            <div className="mb-6 relative">
                                <CalendarCheck className="h-20 w-20 md:h-24 md:w-24 text-primary/20 mx-auto" />
                                <Shield className="h-8 w-8 text-primary/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                                No Bookings Yet
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground mb-8">
                                You haven&apos;t secured any shelters yet. When the bombs drop,
                                you&apos;ll want somewhere safe to hide.
                            </p>
                            <Link href="/search">
                                <Button variant="neobrutal" size="lg" className="gap-2">
                                    <Search className="h-5 w-5" />
                                    Find a Bunker
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
