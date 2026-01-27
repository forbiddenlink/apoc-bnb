"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Skull, Crosshair, Map as MapIcon, Trophy, Clock, Users } from "lucide-react";
import { mockRaids } from "@/lib/data/raids";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ExperiencesPage() {
    const handleJoinRaid = (raidTitle: string) => {
        toast.success("Raid squad joined! 🎯", {
            description: `You're registered for "${raidTitle}". Good luck out there!`
        });
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="pt-24 pb-20 container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        <span className="text-primary text-glow">Raid</span> Parties
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join elite scavenging teams led by 5-star Warlords.
                        Keep what you kill. (10% tithe to the platform).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockRaids.map((raid, index) => (
                        <motion.div 
                            key={raid.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-1">
                                        <Skull className="h-4 w-4" /> {raid.difficulty}
                                    </div>
                                    <h3 className="text-2xl font-black text-white leading-none">{raid.title}</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-bold">Warlord</div>
                                        <div className="font-bold text-lg">{raid.host}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground uppercase font-bold">Entry Fee</div>
                                        <div className="font-bold text-lg text-secondary">{raid.price}</div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Trophy className="h-4 w-4 text-accent" />
                                        <span>Loot: <span className="text-foreground font-bold">{raid.loot}</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <MapIcon className="h-4 w-4" />
                                        <span>{raid.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{raid.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>Max {raid.maxParticipants} survivors</span>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full gap-2 font-black" 
                                    variant="neobrutal"
                                    onClick={() => handleJoinRaid(raid.title)}
                                >
                                    <Crosshair className="h-4 w-4" /> JOIN SQUAD
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>
        </div>
    );
}
