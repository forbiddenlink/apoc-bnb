"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Beer, Atom, Coins } from "lucide-react";
import { toast } from "sonner";

export function BookingWidget({ price, bunkerId }: { price: number; bunkerId?: string }) {
    const [currency, setCurrency] = useState<"CAPS" | "BTC">("CAPS");
    const [guests, setGuests] = useState(2);
    const [nights, setNights] = useState(3);
    const [isBooking, setIsBooking] = useState(false);

    const total = price * nights;
    const oxygenTax = Math.floor(total * 0.15);
    const protectionFee = Math.floor(total * 0.10);
    const finalTotal = total + oxygenTax + protectionFee;

    const handleBooking = async () => {
        if (guests < 1) {
            toast.error("At least 1 survivor required!");
            return;
        }
        if (nights < 1) {
            toast.error("Minimum 1 night stay required!");
            return;
        }

        setIsBooking(true);
        
        // Simulate booking process
        setTimeout(() => {
            setIsBooking(false);
            toast.success("Shelter secured! 🎉", {
                description: `Booked for ${nights} nights. You won't be charged until the nukes launch.`
            });
        }, 1500);
    };

    return (
        <div className="bg-card border border-border p-6 rounded-xl shadow-xl sticky top-24">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-3xl font-black text-foreground">{currency === "CAPS" ? price : (price / 10000).toFixed(4)}</span>
                    <span className="text-sm text-primary font-bold ml-1">{currency}</span>
                    <span className="text-muted-foreground text-sm"> / night</span>
                </div>
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                    <button
                        onClick={() => setCurrency("CAPS")}
                        className={`p-1.5 rounded-md transition-all ${currency === "CAPS" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
                    >
                        <Beer className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCurrency("BTC")}
                        className={`p-1.5 rounded-md transition-all ${currency === "BTC" ? "bg-secondary text-black" : "text-muted-foreground hover:text-white"}`}
                    >
                        <Coins className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="border border-border rounded-lg p-3 bg-background">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Nights</div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setNights(Math.max(1, nights - 1))}
                            className="h-6 w-6 rounded bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold"
                        >
                            -
                        </button>
                        <span className="text-sm font-bold">{nights}</span>
                        <button 
                            onClick={() => setNights(nights + 1)}
                            className="h-6 w-6 rounded bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-background">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Check-out</div>
                    <div className="text-sm font-bold">If we survive</div>
                </div>
                <div className="col-span-2 border border-border rounded-lg p-3 bg-background flex justify-between items-center group cursor-pointer hover:border-primary/50">
                    <div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Survivors</div>
                        <div className="text-sm font-bold">{guests} Humans</div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="h-6 w-6 rounded bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold">-</button>
                        <button onClick={() => setGuests(guests + 1)} className="h-6 w-6 rounded bg-muted hover:bg-primary hover:text-black flex items-center justify-center font-bold">+</button>
                    </div>
                </div>
            </div>

            <Button 
                size="xl" 
                variant="default" 
                className="w-full mb-4"
                onClick={handleBooking}
                disabled={isBooking}
            >
                {isBooking ? "SECURING..." : "SECURE SHELTER"}
            </Button>

            <div className="text-xs text-center text-muted-foreground mb-6">
                You won&apos;t be charged until the nukes launch.
            </div>

            <div className="space-y-2 text-sm text-foreground/80">
                <div className="flex justify-between">
                    <span className="underline decoration-dotted">Bunker x {nights} nights</span>
                    <span>{price * nights} {currency}</span>
                </div>
                <div className="flex justify-between text-secondary">
                    <span className="flex items-center gap-1"><Atom className="h-3 w-3" /> Oxygen Tax</span>
                    <span>{oxygenTax} {currency}</span>
                </div>
                <div className="flex justify-between">
                    <span className="underline decoration-dotted">Protection Fee</span>
                    <span>{protectionFee} {currency}</span>
                </div>
            </div>

            <div className="my-4 border-t border-border"></div>

            <div className="flex justify-between font-black text-xl">
                <span>Total</span>
                <span className="text-primary text-glow">{finalTotal} CAPS</span>
            </div>

        </div>
    );
}
