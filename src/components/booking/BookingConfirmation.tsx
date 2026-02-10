"use client";

import { CheckCircle, Calendar, AlertTriangle, Clipboard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BookingConfirmationProps {
  confirmationNumber: string;
  bunkerName: string;
  nights: number;
  guests: number;
  total: number;
  currency: "CAPS" | "BTC";
  onClose: () => void;
}

const SURVIVAL_CHECKLIST = [
  "Pack at least 3 cans of mystery meat (origin unknown = plausible deniability)",
  "Bring your own toilet paper - bunker TP is rated 40-grit",
  "Practice your 'I definitely don't have the virus' cough",
  "Memorize the safe word: 'I come in peace and bring bottle caps'",
  "Leave your emotional baggage topside - storage is limited",
  "Learn to sleep with one eye open (literally, mutant neighbors)",
];

export function BookingConfirmation({
  confirmationNumber,
  bunkerName,
  nights,
  guests,
  total,
  currency,
  onClose,
}: BookingConfirmationProps) {
  const copyConfirmation = () => {
    navigator.clipboard.writeText(confirmationNumber);
    toast.success("Confirmation copied!", {
      description: "Tattooing it on your arm is still recommended."
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-black text-primary uppercase tracking-tight">
          Shelter Secured!
        </h2>
        <p className="text-muted-foreground mt-1">
          Your survival odds just increased by 0.02%
        </p>
      </div>

      {/* Confirmation Number */}
      <div className="bg-background border border-primary/30 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs uppercase text-muted-foreground font-bold">
              Confirmation Code
            </div>
            <div className="text-xl font-mono font-bold text-primary">
              {confirmationNumber}
            </div>
          </div>
          <button
            onClick={copyConfirmation}
            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-black transition-colors"
            aria-label="Copy confirmation number"
          >
            <Clipboard className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Memorize this. Paper burns. Phones die. Tattoos are forever.
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-background border border-border rounded-lg p-4 space-y-3">
        <h3 className="font-bold text-sm uppercase text-muted-foreground">
          Booking Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bunker</span>
            <span className="font-medium text-foreground">{bunkerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium text-foreground">{nights} night{nights > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Survivors</span>
            <span className="font-medium text-foreground">{guests} human{guests > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-in</span>
            <span className="font-medium text-foreground">When the sirens wail</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-out</span>
            <span className="font-medium text-foreground">If we survive</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">
                {currency === "CAPS" ? total : total.toFixed(4)} {currency}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Survival Checklist */}
      <div className="bg-background border border-secondary/30 rounded-lg p-4">
        <h3 className="font-bold text-sm uppercase text-secondary flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4" />
          Pre-Apocalypse Checklist
        </h3>
        <ul className="space-y-2">
          {SURVIVAL_CHECKLIST.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary font-mono text-xs mt-0.5">
                [{index + 1}]
              </span>
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add to Calendar (Disabled) */}
      <div className="relative group">
        <Button
          variant="outline"
          className="w-full opacity-50 cursor-not-allowed"
          disabled
        >
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border px-3 py-2 rounded-lg text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          <AlertTriangle className="h-3 w-3 inline mr-1 text-secondary" />
          Calendar apps don&apos;t survive EMPs
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-center">
        <p className="text-xs text-destructive font-medium">
          Cancellation Policy: Full refund up until nuclear event. No refunds after detonation.
          <br />
          <span className="text-destructive/60">
            Attempting to cancel during fallout will result in forfeiture of deposit and possibly limbs.
          </span>
        </p>
      </div>

      {/* Close Button */}
      <Button
        variant="default"
        size="lg"
        className="w-full"
        onClick={onClose}
      >
        Return to Bunker
      </Button>
    </div>
  );
}
