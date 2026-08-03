"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crosshair, Fingerprint, DoorOpen } from "lucide-react";

const protocols = [
  {
    code: "01",
    title: "Scout a Haven",
    body: "Filter by rad level, blast-door rating, and whether the host still answers radio. Map pins mark verified shelters — not vacation condos.",
    icon: Crosshair,
    stamp: "RECON",
  },
  {
    code: "02",
    title: "Spend Your Caps",
    body: "Book with bottle caps (or the occasional bitcoin). You get a clearance window, house rules carved in steel, and a host who may or may not be armed.",
    icon: Fingerprint,
    stamp: "CLEARANCE",
  },
  {
    code: "03",
    title: "Survive the Stay",
    body: "Check in. Don't ask about previous guests. Leave a review if you make it out. Five stars still means something when the grid is dead.",
    icon: DoorOpen,
    stamp: "EXFIL",
  },
];

export function MissionBriefing() {
  return (
    <section className="relative py-16 md:py-24 border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(57,255,20,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.4)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-label text-primary mb-3 tracking-[0.3em]">
            MISSION BRIEFING · PUBLIC CLEARANCE
          </p>
          <h2 className="text-h1 text-white mb-4">
            Airbnb, if the world{" "}
            <span className="text-gold-gradient">actually ended</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            APOC-BNB is a parody rental board for bunkers, vaults, missile silos, and other
            fortified weirdness. Browse listings, book with caps, and pretend the fallout is
            someone else&apos;s problem — for one night at a time.
          </p>
        </div>

        <ol className="grid gap-0 md:grid-cols-3 border border-white/10 bg-black/40">
          {protocols.map((step, i) => (
            <motion.li
              key={step.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className={`relative p-6 md:p-8 ${
                i < protocols.length - 1 ? "border-b md:border-b-0 md:border-r border-white/10" : ""
              }`}
            >
              <div className="absolute top-4 right-4 text-[10px] font-mono tracking-[0.2em] text-accent/70 rotate-[-6deg] border border-accent/40 px-2 py-0.5">
                {step.stamp}
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-3xl text-primary/80 tabular-nums">{step.code}</span>
                <step.icon className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>

              <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between border border-dashed border-secondary/30 bg-secondary/5 px-5 py-4">
          <p className="text-sm text-secondary/90 font-mono leading-relaxed">
            <span className="text-secondary font-bold">DISCLAIMER:</span> This is fiction.
            No real bunkers. No real bottle caps. Possibly real commitment to the bit.
          </p>
          <Link
            href="/about"
            className="shrink-0 text-xs uppercase tracking-[0.2em] text-primary border border-primary/40 px-4 py-2 hover:bg-primary/10 transition-colors text-center"
          >
            Read the Archives →
          </Link>
        </div>
      </div>
    </section>
  );
}
