"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BunkerComparison } from "@/components/features/BunkerComparison";
import { Crosshair } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparePage() {
  useEffect(() => { document.title = "Tactical Analysis | APOC-BNB"; }, []);

  return (
    <div className="min-h-screen bg-background font-sans noise-overlay">
      <Navbar />
      <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
        <div className="container mx-auto px-4">
          {/* Tactical Analysis Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Crosshair className="h-5 w-5 text-secondary" />
              <span className="text-label text-secondary">TACTICAL ANALYSIS</span>
            </div>
          </motion.div>
          <BunkerComparison />
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
