"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FolioShell } from "@/components/layout/FolioShell";
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
    X, Truck, BookOpen, Ban, Thermometer, ArrowUp, Gauge, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { holdVerdict } from "@/lib/hold-verdict";
import type { Bunker, Review } from "@/types";

interface BunkerDetailsContentProps {
    bunker: Bunker;
    reviews: Review[];
}

function RadiationGauge({ level }: { level: number }) {
    const percentage = (level / 10) * 100;
    const color = level <= 2 ? "text-foreground" : "text-[var(--oxide)]";
        const label = level <= 2 ? "MINIMAL" : level <= 4 ? "ELEVATED" : "CRITICAL";

    return (
        <div className="relative">
            {/* Gauge Arc */}
            <svg viewBox="0 0 100 60" className="w-full h-auto">
                {/* Background arc */}
                <path
                    d="M 10 55 A 40 40 0 0 1 90 55"
                    fill="none"
                    stroke="rgba(21,19,15,0.15)"
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
                    stroke="var(--soot)"
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

function SpecCard({ label, value, subValue, icon: Icon, color: _color = "text-primary" }: {
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
            className="folio-card relative p-4"
        >

            <div className="flex items-start gap-3">
                <div className={cn("p-2 bg-[var(--vellum)] border border-[var(--soot)]")}>
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <div className="folio-label text-muted-foreground mb-1">{label}</div>
                    <div className={"text-xl font-bold font-mono"}>{value}</div>
                    {subValue && <div className="text-xs text-muted-foreground">{subValue}</div>}
                </div>
            </div>
        </motion.div>
    );
}

function WillItHold({ bunker }: { bunker: Bunker }) {
    const v = holdVerdict(bunker.features);
    const tone = v.level === "holds" ? "text-foreground" : "text-[var(--oxide)]";
    return (
        <section aria-labelledby="will-it-hold-heading" className="folio-card">
            <div className="p-4 border-b border-[var(--soot)]">
                <span id="will-it-hold-heading" className="folio-label text-muted-foreground">WILL IT HOLD?</span>
            </div>
            <div className="p-6">
                <p className={cn("folio-display text-3xl", tone)}>{v.headline}</p>
                <p className="text-sm text-muted-foreground mt-1">{v.note}</p>
                <ul className="mt-4 space-y-2 text-sm font-mono">
                    {v.checks.map((c) => (
                        <li key={c.label} className="flex flex-wrap items-baseline gap-x-3">
                            <span className={c.pass ? "font-bold text-foreground" : "font-bold text-[var(--oxide)]"}>{c.pass ? "PASS" : "FAIL"}</span>
                            <span className="text-foreground">{c.label}: {c.value}</span>
                            <span className="text-muted-foreground">needs {c.rule}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
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
        <FolioShell mainClassName="max-w-7xl">
            <PageTransition>
                {/* Warning Banners */}
                {!bunker.availability && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-[var(--bone)] border border-dashed border-[var(--soot)] flex items-center gap-3"
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
                        className="mb-6 p-4 bg-[var(--bone)] border border-[var(--oxide)] flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0" />
                        <div className="text-sm">
                            <span className="font-bold text-accent">HIGH RADIATION ZONE</span>
                            <span className="text-muted-foreground ml-2">Protective gear recommended.</span>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <ScrollReveal>
                    <div className="mb-8 border-b-2 border-[var(--soot)] pb-6">
                        <div className="flex justify-between items-start gap-3 mb-3">
                            <h1 className="folio-display text-[clamp(2.25rem,6vw,4rem)]">{bunker.title}</h1>
                            <div className="flex gap-2">
                                <CompareButton bunkerId={bunker.id} />
                                <FavoriteButton bunkerId={bunker.id} size="lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 font-bold">
                                <Star className="h-4 w-4 fill-current" /> {bunker.rating.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                                {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                            </span>
                            {bunker.host.isSuperhost && (
                                <>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="flex items-center gap-1 font-bold">
                                        <ShieldCheck className="h-4 w-4" /> Superhost
                                    </span>
                                </>
                            )}
                            <span className="text-muted-foreground">•</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {bunker.location.name}, {bunker.location.region}
                            </span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Gallery */}
                <ScrollReveal delay={0.1}>
                    <div className="mb-12">
                        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden border border-[var(--soot)] mb-2 group/gallery">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                            {bunker.images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveImage(
                                                (activeImage - 1 + bunker.images.length) % bunker.images.length
                                            )
                                        }
                                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 flex items-center justify-center border border-[var(--soot)] bg-[var(--vellum)] text-[var(--soot)] hover:bg-[var(--geiger)] transition-colors"
                                        aria-label="Previous photo"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveImage((activeImage + 1) % bunker.images.length)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 flex items-center justify-center border border-[var(--soot)] bg-[var(--vellum)] text-[var(--soot)] hover:bg-[var(--geiger)] transition-colors"
                                        aria-label="Next photo"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            )}

                            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3 pointer-events-none">
                                <span className="text-xs uppercase tracking-[0.2em] text-[var(--soot)] font-mono bg-[var(--vellum)] px-2 py-1 border border-[var(--soot)]">
                                    Facility recon
                                </span>
                                <div className="px-3 py-1 bg-[var(--vellum)] text-[var(--soot)] border border-[var(--soot)] text-sm font-mono tabular-nums">
                                    {activeImage + 1} / {bunker.images.length}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {bunker.images.map((image, index) => (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() => setActiveImage(index)}
                                    className={cn(
                                        "relative flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all",
                                        activeImage === index
                                            ? "border-[var(--soot)] shadow-[3px_3px_0_var(--soot)]"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    )}
                                    aria-label={`View photo ${index + 1}`}
                                    aria-current={activeImage === index ? "true" : undefined}
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
                            <div className="relative p-6 bg-muted border border-border">
                                <div className="absolute top-2 right-2 folio-label text-muted-foreground/50 rotate-3">
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
                                        <div className="folio-label text-muted-foreground mb-1">WARLORD DOSSIER</div>
                                        <h3 className="text-xl font-bold mb-1">{bunker.host.name}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                                            {bunker.host.isSuperhost && <span className="font-bold text-foreground">★ Superhost</span>}
                                            <span>{bunker.host.yearsHosting} Years Hosting</span>
                                        </div>
                                        {bunker.host.quirk && bunker.host.quirkLabel && (
                                            <HostQuirkBadge quirk={bunker.host.quirk} label={bunker.host.quirkLabel} size="sm" />
                                        )}
                                    </div>
                                </div>
                                {bunker.host.bio && (
                                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
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

                        {/* Will it hold? verdict, computed from the diagnostics fields below */}
                        <ScrollReveal>
                            <WillItHold bunker={bunker} />
                        </ScrollReveal>

                        {/* System Diagnostics Panel */}
                        <ScrollReveal>
                            <div className="folio-card">
                                <div className="p-4 border-b border-[var(--soot)] flex items-center gap-2">
                                    <Gauge className="h-4 w-4" />
                                    <span className="folio-label text-muted-foreground">SYSTEM DIAGNOSTICS</span>
                                    <span className="ml-auto text-xs font-mono font-bold">● LIVE</span>
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
                                            <SpecCard label="SECURITY" value={`Level ${bunker.features.securityLevel}`} icon={ShieldCheck} />
                                            <SpecCard label="DEPTH" value={`${Math.abs(bunker.features.depth)}ft`} subValue={bunker.features.depth > 0 ? "underground" : "elevation"} icon={ArrowUp} />
                                            <SpecCard label="OXYGEN" value={`${bunker.features.oxygenPurity}%`} subValue="purity" icon={Wind} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Power: </span>
                                            <span className="text-foreground font-mono">{bunker.features.powerSource}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Water: </span>
                                            <span className="text-foreground font-mono">{bunker.features.waterSource}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Amenities */}
                        <ScrollReveal>
                            <div className="folio-card">
                                <div className="p-4 border-b border-[var(--soot)]">
                                    <span className="folio-label text-muted-foreground">SURVIVAL FEATURES</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {bunker.amenities.filter(a => a.available).slice(0, 9).map((amenity) => {
                                            const IconComponent = iconMap[amenity.icon] || ShieldCheck;
                                            return (
                                                <div key={amenity.id} className="flex items-center gap-3 p-2 hover:bg-foreground/5 transition-colors">
                                                    <div className="p-2 bg-[var(--vellum)] border border-[var(--soot)]">
                                                        <IconComponent className="h-4 w-4" />
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
                                <div className="folio-card border-[var(--oxide)]">
                                    <div className="p-4 border-b border-[var(--oxide)] flex items-center gap-2">
                                        <Ban className="h-4 w-4 text-accent" />
                                        <span className="folio-label font-bold text-accent">CONTRABAND // DO NOT BRING</span>
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
            </PageTransition>
        </FolioShell>
    );
}
