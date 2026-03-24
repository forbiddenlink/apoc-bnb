"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Beer, Coins, Lock, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Confetti } from "@/components/ui/Confetti";
import { Modal } from "@/components/ui/Modal";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { useBookBunker } from "@/lib/hooks/useBookBunker";
import { useSoundEffects } from "@/lib/hooks/useSoundEffects";
import { cn } from "@/lib/utils";

interface BookingWidgetProps {
    bunkerId: string;
    price: number;
    priceBtc?: number;
    bunkerName?: string;
    maxCapacity?: number;
    available?: boolean;
}

const MAX_NIGHTS = 30;

function AnimatedPrice({ value, currency }: { value: number; currency: string }) {
    const [displayValue, setDisplayValue] = useState(value);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (value !== displayValue) {
            setIsAnimating(true);
            const timeout = setTimeout(() => {
                setDisplayValue(value);
                setIsAnimating(false);
            }, 150);
            return () => clearTimeout(timeout);
        }
    }, [value, displayValue]);

    const formatted = currency === "CAPS"
        ? displayValue.toLocaleString()
        : displayValue.toFixed(4);

    return (
        <span className={cn(
            "transition-all duration-150 tabular-nums font-mono",
            isAnimating && "opacity-50 scale-95"
        )}>
            {formatted}
        </span>
    );
}

export function BookingWidget({
    bunkerId,
    price,
    priceBtc,
    bunkerName = "Unknown Bunker",
    maxCapacity = 50,
    available = true,
}: BookingWidgetProps) {
    const [currency, setCurrency] = useState<"CAPS" | "BTC">("CAPS");
    const [guests, setGuests] = useState(2);
    const [nights, setNights] = useState(3);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const bookBunker = useBookBunker();
    const { playSuccess, playError, playClick } = useSoundEffects();

    const btcPrice = priceBtc ?? price / 10000;
    const displayPrice = currency === "CAPS" ? price : btcPrice;

    const total = displayPrice * nights;
    const oxygenTax = currency === "CAPS" ? Math.floor(total * 0.15) : Number((total * 0.15).toFixed(4));
    const protectionFee = currency === "CAPS" ? Math.floor(total * 0.10) : Number((total * 0.10).toFixed(4));
    const finalTotal = currency === "CAPS" ? total + oxygenTax + protectionFee : Number((total + oxygenTax + protectionFee).toFixed(4));

    const handleBooking = () => {
        if (guests < 1) {
            toast.error("At least 1 survivor required!");
            playError();
            return;
        }
        if (nights < 1) {
            toast.error("Minimum 1 night stay required!");
            playError();
            return;
        }

        playClick();
        bookBunker.mutate(
            { bunkerId, bunkerName, guests, nights, total: finalTotal, currency },
            {
                onSuccess: (data) => {
                    setConfirmationNumber(data.booking.confirmationNumber);
                    setShowConfetti(true);
                    setShowConfirmation(true);
                    playSuccess();
                },
                onError: () => playError(),
            }
        );
    };

    return (
        <>
            <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
            <Modal isOpen={showConfirmation} onClose={() => { setShowConfirmation(false); setShowConfetti(false); }} size="md">
                <BookingConfirmation
                    confirmationNumber={confirmationNumber}
                    bunkerName={bunkerName}
                    nights={nights}
                    guests={guests}
                    total={finalTotal}
                    currency={currency}
                    onClose={() => { setShowConfirmation(false); setShowConfetti(false); }}
                />
            </Modal>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cn(
                    "relative bg-black/80 backdrop-blur-xl border-2 p-5 sm:p-6 lg:sticky lg:top-24",
                    "rounded-none shadow-2xl",
                    "transition-all duration-500",
                    available
                        ? "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(57,255,20,0.15)]"
                        : "border-muted/30"
                )}
            >
                {/* HUD Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50 -translate-x-0.5 -translate-y-0.5" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/50 translate-x-0.5 -translate-y-0.5" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/50 -translate-x-0.5 translate-y-0.5" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50 translate-x-0.5 translate-y-0.5" />

                {/* Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-label text-muted-foreground">SECURE YOUR HAVEN</span>
                </div>

                {/* Price Display */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-foreground">
                                <AnimatedPrice value={displayPrice} currency={currency} />
                            </span>
                            <span className="text-lg font-bold text-primary">{currency}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">/ night</span>
                    </div>
                    <div className="flex gap-1 bg-black/50 p-1 border border-white/10" role="group">
                        <button
                            type="button"
                            onClick={() => setCurrency("CAPS")}
                            className={cn(
                                "p-2 transition-all",
                                currency === "CAPS"
                                    ? "bg-primary text-black"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Beer className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrency("BTC")}
                            className={cn(
                                "p-2 transition-all",
                                currency === "BTC"
                                    ? "bg-secondary text-black"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Coins className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Booking Inputs */}
                <div className="space-y-3 mb-6">
                    {/* Arrival / Extraction */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="border border-white/10 bg-black/30 p-3 hover:border-primary/30 transition-colors">
                            <div className="text-label text-muted-foreground mb-1">ARRIVAL DATE</div>
                            <div className="text-sm font-bold text-white">When ready</div>
                        </div>
                        <div className="border border-white/10 bg-black/30 p-3 hover:border-primary/30 transition-colors">
                            <div className="text-label text-muted-foreground mb-1">EXTRACTION</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white font-mono">{nights} nights</span>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setNights(Math.max(1, nights - 1))}
                                        className="h-6 w-6 border border-white/20 hover:bg-primary hover:text-black hover:border-primary flex items-center justify-center transition-all active:scale-95"
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNights(Math.min(MAX_NIGHTS, nights + 1))}
                                        className="h-6 w-6 border border-white/20 hover:bg-primary hover:text-black hover:border-primary flex items-center justify-center transition-all active:scale-95"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Survivors */}
                    <div className="border border-white/10 bg-black/30 p-3 hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-label text-muted-foreground mb-1">SURVIVORS IN PARTY</div>
                                <div className="text-sm font-bold text-white font-mono">{guests} humans</div>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => setGuests(Math.max(1, guests - 1))}
                                    className="h-8 w-8 border border-white/20 hover:bg-primary hover:text-black hover:border-primary flex items-center justify-center transition-all active:scale-95"
                                >
                                    -
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGuests(Math.min(maxCapacity, guests + 1))}
                                    className={cn(
                                        "h-8 w-8 border border-white/20 flex items-center justify-center transition-all active:scale-95",
                                        guests >= maxCapacity
                                            ? "border-accent/50 text-accent cursor-not-allowed"
                                            : "hover:bg-primary hover:text-black hover:border-primary"
                                    )}
                                    disabled={guests >= maxCapacity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {guests >= maxCapacity && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-accent">
                                <AlertTriangle className="h-3 w-3" />
                                <span>MAX CAPACITY REACHED</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Price Breakdown Toggle */}
                <button
                    type="button"
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-white transition-colors"
                >
                    <span className="text-label">VIEW MISSION COSTS</span>
                    {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                <AnimatePresence>
                    {showBreakdown && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-2 py-3 border-y border-white/5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Bunker × {nights} nights</span>
                                    <span className="font-mono"><AnimatedPrice value={total} currency={currency} /> {currency}</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Oxygen Tax (15%)</span>
                                    <span className="font-mono">{currency === "CAPS" ? oxygenTax : oxygenTax.toFixed(4)} {currency}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Protection Fee (10%)</span>
                                    <span className="font-mono">{currency === "CAPS" ? protectionFee : protectionFee.toFixed(4)} {currency}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-white/10 mt-2">
                    <span className="font-bold text-lg">TOTAL</span>
                    <span className="text-2xl font-black text-primary text-glow font-mono">
                        <AnimatedPrice value={finalTotal} currency={currency} /> {currency}
                    </span>
                </div>

                {/* CTA Button */}
                <Button
                    size="xl"
                    variant="default"
                    className={cn(
                        "w-full h-14 text-lg tracking-widest rounded-none relative overflow-hidden group",
                        "shadow-[0_0_20px_rgba(57,255,20,0.2)]",
                        !available && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={handleBooking}
                    disabled={bookBunker.isPending || !available}
                >
                    {/* Scan line effect */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="absolute inset-0 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    </span>
                    <span className="relative z-10">
                        {!available ? "UNAVAILABLE" : bookBunker.isPending ? "PROCESSING..." : "INITIATE BOOKING"}
                    </span>
                </Button>

                {/* Disclaimer */}
                <p className="text-[10px] text-center text-muted-foreground mt-4 font-mono">
                    {!available
                        ? "This shelter is currently occupied or off-market."
                        : "Charges applied upon nuclear event confirmation."}
                </p>

                {/* Scan line decoration */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </>
    );
}
