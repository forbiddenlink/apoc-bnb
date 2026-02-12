"use client";

import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { HostAvatar } from "@/components/ui/HostAvatar";
import { HostQuirkBadge } from "@/components/ui/HostQuirkBadge";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { ShieldCheck, Wind, Radio, WifiOff, Star, MapPin, Users, AlertTriangle } from "lucide-react";
import { CompareButton } from "@/components/ui/CompareButton";
import { motion } from "framer-motion";
import type { Bunker, Review } from "@/types";

interface BunkerDetailsContentProps {
    bunker: Bunker;
    reviews: Review[];
}

export function BunkerDetailsContent({ bunker, reviews }: BunkerDetailsContentProps) {
    const isHighRad = bunker.features.radLevel > 3;

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-7xl">
                {/* Rad Warning Banner for high-rad bunkers */}
                {isHighRad && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-3 bg-accent/10 border border-accent/30 rounded-lg flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5 text-accent animate-pulse flex-shrink-0" />
                        <div className="text-sm">
                            <span className="font-bold text-accent">HIGH RADIATION ZONE</span>
                            <span className="text-muted-foreground ml-2">This bunker has elevated radiation levels. Protective gear recommended.</span>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            {bunker.title}
                        </h1>
                        <FavoriteButton bunkerId={bunker.id} size="lg" />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 font-bold text-foreground">
                            <Star className="h-4 w-4 text-secondary fill-secondary" /> {bunker.rating.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground underline cursor-pointer hover:text-foreground">
                            {bunker.reviewCount} Reviews
                        </span>
                        <span className="text-muted-foreground">•</span>
                        {bunker.host.isSuperhost && (
                            <>
                                <span className="flex items-center gap-1 text-primary font-bold">
                                    <ShieldCheck className="h-4 w-4" /> Superhost
                                </span>
                                <span className="text-muted-foreground">•</span>
                            </>
                        )}
                        <span className="flex items-center gap-1 text-foreground">
                            <MapPin className="h-4 w-4" />
                            {bunker.location.name}, {bunker.location.region}
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4">
                        <CompareButton bunkerId={bunker.id} />
                    </div>
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden border border-border"
                >
                    {bunker.images.map((image, index) => (
                        <div
                            key={index}
                            className={`${
                                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                            } bg-neutral-800 relative group overflow-hidden`}
                        >
                            <Image
                                src={image}
                                alt={`${bunker.title} - Image ${index + 1}`}
                                fill
                                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Host Info */}
                        <div className="flex items-center gap-4 py-6 border-b border-border">
                            <HostAvatar
                                name={bunker.host.name}
                                isSuperhost={bunker.host.isSuperhost}
                                avatar={bunker.host.avatar}
                                size="lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">Hosted by {bunker.host.name}</h3>
                                <p className="text-muted-foreground text-sm mb-2">
                                    {bunker.host.isSuperhost && '⭐ Superhost • '}
                                    {bunker.host.yearsHosting} Years Hosting
                                </p>
                                {bunker.host.quirk && bunker.host.quirkLabel && (
                                    <HostQuirkBadge quirk={bunker.host.quirk} label={bunker.host.quirkLabel} size="sm" />
                                )}
                            </div>
                        </div>

                        {/* Capacity & Features */}
                        <div className="flex gap-6 py-6 border-b border-border">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                    <div className="font-bold">{bunker.capacity} Guests</div>
                                    <div className="text-xs text-muted-foreground">Max Capacity</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-secondary" />
                                <div>
                                    <div className="font-bold">{bunker.features.blastDoorRating}</div>
                                    <div className="text-xs text-muted-foreground">Protection</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-accent" />
                                <div>
                                    <div className="font-bold">{bunker.features.depth} ft</div>
                                    <div className="text-xs text-muted-foreground">Underground</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            {bunker.longDescription?.split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                                <p key={i}>{paragraph.trim()}</p>
                            )) || <p>{bunker.description}</p>}
                        </div>

                        {/* Amenities */}
                        <div className="py-6 border-y border-border">
                            <h3 className="text-xl font-bold mb-6">What this bunker offers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {bunker.amenities.map((amenity) => (
                                    <div key={amenity.id} className="flex items-center gap-3">
                                        {amenity.icon === 'wind' && <Wind className="h-5 w-5 text-primary" />}
                                        {amenity.icon === 'shield' && <ShieldCheck className="h-5 w-5 text-primary" />}
                                        {amenity.icon === 'radio' && <Radio className="h-5 w-5 text-secondary" />}
                                        {amenity.icon === 'wifi-off' && <WifiOff className="h-5 w-5 text-muted-foreground" />}
                                        <span className={amenity.available ? '' : 'line-through text-muted-foreground'}>
                                            {amenity.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="py-6 border-b border-border">
                            <h3 className="text-xl font-bold mb-6">Bunker Specifications</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="containment-card-dotted p-4">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Oxygen</div>
                                    <div className="font-black text-2xl text-primary">{bunker.features.oxygenPurity}%</div>
                                    <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${bunker.features.oxygenPurity}%` }} />
                                    </div>
                                </div>
                                <div className={`p-4 ${isHighRad ? 'containment-card-critical' : 'containment-card-dotted'}`}>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Radiation</div>
                                    <div className={`font-black text-2xl ${
                                        bunker.features.radLevel <= 2 ? 'text-primary' :
                                        bunker.features.radLevel <= 4 ? 'text-secondary' : 'text-accent'
                                    }`}>
                                        {bunker.features.radLevel}/10
                                    </div>
                                    <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${
                                                bunker.features.radLevel <= 2 ? 'bg-primary' :
                                                bunker.features.radLevel <= 4 ? 'bg-secondary' : 'bg-accent'
                                            }`}
                                            style={{ width: `${bunker.features.radLevel * 10}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="containment-card-dotted p-4">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Power</div>
                                    <div className="font-bold text-lg">{bunker.features.powerSource}</div>
                                </div>
                                <div className="containment-card-dotted p-4">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Water</div>
                                    <div className="font-bold text-lg">{bunker.features.waterSource}</div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="py-6">
                            <ReviewsList
                                reviews={reviews}
                                averageRating={bunker.rating}
                                totalReviews={bunker.reviewCount}
                            />
                        </div>

                    </div>

                    {/* Right Booking Widget */}
                    <div className="lg:col-span-1">
                        <BookingWidget bunkerId={bunker.id} price={bunker.price.caps} priceBtc={bunker.price.btc} bunkerName={bunker.title} />
                    </div>

                </div>

            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
