"use client";
import Map, { Marker, NavigationControl, Popup, Source, Layer } from 'react-map-gl';
import type { MapRef, ViewStateChangeEvent } from 'react-map-gl';
import type { FillLayerSpecification, LineLayerSpecification, LngLatBoundsLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Radiation, MapPin, Crosshair, Shield, Users } from 'lucide-react';
import { Bunker } from '@/types';
import Link from 'next/link';
import { useMapClustering } from '@/lib/hooks/useMapClustering';
import type { ClusterProperties, BunkerPointProperties, PointProperties } from '@/lib/hooks/useMapClustering';
import {
  radiationZones,
  createAllRadiationBuffers,
  getRadiationZoneColor,
  getRadiationZoneStrokeColor,
  calculateDistance,
} from '@/lib/geo';
import type { RadiationZone } from '@/lib/geo';
import type { BBox } from 'geojson';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface DoomsdayMapProps {
  bunkers?: Bunker[];
  selectedBunkerId?: string;
  showRadiationZones?: boolean;
  enableClustering?: boolean;
}

// Custom hex marker component for individual bunkers
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

// Cluster marker component
function ClusterMarker({
    pointCount,
    onClick
}: {
    pointCount: number;
    onClick: () => void;
}) {
    // Size scales with number of points
    const size = Math.min(60, 30 + (pointCount / 3));

    return (
        <div
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Cluster of ${pointCount} bunkers. Click to zoom in.`}
        >
            <div
                className="relative flex items-center justify-center rounded-full bg-primary/80 border-2 border-primary shadow-lg shadow-primary/30"
                style={{ width: size, height: size }}
            >
                {/* Pulse effect */}
                <div
                    className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                    style={{ animationDuration: '2s' }}
                />
                {/* Count */}
                <div className="relative flex items-center gap-1 text-black font-bold text-sm">
                    <Users className="h-3 w-3" />
                    <span>{pointCount}</span>
                </div>
            </div>
        </div>
    );
}

// Radiation zone tooltip component
function RadiationZoneTooltip({ zone }: { zone: RadiationZone }) {
    const levelColors = {
        low: 'text-primary',
        moderate: 'text-secondary',
        high: 'text-orange-500',
        extreme: 'text-accent',
    };

    return (
        <div className="bg-black/95 backdrop-blur-sm p-3 rounded border border-accent/30 text-xs max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
                <Radiation className={`h-4 w-4 ${levelColors[zone.level]}`} />
                <span className="font-bold text-foreground">{zone.name}</span>
            </div>
            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">THREAT</span>
                    <span className={`font-bold uppercase ${levelColors[zone.level]}`}>
                        {zone.level}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">RADIUS</span>
                    <span className="text-foreground">{zone.radiusKm} km</span>
                </div>
                <p className="text-muted-foreground mt-2 pt-2 border-t border-border">
                    {zone.description}
                </p>
            </div>
        </div>
    );
}

export default function DoomsdayMap({
    bunkers,
    selectedBunkerId,
    showRadiationZones = true,
    enableClustering = true,
}: DoomsdayMapProps) {
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState({
        latitude: 39.8283,
        longitude: -98.5795,
        zoom: 4
    });
    const [mapBounds, setMapBounds] = useState<BBox | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
    const [hoveredZone, setHoveredZone] = useState<RadiationZone | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second for HUD
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const markers = useMemo(() => bunkers || [], [bunkers]);

    // Create radiation zone GeoJSON
    const radiationGeoJSON = useMemo(() => {
        const buffers = createAllRadiationBuffers();
        return {
            type: 'FeatureCollection' as const,
            features: buffers,
        };
    }, []);

    // Update bounds when map moves
    const handleMove = useCallback((evt: ViewStateChangeEvent) => {
        setViewState(evt.viewState);

        const map = mapRef.current?.getMap();
        if (map) {
            const bounds = map.getBounds();
            if (bounds) {
                setMapBounds([
                    bounds.getWest(),
                    bounds.getSouth(),
                    bounds.getEast(),
                    bounds.getNorth(),
                ]);
            }
        }
    }, []);

    // Initialize bounds on load
    const handleLoad = useCallback(() => {
        const map = mapRef.current?.getMap();
        if (map) {
            const bounds = map.getBounds();
            if (bounds) {
                setMapBounds([
                    bounds.getWest(),
                    bounds.getSouth(),
                    bounds.getEast(),
                    bounds.getNorth(),
                ]);
            }
        }
    }, []);

    // Get clusters using the hook
    const { clusters, getClusterExpansionZoom } = useMapClustering({
        bunkers: markers,
        zoom: viewState.zoom,
        bounds: mapBounds,
    });

    // Handle cluster click - zoom in to expand
    const handleClusterClick = useCallback((clusterId: number, longitude: number, latitude: number) => {
        const expansionZoom = Math.min(getClusterExpansionZoom(clusterId), 20);

        mapRef.current?.flyTo({
            center: [longitude, latitude],
            zoom: expansionZoom,
            duration: 500,
        });
    }, [getClusterExpansionZoom]);

    // Memoize selected bunker to avoid redundant .find() calls
    const selectedBunker = useMemo(() => {
        if (!selectedMarker) return null;
        return markers.find(b => b.id === selectedMarker) ?? null;
    }, [markers, selectedMarker]);

    const handleClosePopup = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    // Layer styles for radiation zones
    const radiationFillLayer: FillLayerSpecification = {
        id: 'radiation-fill',
        type: 'fill',
        source: 'radiation-zones',
        paint: {
            'fill-color': [
                'match',
                ['get', 'level'],
                'low', 'rgba(57, 255, 20, 0.12)',
                'moderate', 'rgba(212, 175, 55, 0.15)',
                'high', 'rgba(255, 140, 0, 0.18)',
                'extreme', 'rgba(255, 0, 60, 0.22)',
                'rgba(128, 128, 128, 0.1)'
            ],
            'fill-opacity': 0.8,
        },
    };

    const radiationLineLayer: LineLayerSpecification = {
        id: 'radiation-line',
        type: 'line',
        source: 'radiation-zones',
        paint: {
            'line-color': [
                'match',
                ['get', 'level'],
                'low', 'rgba(57, 255, 20, 0.5)',
                'moderate', 'rgba(212, 175, 55, 0.6)',
                'high', 'rgba(255, 140, 0, 0.7)',
                'extreme', 'rgba(255, 0, 60, 0.8)',
                'rgba(128, 128, 128, 0.5)'
            ],
            'line-width': 2,
            'line-dasharray': [3, 2],
        },
    };

    // Count bunkers in each zone level for stats
    const zoneStats = useMemo(() => {
        const stats = { low: 0, moderate: 0, high: 0, extreme: 0 };
        for (const zone of radiationZones) {
            stats[zone.level]++;
        }
        return stats;
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
                ref={mapRef}
                {...viewState}
                onMove={handleMove}
                onLoad={handleLoad}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={TOKEN}
                attributionControl={false}
            >
                <NavigationControl position="bottom-right" />

                {/* Radiation Zone Overlays */}
                {showRadiationZones && (
                    <Source id="radiation-zones" type="geojson" data={radiationGeoJSON}>
                        <Layer {...radiationFillLayer} />
                        <Layer {...radiationLineLayer} />
                    </Source>
                )}

                {/* Render clusters or individual markers */}
                {enableClustering && clusters.length > 0 ? (
                    clusters.map((point) => {
                        const [longitude, latitude] = point.geometry.coordinates;
                        const props = point.properties;

                        // Check if it's a cluster
                        if (props.cluster) {
                            const clusterProps = props as ClusterProperties;
                            return (
                                <Marker
                                    key={`cluster-${clusterProps.cluster_id}`}
                                    longitude={longitude}
                                    latitude={latitude}
                                    anchor="center"
                                >
                                    <ClusterMarker
                                        pointCount={clusterProps.point_count}
                                        onClick={() => handleClusterClick(clusterProps.cluster_id, longitude, latitude)}
                                    />
                                </Marker>
                            );
                        }

                        // Individual bunker marker
                        const bunkerProps = props as BunkerPointProperties;
                        const bunker = bunkerProps.bunker;
                        return (
                            <Marker
                                key={bunker.id}
                                longitude={longitude}
                                latitude={latitude}
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
                        );
                    })
                ) : (
                    // Fallback: render all markers without clustering
                    markers.map((bunker) => (
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
                    ))
                )}

                {/* Radiation Zone Center Markers */}
                {showRadiationZones && radiationZones.map((zone) => (
                    <Marker
                        key={zone.id}
                        longitude={zone.center[0]}
                        latitude={zone.center[1]}
                        anchor="center"
                    >
                        <div
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredZone(zone)}
                            onMouseLeave={() => setHoveredZone(null)}
                        >
                            <Radiation
                                className={`h-5 w-5 opacity-60 ${
                                    zone.level === 'low' ? 'text-primary' :
                                    zone.level === 'moderate' ? 'text-secondary' :
                                    zone.level === 'high' ? 'text-orange-500' :
                                    'text-accent animate-pulse'
                                }`}
                            />
                        </div>
                    </Marker>
                ))}

                {/* Hovered Zone Popup */}
                {hoveredZone && (
                    <Popup
                        longitude={hoveredZone.center[0]}
                        latitude={hoveredZone.center[1]}
                        anchor="top"
                        closeButton={false}
                        closeOnClick={false}
                        offset={15}
                    >
                        <RadiationZoneTooltip zone={hoveredZone} />
                    </Popup>
                )}

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
                        <span className="text-muted-foreground">BUNKERS</span>
                        <span className="text-secondary">{markers.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">RAD ZONES</span>
                        <span className="text-accent">{radiationZones.length}</span>
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

            {/* Legend with radiation zones */}
            <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm p-3 rounded border border-border text-xs space-y-3 max-w-[200px]">
                {/* Bunker threat levels */}
                <div>
                    <div className="flex items-center gap-2 font-bold text-foreground border-b border-border pb-2 mb-2">
                        <Shield className="h-3 w-3" />
                        BUNKER THREAT
                    </div>
                    <div className="space-y-1">
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
                </div>

                {/* Radiation zones */}
                {showRadiationZones && (
                    <div>
                        <div className="flex items-center gap-2 font-bold text-foreground border-b border-border pb-2 mb-2">
                            <Radiation className="h-3 w-3" />
                            RAD ZONES
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary/30 border border-primary/50" />
                                <span className="text-muted-foreground">Low ({zoneStats.low})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-secondary/30 border border-secondary/50" />
                                <span className="text-muted-foreground">Moderate ({zoneStats.moderate})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500/50" />
                                <span className="text-muted-foreground">High ({zoneStats.high})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-accent/30 border border-accent/50" />
                                <span className="text-muted-foreground">Extreme ({zoneStats.extreme})</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Clustering indicator */}
                {enableClustering && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <Users className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">Clustered view enabled</span>
                    </div>
                )}
            </div>

            {/* Scan line effect overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scanline" />
            </div>
        </div>
    );
}
