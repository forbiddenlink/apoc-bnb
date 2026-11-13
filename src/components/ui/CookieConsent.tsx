"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radiation } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "apoc-bnb-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // On phones the banner floats above the bottom nav; pad the page by its height
  // so the last rows and the booking button can always scroll clear of it.
  useEffect(() => {
    if (!visible) return;
    const el = panelRef.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      document.body.style.paddingBottom = mq.matches ? `${el.offsetHeight + 16}px` : "";
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    mq.addEventListener("change", apply);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", apply);
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

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
          <div
            ref={panelRef}
            className="relative bg-[var(--vellum)] text-[var(--soot)] border border-[var(--soot)] p-3 md:p-5 shadow-[3px_3px_0_var(--soot)]"
          >
            <div className="flex items-start gap-3">
              <Radiation className="h-5 w-5 text-[var(--oxide)] shrink-0 mt-0.5" />
              <div className="space-y-2 md:space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--oxide)] font-bold font-mono">
                  Cookie Rations Notice
                </p>
                <p className="text-xs md:text-sm text-[var(--soot)] leading-snug md:leading-relaxed">
                  This facility uses tracking cookies to monitor your survival
                  patterns, optimize bunker recommendations, and definitely not
                  sell your location data to raiders. By continuing, you consent
                  to our use of cookie rations under Post-Event Data Regulation
                  (PEDR) Article 7. Pre-war privacy laws no longer apply.
                </p>

                <div className="flex items-center gap-3">
                  <Button size="sm" onClick={dismiss} className="rounded-none bg-[var(--soot)] text-[var(--vellum)] hover:bg-[var(--oxide)] hover:text-[var(--vellum)] shadow-none">
                    Accept Rations
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reject} className="rounded-none text-[var(--soot)] border border-[var(--soot)]/40 hover:bg-[var(--bone)] hover:text-[var(--soot)]">
                    Reject &amp; Starve
                  </Button>
                </div>

                <p className="text-xs text-[var(--ash)]">
                  Learn more in our{" "}
                  <Link
                    href="/terms"
                    className="text-[var(--soot)] underline underline-offset-2 hover:text-[var(--oxide)] transition-colors"
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
