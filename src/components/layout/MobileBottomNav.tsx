"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Heart, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/favorites", icon: Heart, label: "Saved" },
  { href: "/bookings", icon: Calendar, label: "Trips" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { favorites, bookings } = useAppStore();

  return (
    <div className="mobile-bottom-nav md:hidden">
      <nav className="mobile-bottom-nav-inner">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href === "/" && pathname === "/") ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          const showBadge =
            (item.href === "/favorites" && favorites.length > 0) ||
            (item.href === "/bookings" && bookings.length > 0);

          const badgeCount = item.href === "/favorites" ? favorites.length : bookings.length;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </motion.span>
                )}
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
