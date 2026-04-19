"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { HostAvatar } from "@/components/ui/HostAvatar";
import { HostQuirkBadge } from "@/components/ui/HostQuirkBadge";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { CompareButton } from "@/components/ui/CompareButton";
import { IncidentReport } from "@/components/bunker/IncidentReport";
import { PageTransition, ScrollReveal } from "@/components/ui/PageTransition";
import {
    ShieldCheck, Wind, Radio, WifiOff, Star, MapPin, Users, AlertTriangle,
    Leaf, Sparkles, Monitor, Package, Crosshair, Satellite, Map, Mountain,
    Droplet, Flame, Eye, Rocket, Globe, Zap, Activity, Heart, UtensilsCrossed,
    Film, Maximize, ShoppingBag, TrendingUp, Smile, Sun, Unlock, Music,
    X, Truck, BookOpen, Ban, Thermometer, ArrowUp, Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Bunker, Review } from "@/types";

interface BunkerDetailsContentProps {
    bunker: Bunker;
    reviews: Review[];
}

function RadiationGauge({ level }: { level: number }) {
    const percentage = (level / 10) * 100;
    const color = level <= 2 ? "text-primary" : level <= 4 ? "text-secondary" : "text-accent";
    const bgColor = level <= 2 ? "bg-primary" : level <= 4 ? "bg-secondary" : "bg-accent";
    const glowColor = level <= 2 ? "shadow-[0_0_20px_rgba(57,255,20,0.5)]" : level <= 4 ? "shadow-[0_0_20px_rgba(212,175,55,0.5)]" : "shadow-[0_0_20px_rgba(255,0,60,0.5)]";
    const label = level <= 2 ? "MINIMAL" : level <= 4 ? "ELEVATED" : "CRITICAL";

    return (
        <div className="relative">
            {/* Gauge Arc */}
            <svg viewBox="0 0 100 60" className="w-full h-auto">
                {/* Background arc */}
                <path
                    d="M 10 55 A 40 40 0 0 1 90 55"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Filled arc */}
                <motion.path
                    d="M 10 55 A 40 40 0 0 1 90 55"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={color}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: percentage / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                {/* Needle */}
                <motion.line
                    x1="50"
                    y1="55"
                    x2="50"
                    y2="20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ rotate: -90 }}
                    whileInView={{ rotate: -90 + (percentage * 1.8) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    style={{ transformOrigin: "50px 55px" }}
                />
                {/* Center dot */}
                <circle cx="50" cy="55" r="4" className={`fill-current ${color}`} />
            </svg>
            {/* Value display */}
            <div className="text-center -mt-2">
                <span className={cn("text-3xl font-black font-mono", color)}>{level}</span>
                <span className="text-muted-foreground text-sm">/10</span>
            </div>
            <div className={cn("text-center text-xs font-bold uppercase tracking-widest mt-1", color)}>
                {label}
            </div>
        </div>
    );
}

function SpecCard({ label, value, subValue, icon: Icon, color = "text-primary" }: {
    label: string;
    value: string | number;
    subValue?: string;
    icon: React.ElementType;
    color?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-black/40 border border-white/10 p-4 hover:border-primary/30 transition-colors group"
        >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/30 group-hover:border-primary/60 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/30 group-hover:border-primary/60 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/30 group-hover:border-primary/60 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/30 group-hover:border-primary/60 transition-colors" />

            <div className="flex items-start gap-3">
                <div className={cn("p-2 bg-white/5 border border-white/10", color)}>
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <div className="text-label text-muted-foreground mb-1">{label}</div>
                    <div className={cn("text-xl font-bold font-mono", color)}>{value}</div>
                    {subValue && <div className="text-xs text-muted-foreground">{subValue}</div>}
                </div>
            </div>
        </motion.div>
    );
}

export function BunkerDetailsContent({ bunker, reviews }: BunkerDetailsContentProps) {
    const isHighRad = bunker.features.radLevel > 3;
    const [activeImage, setActiveImage] = useState(0);

    const iconMap: Record<string, React.ElementType> = {
        'wind': Wind, 'shield': ShieldCheck, 'radio': Radio, 'wifi-off': WifiOff,
        'leaf': Leaf, 'sparkles': Sparkles, 'monitor': Monitor, 'package': Package,
        'crosshair': Crosshair, 'satellite': Satellite, 'map': Map, 'mountain': Mountain,
        'droplet': Droplet, 'flame': Flame, 'eye': Eye, 'rocket': Rocket,
        'globe': Globe, 'zap': Zap, 'activity': Activity, 'heart': Heart,
        'utensils': UtensilsCrossed, 'film': Film, 'maximize': Maximize,
        'shopping-bag': ShoppingBag, 'trending-up': TrendingUp, 'smile': Smile,
        'sun': Sun, 'unlock': Unlock, 'users': Users, 'music': Music,
        'x': X, 'truck': Truck, 'book': BookOpen, 'star': Star, 'ban': Ban,
        'thermometer': Thermometer, 'arrow-up': ArrowUp,
    };

    return (
        <PageTransition className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-7xl">
                {/* Warning Banners */}
                {!bunker.availability && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-muted/50 border border-border flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div className="text-sm">
                            <span className="font-bold text-foreground">CURRENTLY UNAVAILABLE</span>
                            <span className="text-muted-foreground ml-2">This shelter is occupied or off-market.</span>
                        </div>
                    </motion.div>
                )}

                {isHighRad && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-accent/10 border border-accent/30 flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5 text-accent animate-pulse flex-shrink-0" />
                        <div className="text-sm">
                            <span className="font-bold text-accent">HIGH RADIATION ZONE</span>
                            <span className="text-muted-foreground ml-2">Protective gear recommended.</span>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <ScrollReveal>
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-3">
                            <h1 className="text-h1 uppercase tracking-tight">{bunker.title}</h1>
                            <div className="flex gap-2">
                                <CompareButton bunkerId={bunker.id} />
                                <FavoriteButton bunkerId={bunker.id} size="lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 font-bold text-secondary">
                                <Star className="h-4 w-4 fill-secondary" /> {bunker.rating.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                                {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                            </span>
                            {bunker.host.isSuperhost && (
                                <>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="flex items-center gap-1 text-primary font-bold">
                                        <ShieldCheck className="h-4 w-4" /> Superhost
                                    </span>
                                </>
                            )}
                            <span className="text-muted-foreground">•</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-primary/70" />
                                {bunker.location.name}, {bunker.location.region}
                            </span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Gallery */}
                <ScrollReveal delay={0.1}>
                    <div className="mb-12">
                        {/* Main Image */}
                        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden border border-white/10 mb-2">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={bunker.images[activeImage]}
                                    alt={bunker.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            {/* Image counter */}
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-sm font-mono">
                                {activeImage + 1} / {bunker.images.length}
                            </div>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {bunker.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={cn(
                                        "relative flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all",
                                        activeImage === index
                                            ? "border-primary shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                                            : "border-white/10 hover:border-white/30"
                                    )}
                                >
                                    <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Host Dossier */}
                        <ScrollReveal>
                            <div className="relative p-6 bg-black/30 border border-white/10">
                                <div className="absolute top-2 right-2 text-label text-muted-foreground/50 rotate-3">
                                    CLASSIFIED
                                </div>
                                <div className="flex items-start gap-4">
                                    <HostAvatar
                                        name={bunker.host.name}
                                        isSuperhost={bunker.host.isSuperhost}
                                        avatar={bunker.host.avatar}
                                        size="lg"
                                    />
                                    <div className="flex-1">
                                        <div className="text-label text-muted-foreground mb-1">WARLORD DOSSIER</div>
                                        <h3 className="text-xl font-bold mb-1">{bunker.host.name}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                                            {bunker.host.isSuperhost && <span className="text-primary">★ Superhost</span>}
                                            <span>{bunker.host.yearsHosting} Years Hosting</span>
                                        </div>
                                        {bunker.host.quirk && bunker.host.quirkLabel && (
                                            <HostQuirkBadge quirk={bunker.host.quirk} label={bunker.host.quirkLabel} size="sm" />
                                        )}
                                    </div>
                                </div>
                                {bunker.host.bio && (
                                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                                        {bunker.host.bio}
                                    </p>
                                )}
                            </div>
                        </ScrollReveal>

                        {/* Description */}
                        <ScrollReveal>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                {bunker.longDescription?.split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                                    <p key={i}>{paragraph.trim()}</p>
                                )) || <p>{bunker.description}</p>}
                            </div>
                        </ScrollReveal>

                        {/* System Diagnostics Panel */}
                        <ScrollReveal>
                            <div className="border border-white/10 bg-black/30">
                                <div className="p-4 border-b border-white/10 flex items-center gap-2">
                                    <Gauge className="h-4 w-4 text-primary" />
                                    <span className="text-label text-muted-foreground">SYSTEM DIAGNOSTICS</span>
                                    <span className="ml-auto text-xs font-mono text-primary animate-pulse">● LIVE</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Radiation Gauge */}
                                        <div className="md:col-span-1">
                                            <RadiationGauge level={bunker.features.radLevel} />
                                        </div>
                                        {/* Other specs */}
                                        <div className="md:col-span-2 grid grid-cols-2 gap-3">
                                            <SpecCard label="CAPACITY" value={`${bunker.features.capacity}`} subValue="survivors" icon={Users} />
                                            <SpecCard label="SECURITY" value={`Level ${bunker.features.securityLevel}`} icon={ShieldCheck} color="text-secondary" />
                                            <SpecCard label="DEPTH" value={`${Math.abs(bunker.features.depth)}ft`} subValue={bunker.features.depth > 0 ? "underground" : "elevation"} icon={ArrowUp} />
                                            <SpecCard label="OXYGEN" value={`${bunker.features.oxygenPurity}%`} subValue="purity" icon={Wind} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Power: </span>
                                            <span className="text-white font-mono">{bunker.features.powerSource}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Water: </span>
                                            <span className="text-white font-mono">{bunker.features.waterSource}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Amenities */}
                        <ScrollReveal>
                            <div className="border border-white/10 bg-black/30">
                                <div className="p-4 border-b border-white/10">
                                    <span className="text-label text-muted-foreground">SURVIVAL FEATURES</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {bunker.amenities.filter(a => a.available).slice(0, 9).map((amenity) => {
                                            const IconComponent = iconMap[amenity.icon] || ShieldCheck;
                                            return (
                                                <div key={amenity.id} className="flex items-center gap-3 p-2 hover:bg-white/5 transition-colors">
                                                    <div className="p-2 bg-primary/10 border border-primary/20">
                                                        <IconComponent className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="text-sm">{amenity.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Banned Items */}
                        {bunker.bannedItems && bunker.bannedItems.length > 0 && (
                            <ScrollReveal>
                                <div className="border border-accent/30 bg-accent/5">
                                    <div className="p-4 border-b border-accent/20 flex items-center gap-2">
                                        <Ban className="h-4 w-4 text-accent" />
                                        <span className="text-label text-accent">CONTRABAND // DO NOT BRING</span>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {bunker.bannedItems.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <X className="h-3 w-3 text-accent" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Reviews */}
                        <ScrollReveal>
                            <ReviewsList reviews={reviews} averageRating={bunker.rating} totalReviews={bunker.reviewCount} />
                        </ScrollReveal>

                        {/* Verified Incidents */}
                        <ScrollReveal>
                            <IncidentReport bunkerId={bunker.id} />
                        </ScrollReveal>
                    </div>

                    {/* Right Booking Widget */}
                    <div className="lg:col-span-1">
                        <BookingWidget
                            bunkerId={bunker.id}
                            price={bunker.price.caps}
                            priceBtc={bunker.price.btc}
                            bunkerName={bunker.title}
                            maxCapacity={bunker.capacity}
                            available={bunker.availability}
                        />
                    </div>
                </div>
            </main>

            <Footer />
            <MobileBottomNav />
        </PageTransition>
    );
}
