"use client";
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Radiation, MapPin, Crosshair, Wifi, Shield, AlertTriangle } from 'lucide-react';
import { Bunker } from '@/types';
import Link from 'next/link';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface DoomsdayMapProps {
  bunkers?: Bunker[];
  selectedBunkerId?: string;
}

// Custom hex marker component
function HexMarker({ radLevel, isSelected, isHovered }: { radLevel: number; isSelected: boolean; isHovered: boolean }) {
    const getColor = () => {
        if (radLevel <= 2) return { fill: 'var(--primary)', glow: 'rgba(57,255,20,0.5)' };
        if (radLevel <= 5) return { fill: 'var(--secondary)', glow: 'rgba(212,175,55,0.5)' };
        return { fill: 'var(--accent)', glow: 'rgba(255,0,60,0.5)' };
    };

    const { fill, glow } = getColor();
    const scale = isSelected || isHovered ? 1.3 : 1;

    return (
        <div
            className="relative transition-transform duration-200"
            style={{ transform: `scale(${scale})` }}
        >
            {/* Pulse ring on hover/select */}
            {(isSelected || isHovered) && (
                <div
                    className="absolute inset-0 animate-radar-ping rounded-full"
                    style={{ backgroundColor: fill, opacity: 0.3 }}
                />
            )}
            {/* Hex shape using SVG */}
            <svg width="28" height="32" viewBox="0 0 28 32" className="drop-shadow-lg">
                <defs>
                    <filter id={`glow-${radLevel}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M14 0 L27 8 L27 24 L14 32 L1 24 L1 8 Z"
                    fill={fill}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="1"
                    filter={isSelected || isHovered ? `url(#glow-${radLevel})` : undefined}
                    style={{ filter: isSelected || isHovered ? `drop-shadow(0 0 6px ${glow})` : undefined }}
                />
                {/* Inner hex for depth */}
                <path
                    d="M14 4 L23 10 L23 22 L14 28 L5 22 L5 10 Z"
                    fill="rgba(0,0,0,0.3)"
                    stroke={fill}
                    strokeWidth="0.5"
                    opacity="0.5"
                />
                {/* Center icon based on rad level */}
                <g transform="translate(14, 16)">
                    {radLevel <= 2 ? (
                        <circle r="3" fill="rgba(0,0,0,0.5)" />
                    ) : radLevel <= 5 ? (
                        <polygon points="0,-4 4,3 -4,3" fill="rgba(0,0,0,0.5)" />
                    ) : (
                        <path d="M0,-4 L4,0 L0,4 L-4,0 Z" fill="rgba(0,0,0,0.5)" />
                    )}
                </g>
            </svg>
        </div>
    );
}

export default function DoomsdayMap({ bunkers, selectedBunkerId }: DoomsdayMapProps) {
    const [viewState, setViewState] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 4
    });
    const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second for HUD
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const markers = useMemo(() => {
        return bunkers || [];
    }, [bunkers]);

    // Memoize selected bunker to avoid redundant .find() calls
    const selectedBunker = useMemo(() => {
        if (!selectedMarker) return null;
        return markers.find(b => b.id === selectedMarker) ?? null;
    }, [markers, selectedMarker]);

    const handleClosePopup = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    if (!TOKEN) {
        return (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center text-primary border border-primary/20 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
                <div className="scanline absolute inset-0 opacity-20 pointer-events-none" />
                <div className="relative">
                    <Radiation className="h-20 w-20 animate-pulse text-accent" />
                    <div className="absolute inset-0 bg-accent/20 rounded-full animate-radar-ping" />
                </div>
                <h2 className="text-label text-accent mt-6 mb-2">
                    SATELLITE UPLINK FAILED
                </h2>
                <p className="text-muted-foreground text-mono text-xs text-center max-w-xs">
                    [ERROR] NEXT_PUBLIC_MAPBOX_TOKEN missing.<br />
                    Unable to triangulate safe zones.
                </p>
                <div className="mt-8 border border-primary/50 p-3 rounded bg-primary/10 font-mono text-xs">
                    Please add token to .env.local
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full relative overflow-hidden">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={TOKEN}
                attributionControl={false}
            >
                <NavigationControl position="bottom-right" />

                {/* Render Bunker Markers with hex shape */}
                {markers.map((bunker) => (
                    <Marker
                        key={bunker.id}
                        longitude={bunker.location.coordinates[0]}
                        latitude={bunker.location.coordinates[1]}
                        anchor="center"
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => setSelectedMarker(bunker.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedMarker(bunker.id);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`View ${bunker.title} in ${bunker.location.name} - ${bunker.price.caps} CAPS per night, radiation level ${bunker.features.radLevel}/10`}
                        >
                            <HexMarker
                                radLevel={bunker.features.radLevel}
                                isSelected={selectedMarker === bunker.id}
                                isHovered={selectedBunkerId === bunker.id}
                            />
                        </div>
                    </Marker>
                ))}

                {/* Enhanced Popup for selected marker */}
                {selectedBunker && (
                    <Popup
                        longitude={selectedBunker.location.coordinates[0]}
                        latitude={selectedBunker.location.coordinates[1]}
                        anchor="top"
                        onClose={handleClosePopup}
                        closeButton={true}
                        closeOnClick={false}
                        className="bunker-popup"
                        offset={20}
                    >
                        <Link href={`/bunkers/${selectedBunker.id}`}>
                            <div className="p-3 min-w-[220px] relative">
                                {/* HUD corners */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/50" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/50" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/50" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/50" />

                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-bold text-sm text-foreground">
                                        {selectedBunker.title}
                                    </h3>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                        selectedBunker.features.radLevel <= 2 ? 'bg-primary/20 text-primary' :
                                        selectedBunker.features.radLevel <= 5 ? 'bg-secondary/20 text-secondary' :
                                        'bg-accent/20 text-accent'
                                    }`}>
                                        RAD {selectedBunker.features.radLevel}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {selectedBunker.location.name}
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-border">
                                    <span className="text-xs font-bold text-secondary flex items-center gap-1">
                                        ★ {selectedBunker.rating}
                                    </span>
                                    <span className="text-sm font-black text-primary">
                                        {selectedBunker.price.caps} <span className="text-xs font-normal text-muted-foreground">CAPS</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Popup>
                )}
            </Map>

            {/* Doomsday Radar HUD Overlay */}
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm p-3 rounded border border-primary/30 text-xs font-mono space-y-2 min-w-[180px]">
                <div className="flex items-center gap-2 text-primary font-bold border-b border-primary/20 pb-2">
                    <Crosshair className="h-3 w-3 animate-pulse" />
                    <span>DOOMSDAY RADAR</span>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">STATUS</span>
                        <span className="text-primary flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            ONLINE
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">TARGETS</span>
                        <span className="text-secondary">{markers.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">TIME</span>
                        <span className="text-foreground">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">GRID</span>
                        <span className="text-foreground">
                            {viewState.latitude.toFixed(2)}°N {Math.abs(viewState.longitude).toFixed(2)}°W
                        </span>
                    </div>
                </div>
            </div>

            {/* Legend with better styling */}
            <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm p-3 rounded border border-border text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-foreground border-b border-border pb-2">
                    <Shield className="h-3 w-3" />
                    THREAT LEVELS
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-2.5 h-3 bg-primary" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                    </div>
                    <span className="text-muted-foreground">SAFE (0-2)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-2.5 h-3 bg-secondary" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                    </div>
                    <span className="text-muted-foreground">CAUTION (3-5)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-2.5 h-3 bg-accent" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                    </div>
                    <span className="text-muted-foreground">DANGER (6+)</span>
                </div>
            </div>

            {/* Scan line effect overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scanline" />
            </div>
        </div>
    );
}
