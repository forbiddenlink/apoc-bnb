"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { MapPin, Radiation, X } from 'lucide-react';
import type { Bunker } from '@/types';
import { getRadColor, RAD_COLORS } from './radColor';
import { fitProjection, formatCoord, niceStep } from './projection';

interface TacticalMapProps {
    bunkers?: Bunker[];
    selectedBunkerId?: string;
}

const PAD = 56;
const HEX = "M0 -14 L12 -7 L12 7 L0 14 L-12 7 L-12 -7 Z";

function radLabel(radLevel: number): string {
    return radLevel <= 2 ? 'LOW' : radLevel <= 5 ? 'MODERATE' : 'SEVERE';
}

/**
 * Token-free tactical plot: plain SVG, equirectangular projection fitted to the
 * bunkers' bounding box. Used when no Mapbox token is configured.
 */
export default function TacticalMap({ bunkers, selectedBunkerId }: TacticalMapProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 800, h: 500 });
    const [hoverId, setHoverId] = useState<string | null>(null);
    const [focusId, setFocusId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const update = () => {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) setSize({ w: Math.round(r.width), h: Math.round(r.height) });
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduceMotion(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    const list = useMemo(() => bunkers ?? [], [bunkers]);

    const proj = useMemo(
        () =>
            fitProjection(
                list.map((b) => ({ id: b.id, lng: b.location.coordinates[0], lat: b.location.coordinates[1] })),
                size.w,
                size.h,
                size.w < 520 ? 36 : PAD,
            ),
        [list, size],
    );

    const grid = useMemo(() => {
        const { west, east, south, north } = proj.bounds;
        const step = niceStep(Math.max(east - west, north - south), size.w < 520 ? 3 : 5);
        const meridians: number[] = [];
        for (let v = Math.ceil(west / step) * step; v <= east; v += step) meridians.push(v);
        const parallels: number[] = [];
        for (let v = Math.ceil(south / step) * step; v <= north; v += step) parallels.push(v);
        return { meridians, parallels };
    }, [proj, size.w]);

    const selected = useMemo(() => list.find((b) => b.id === selectedId) ?? null, [list, selectedId]);

    useEffect(() => {
        if (!selectedId) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedId(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedId]);

    const { west, east, south, north } = proj.bounds;
    const tl = proj.project(west, north);
    const br = proj.project(east, south);

    let popup: { left: number; top: number } | null = null;
    if (selected) {
        const p = proj.project(selected.location.coordinates[0], selected.location.coordinates[1]);
        const cardW = 240;
        popup = {
            left: Math.min(Math.max(p.x - cardW / 2, 8), Math.max(8, size.w - cardW - 8)),
            top: p.y + 26 + 130 > size.h ? Math.max(8, p.y - 26 - 130) : p.y + 26,
        };
    }

    return (
        <div
            ref={wrapRef}
            className="w-full h-full relative overflow-hidden bg-black"
            role="group"
            aria-label={`Tactical map plotting ${list.length} bunker${list.length === 1 ? '' : 's'}`}
        >
            <svg
                width={size.w}
                height={size.h}
                viewBox={`0 0 ${size.w} ${size.h}`}
                className="absolute inset-0 block"
                onClick={() => setSelectedId(null)}
            >
                <defs>
                    <radialGradient id="tac-bg" cx="50%" cy="50%" r="75%">
                        <stop offset="0%" stopColor="#0d1a0d" />
                        <stop offset="100%" stopColor="#000" />
                    </radialGradient>
                </defs>
                <rect width={size.w} height={size.h} fill="url(#tac-bg)" />

                {/* Plot frame + grid */}
                <rect
                    x={tl.x}
                    y={tl.y}
                    width={Math.max(0, br.x - tl.x)}
                    height={Math.max(0, br.y - tl.y)}
                    fill="none"
                    stroke="var(--primary)"
                    strokeOpacity={0.35}
                    strokeDasharray="2 4"
                />
                {grid.meridians.map((lng) => {
                    const x = proj.project(lng, north).x;
                    return (
                        <g key={`m${lng}`} aria-hidden="true">
                            <line x1={x} x2={x} y1={tl.y} y2={br.y} stroke="var(--primary)" strokeOpacity={0.12} />
                            <text x={x} y={br.y + 16} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono, monospace)" fill="var(--muted-foreground)">
                                {formatCoord(lng, 'E', 'W')}
                            </text>
                        </g>
                    );
                })}
                {grid.parallels.map((lat) => {
                    const y = proj.project(west, lat).y;
                    return (
                        <g key={`p${lat}`} aria-hidden="true">
                            <line x1={tl.x} x2={br.x} y1={y} y2={y} stroke="var(--primary)" strokeOpacity={0.12} />
                            <text x={tl.x - 6} y={y + 3} textAnchor="end" fontSize="12" fontFamily="var(--font-mono, monospace)" fill="var(--muted-foreground)">
                                {formatCoord(lat, 'N', 'S')}
                            </text>
                        </g>
                    );
                })}

                {/* Bunker markers */}
                {list.map((b) => {
                    const [lng, lat] = b.location.coordinates;
                    const { x, y } = proj.project(lng, lat);
                    const { fill, glow } = getRadColor(b.features.radLevel);
                    const isSelected = selectedId === b.id;
                    const active = isSelected || hoverId === b.id || focusId === b.id || selectedBunkerId === b.id;
                    const label = `${b.title} in ${b.location.name} - ${b.price.caps} CAPS per night, radiation level ${b.features.radLevel}/10`;
                    return (
                        <g
                            key={b.id}
                            transform={`translate(${x} ${y})`}
                            role="button"
                            tabIndex={0}
                            aria-label={`View ${label}`}
                            aria-pressed={isSelected}
                            style={{ cursor: 'pointer', outline: 'none' }}
                            onMouseEnter={() => setHoverId(b.id)}
                            onMouseLeave={() => setHoverId((cur) => (cur === b.id ? null : cur))}
                            onFocus={() => setFocusId(b.id)}
                            onBlur={() => setFocusId((cur) => (cur === b.id ? null : cur))}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(b.id);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedId(b.id);
                                }
                            }}
                        >
                            <circle r="20" fill="transparent" />
                            {active && !reduceMotion && (
                                <circle
                                    r="14"
                                    fill={fill}
                                    opacity="0.3"
                                    className="animate-radar-ping"
                                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                                />
                            )}
                            {focusId === b.id && (
                                <circle r="19" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
                            )}
                            <g
                                style={{
                                    transform: `scale(${active ? 1.3 : 1})`,
                                    transition: reduceMotion ? 'none' : 'transform 200ms',
                                    filter: active ? `drop-shadow(0 0 6px ${glow})` : undefined,
                                }}
                            >
                                <path d={HEX} fill={fill} stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
                                <path d="M0 -9 L8 -4.5 L8 4.5 L0 9 L-8 4.5 L-8 -4.5 Z" fill="rgba(0,0,0,0.3)" stroke={fill} strokeWidth="0.5" opacity="0.5" />
                                {b.features.radLevel <= 2 ? (
                                    <circle r="3" fill="rgba(0,0,0,0.5)" />
                                ) : b.features.radLevel <= 5 ? (
                                    <polygon points="0,-4 4,3 -4,3" fill="rgba(0,0,0,0.5)" />
                                ) : (
                                    <path d="M0,-4 L4,0 L0,4 L-4,0 Z" fill="rgba(0,0,0,0.5)" />
                                )}
                            </g>
                            {active && (
                                <text
                                    y={-22}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontFamily="var(--font-mono, monospace)"
                                    fill="#fff"
                                    stroke="#000"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    aria-hidden="true"
                                >
                                    {`${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* HUD */}
            <div className="absolute top-4 left-4 bg-black/90 p-3 rounded border border-primary/30 text-xs font-mono space-y-2 min-w-[180px] pointer-events-none">
                <div className="flex items-center gap-2 text-accent font-bold border-b border-primary/20 pb-2">
                    <Radiation className="h-3 w-3" />
                    SAT-LINK OFFLINE
                </div>
                <div className="text-muted-foreground">DEAD-RECKONING PLOT</div>
                <div className="text-primary">{list.length} TARGETS LOCKED</div>
                <ul className="space-y-1 pt-1 border-t border-primary/20">
                    {([
                        ['LOW', RAD_COLORS.low.fill],
                        ['MODERATE', RAD_COLORS.moderate.fill],
                        ['SEVERE', RAD_COLORS.severe.fill],
                    ] as const).map(([name, color]) => (
                        <li key={name} className="flex items-center gap-2 text-muted-foreground">
                            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                            {name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Selected bunker card (same link target as the Mapbox popup) */}
            {selected && popup && (
                <div
                    className="absolute z-20 w-[240px] bg-black/95 border border-primary/40 rounded text-left"
                    style={{ left: popup.left, top: popup.top }}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        aria-label="Close bunker details"
                        className="absolute top-1 right-1 p-1 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-3 w-3" />
                    </button>
                    <Link href={`/bunkers/${selected.id}`} className="block p-3 pr-6">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-sm text-foreground">{selected.title}</h3>
                            <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                                style={{
                                    color: getRadColor(selected.features.radLevel).fill,
                                    backgroundColor: 'rgba(241,234,219,0.12)',
                                }}
                            >
                                RAD {selected.features.radLevel} {radLabel(selected.features.radLevel)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {selected.location.name}
                        </p>
                        <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-xs font-bold text-secondary">{`★ ${selected.rating}`}</span>
                            <span className="text-sm font-black text-primary">
                                {selected.price.caps} <span className="text-xs font-normal text-muted-foreground">CAPS</span>
                            </span>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
