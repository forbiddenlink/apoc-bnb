"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radiation } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "apoc-bnb-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
    toast("Cookie rations rejected. Your experience may be less optimized. And hungrier.");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-[4.5rem] left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-lg z-[60]"
        >
          <div className="relative bg-[var(--soot)] text-[var(--bone)] border border-[var(--bone)]/40 rounded-sm p-2.5 md:p-5 shadow-[3px_3px_0_var(--oxide)]">
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50 -translate-x-0.5 -translate-y-0.5" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/50 translate-x-0.5 -translate-y-0.5" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/50 -translate-x-0.5 translate-y-0.5" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50 translate-x-0.5 translate-y-0.5" />

            {/* Scanline top border */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="flex items-start gap-3">
              <Radiation className="h-5 w-5 text-[var(--geiger)] shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1.5 md:space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--geiger)] font-bold font-mono">
                  Cookie Rations Notice
                </p>
                <p className="text-[0.6875rem] md:text-sm text-[var(--bone)]/85 leading-snug md:leading-relaxed">
                  This facility uses tracking cookies to monitor your survival
                  patterns, optimize bunker recommendations, and definitely not
                  sell your location data to raiders. By continuing, you consent
                  to our use of cookie rations under Post-Event Data Regulation
                  (PEDR) Article 7. Pre-war privacy laws no longer apply.
                </p>

                <div className="flex items-center gap-3">
                  <Button size="sm" onClick={dismiss} className="bg-[var(--geiger)] text-[var(--soot)] hover:bg-[var(--geiger)]/90">
                    Accept Rations
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reject} className="text-[var(--bone)] hover:bg-[var(--bone)]/10 hover:text-[var(--bone)]">
                    Reject &amp; Starve
                  </Button>
                </div>

                <p className="text-[0.6875rem] md:text-xs text-[var(--bone)]/70">
                  Learn more in our{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-2 hover:text-[var(--geiger)] transition-colors"
                  >
                    Terms of Survival
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
