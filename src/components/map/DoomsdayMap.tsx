"use client";
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useMemo } from 'react';
import { Radiation, MapPin } from 'lucide-react';
import { Bunker } from '@/types';
import Link from 'next/link';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface DoomsdayMapProps {
  bunkers?: Bunker[];
  selectedBunkerId?: string;
}

export default function DoomsdayMap({ bunkers, selectedBunkerId }: DoomsdayMapProps) {
    const [viewState, setViewState] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 4
    });
    const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

    const markers = useMemo(() => {
        return bunkers || [];
    }, [bunkers]);

    const getMarkerColor = (radLevel: number) => {
        if (radLevel <= 2) return "text-primary"; // Safe
        if (radLevel <= 5) return "text-secondary"; // Caution
        return "text-accent"; // Danger
    };

    if (!TOKEN) {
        return (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center text-primary border border-primary/20 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
                <div className="scanline absolute inset-0 opacity-20 pointer-events-none" />
                <Radiation className="h-16 w-16 animate-pulse mb-4 text-accent" />
                <h2 className="text-xl font-black uppercase tracking-widest text-center">
                    Satellite Uplink Failed
                </h2>
                <p className="text-muted-foreground text-sm font-mono mt-2 text-center max-w-xs">
                    [ERROR] NEXT_PUBLIC_MAPBOX_TOKEN missing.<br />
                    Unable to triangulate safe zones.
                </p>
                <div className="mt-8 border border-primary/50 p-2 rounded bg-primary/10 font-mono text-xs">
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

                {/* Render Bunker Markers */}
                {markers.map((bunker) => (
                    <Marker
                        key={bunker.id}
                        longitude={bunker.location.coordinates[0]}
                        latitude={bunker.location.coordinates[1]}
                        anchor="bottom"
                    >
                        <div 
                            className="group cursor-pointer"
                            onClick={() => setSelectedMarker(bunker.id)}
                        >
                            <MapPin 
                                className={`h-8 w-8 ${getMarkerColor(bunker.features.radLevel)} drop-shadow-lg transition-transform hover:scale-110 ${
                                    selectedBunkerId === bunker.id ? 'animate-bounce' : ''
                                }`}
                                fill="currentColor"
                            />
                        </div>
                    </Marker>
                ))}

                {/* Popup for selected marker */}
                {selectedMarker && markers.find(b => b.id === selectedMarker) && (
                    <Popup
                        longitude={markers.find(b => b.id === selectedMarker)!.location.coordinates[0]}
                        latitude={markers.find(b => b.id === selectedMarker)!.location.coordinates[1]}
                        anchor="top"
                        onClose={() => setSelectedMarker(null)}
                        closeButton={true}
                        closeOnClick={false}
                        className="bunker-popup"
                    >
                        <Link href={`/bunkers/${selectedMarker}`}>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-sm mb-1">
                                    {markers.find(b => b.id === selectedMarker)?.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mb-2">
                                    {markers.find(b => b.id === selectedMarker)?.location.name}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-primary">
                                        ★ {markers.find(b => b.id === selectedMarker)?.rating}
                                    </span>
                                    <span className="text-sm font-bold">
                                        {markers.find(b => b.id === selectedMarker)?.price.caps} CAPS
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Popup>
                )}
            </Map>

            {/* Map Overlay UI */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur p-3 rounded border border-primary/30 text-xs font-mono space-y-1">
                <div className="text-primary font-bold">SYSTEM STATUS</div>
                <div className="text-muted-foreground">RAD_LEVEL: 3.6 R/hr</div>
                <div className="text-muted-foreground">WIND: 12mph NW</div>
                <div className="text-secondary">BUNKERS: {markers.length}</div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur p-3 rounded border border-border text-xs space-y-2">
                <div className="font-bold text-foreground mb-2">RADIATION ZONES</div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" fill="currentColor" />
                    <span className="text-muted-foreground">Safe (0-2)</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-secondary" fill="currentColor" />
                    <span className="text-muted-foreground">Caution (3-5)</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" fill="currentColor" />
                    <span className="text-muted-foreground">Danger (6+)</span>
                </div>
            </div>
        </div>
    );
}
