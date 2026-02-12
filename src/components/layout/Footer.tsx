"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Radiation, Shield, AlertTriangle, Radio, MapPin, Mail, Skull } from "lucide-react";
import { ApocMascot } from "@/components/ui/ApocMascot";

const footerLinks = {
  discover: [
    { label: "Find Bunkers", href: "/search" },
    { label: "Raid Parties", href: "/experiences" },
    { label: "Safe Zones Map", href: "/search" },
    { label: "Survival Guides", href: "#" },
  ],
  hosting: [
    { label: "Become a Warlord", href: "/host" },
    { label: "Host Resources", href: "#" },
    { label: "Insurance Claims", href: "#" },
    { label: "Community Forum", href: "#" },
  ],
  support: [
    { label: "Emergency Protocol", href: "#" },
    { label: "Radiation FAQ", href: "#" },
    { label: "Contact Bunker HQ", href: "#" },
    { label: "Report Mutant", href: "#" },
  ],
  legal: [
    { label: "Terms of Survival", href: "#" },
    { label: "Privacy Bunker", href: "#" },
    { label: "Liability Waiver", href: "#" },
    { label: "Cookie Rations", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="footer-terminal relative z-10">
      {/* Warning Banner */}
      <div className="bg-secondary/10 border-b border-secondary/30 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-secondary text-sm font-mono">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
            <span className="uppercase tracking-wider">
              WARNING: Surface radiation levels elevated. Book shelter now.
            </span>
            <AlertTriangle className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <ApocMascot expression="happy" size="md" animate={false} />
              <div>
                <span className="text-2xl font-black uppercase tracking-tighter text-primary group-hover:text-glow-intense transition-all">
                  APOC-BNB
                </span>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Survival. Luxury. Radiation-Free.
                </p>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              The premier marketplace for post-apocalyptic accommodation.
              When civilization collapsed, our standards didn&apos;t.
            </p>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-mono">
                <Radio className="h-3 w-3 text-primary" />
                <span className="text-primary">BROADCASTING</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-mono">
                <Shield className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">ENCRYPTED</span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Bunker HQ, Sector 7-G</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>distress@apoc-bnb.com</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
              <Radiation className="h-4 w-4 text-primary" />
              Discover
            </h3>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
              <Skull className="h-4 w-4 text-secondary" />
              Hosting
            </h3>
            <ul className="space-y-3">
              {footerLinks.hosting.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>SYSTEM OPERATIONAL</span>
              <span className="text-border">|</span>
              <span>DAY {Math.floor((Date.now() - new Date('2024-01-01').getTime()) / 86400000)} SINCE COLLAPSE</span>
            </div>

            <p className="text-xs text-muted-foreground text-center md:text-right">
              &copy; {new Date().getFullYear()} APOC-BNB Inc. All rights reserved.
              <span className="hidden sm:inline"> Survival not guaranteed.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl pointer-events-none" />
    </footer>
  );
}
