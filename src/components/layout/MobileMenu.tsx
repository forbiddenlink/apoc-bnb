"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Radiation, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useAppStore();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 top-[60px]"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[60px] bottom-0 w-64 bg-card border-l border-border z-50 p-6"
            >
              <nav className="flex flex-col gap-4">
                <Link
                  href="/search"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 uppercase tracking-wide font-bold"
                >
                  Find a Bunker
                </Link>
                <Link
                  href="/host"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 uppercase tracking-wide font-bold"
                >
                  Become a Warlord
                </Link>
                <Link
                  href="/experiences"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 uppercase tracking-wide font-bold"
                >
                  Raid Parties
                </Link>

                {favorites.length > 0 && (
                  <Link
                    href="/favorites"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-accent transition-colors py-2 uppercase tracking-wide font-bold flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    Favorites ({favorites.length})
                  </Link>
                )}

                <div className="border-t border-border my-4" />

                <Button variant="ghost" size="sm" className="justify-start">
                  Sign In
                </Button>
                <Button variant="neobrutal" size="sm" className="gap-2">
                  <Radiation className="h-4 w-4" />
                  <span>Survivors Only</span>
                </Button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
