"use client";

import { useState, useMemo } from "react";
import { CheckCircle, Calendar, AlertTriangle, Clipboard, ShieldCheck, Radio, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Confetti } from "@/components/ui/Confetti";
import { ApocMascot } from "@/components/ui/ApocMascot";

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

const SURVIVAL_BRIEFING_POOL = [
  "Pack light. Panic heavy.",
  "Your host has been notified. They may or may not respond. That's normal.",
  "Emergency exits are marked. Whether they work is between you and fate.",
  "Remember: the scratching sounds are always the water recycling system. Always.",
  "Your booking is non-refundable. Your survival is non-guaranteed.",
  "Tip your host in CAPS. Tip generously if they seem unstable.",
  "Review the banned items list one more time. Seriously.",
  "If you don't check in within 24 hours of your booking, we assume the worst.",
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function formatMilitaryCode(code: string): string {
  // Convert confirmation to military-style format: BRAVO-7734-TANGO
  const nato = ["ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO", "FOXTROT", "GOLF", "HOTEL", "INDIA", "JULIET", "KILO", "LIMA", "MIKE", "NOVEMBER", "OSCAR", "PAPA", "QUEBEC", "ROMEO", "SIERRA", "TANGO"];
  const hash = code.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const prefix = nato[hash % nato.length];
  const suffix = nato[(hash * 7) % nato.length];
  return `${prefix}-${code}-${suffix}`;
}

const MISSION_STEPS = [
  { label: "BOOKING CONFIRMED", done: true, note: null },
  { label: "HOST NOTIFIED", done: true, note: "Response time varies. Some hosts use ravens." },
  { label: "DECONTAMINATION SCHEDULED", done: false, note: null },
  { label: "CHECK-IN", done: false, note: null },
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
  const [showConfetti, setShowConfetti] = useState(true);

  const survivalTips = useMemo(() => pickRandom(SURVIVAL_BRIEFING_POOL, 4), []);
  const militaryCode = useMemo(() => formatMilitaryCode(confirmationNumber), [confirmationNumber]);

  const copyConfirmation = () => {
    navigator.clipboard.writeText(militaryCode);
    toast.success("Confirmation copied!", {
      description: "Tattooing it on your arm is still recommended."
    });
  };

  const handleShare = () => {
    toast.error("TRANSMISSION BLOCKED", {
      description: "Sharing disabled. Loose lips attract raiders.",
      icon: <AlertTriangle className="h-4 w-4" />,
    });
  };

  return (
    <div className="space-y-6 relative">
      <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Success Header with Mascot */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <ApocMascot
            expression="excited"
            size="lg"
            speech="YOU'RE NOT DEAD YET!"
          />
        </div>
        <h2 className="text-2xl font-black text-primary uppercase tracking-tight">
          MISSION BRIEFING: SHELTER SECURED
        </h2>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          Your survival odds just increased by 0.02% // CLASSIFIED
        </p>
      </div>

      {/* Confirmation Number - Military Format */}
      <div className="relative bg-background border border-primary/30 rounded-lg p-4">
        {/* HUD Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50 -translate-x-0.5 -translate-y-0.5" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/50 translate-x-0.5 -translate-y-0.5" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/50 -translate-x-0.5 translate-y-0.5" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50 translate-x-0.5 translate-y-0.5" />

        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs uppercase text-muted-foreground font-bold tracking-widest">
              OPERATIVE DESIGNATION
            </div>
            <div className="text-lg font-mono font-bold text-primary">
              {militaryCode}
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
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Memorize this. Paper burns. Phones die. Tattoos are forever.
        </p>
      </div>

      {/* MISSION STATUS Timeline */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h3 className="font-bold text-sm uppercase text-muted-foreground flex items-center gap-2 mb-4 tracking-widest">
          <Radio className="h-4 w-4 text-primary" />
          MISSION STATUS
        </h3>
        <div className="space-y-3">
          {MISSION_STEPS.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {step.done ? "\u2713" : index + 1}
                </div>
                {index < MISSION_STEPS.length - 1 && (
                  <div
                    className={`w-px h-4 mt-1 ${
                      step.done ? "bg-primary/30" : "bg-border"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 -mt-0.5">
                <div
                  className={`text-sm font-bold font-mono ${
                    step.done ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.label} {step.done && <span className="text-primary">&#10003;</span>}
                </div>
                {step.note && (
                  <p className="text-xs text-muted-foreground/70 italic mt-0.5">
                    {step.note}
                  </p>
                )}
                {!step.done && (
                  <p className="text-xs text-muted-foreground/50 font-mono mt-0.5">
                    PENDING
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-background border border-border rounded-lg p-4 space-y-3">
        <h3 className="font-bold text-sm uppercase text-muted-foreground tracking-widest">
          INTEL SUMMARY
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Target</span>
            <span className="font-medium text-foreground">{bunkerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium text-foreground">{nights} night{nights > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Operatives</span>
            <span className="font-medium text-foreground">{guests} human{guests > 1 ? 's' : ''} (allegedly)</span>
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

      {/* SURVIVAL BRIEFING - Random Tips */}
      <div className="relative bg-background border border-secondary/30 rounded-lg p-4">
        {/* HUD Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-secondary/50 -translate-x-0.5 -translate-y-0.5" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-secondary/50 translate-x-0.5 -translate-y-0.5" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-secondary/50 -translate-x-0.5 translate-y-0.5" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-secondary/50 translate-x-0.5 translate-y-0.5" />

        <h3 className="font-bold text-sm uppercase text-secondary flex items-center gap-2 mb-3 tracking-widest">
          <AlertTriangle className="h-4 w-4" />
          SURVIVAL BRIEFING // EYES ONLY
        </h3>
        <ul className="space-y-2">
          {survivalTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-secondary font-mono text-xs mt-0.5 shrink-0">
                [{String.fromCharCode(65 + index)}]
              </span>
              <span className="text-foreground/80 italic">&quot;{tip}&quot;</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pre-Apocalypse Checklist */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h3 className="font-bold text-sm uppercase text-primary flex items-center gap-2 mb-3 tracking-widest">
          <ShieldCheck className="h-4 w-4" />
          PRE-DEPLOYMENT CHECKLIST
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

      {/* Share Your Survival Plan */}
      <Button
        variant="outline"
        className="w-full border-primary/30 hover:border-primary/60"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4 mr-2" />
        SHARE YOUR SURVIVAL PLAN
      </Button>

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
        RETURN TO BASE
      </Button>
    </div>
  );
}
