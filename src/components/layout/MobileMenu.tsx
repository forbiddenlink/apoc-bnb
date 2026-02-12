"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Radiation, Heart, CalendarCheck, Search, Home, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ApocMascot } from "@/components/ui/ApocMascot";

const menuItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 }
  }),
  exit: { opacity: 0, x: 20 }
};

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, bookings } = useAppStore();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Find a Bunker", icon: Search },
    { href: "/host", label: "Become a Warlord", icon: Skull },
    { href: "/experiences", label: "Raid Parties", icon: Radiation },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground p-2 hover:bg-primary/10 rounded-lg transition-colors"
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
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 top-[60px]"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[60px] bottom-0 w-72 bg-card border-l border-primary/20 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center gap-3">
                <ApocMascot expression="happy" size="sm" animate={false} />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Navigation</div>
                  <div className="font-bold text-primary">APOC-BNB</div>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-foreground hover:text-primary hover:bg-primary/10 transition-all py-3 px-4 rounded-lg uppercase tracking-wide font-bold text-sm"
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Favorites & Bookings */}
                <div className="border-t border-border my-4 pt-4">
                  <motion.div
                    custom={navLinks.length}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href="/favorites"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-foreground hover:text-accent hover:bg-accent/10 transition-all py-3 px-4 rounded-lg uppercase tracking-wide font-bold text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <Heart className="h-5 w-5" />
                        Favorites
                      </span>
                      {favorites.length > 0 && (
                        <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                          {favorites.length}
                        </span>
                      )}
                    </Link>
                  </motion.div>

                  <motion.div
                    custom={navLinks.length + 1}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href="/bookings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-foreground hover:text-primary hover:bg-primary/10 transition-all py-3 px-4 rounded-lg uppercase tracking-wide font-bold text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <CalendarCheck className="h-5 w-5" />
                        Bookings
                      </span>
                      {bookings.length > 0 && (
                        <span className="bg-primary text-black text-xs px-2 py-0.5 rounded-full">
                          {bookings.length}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                </div>
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-border space-y-3">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Sign In
                </Button>
                <Button variant="neobrutal" size="sm" className="w-full gap-2">
                  <Radiation className="h-4 w-4" />
                  <span>Survivors Only</span>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
