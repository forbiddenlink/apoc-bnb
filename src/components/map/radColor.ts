// Shared radiation-level colour logic for bunker markers (Mapbox + token-free map).
export function getRadColor(radLevel: number): { fill: string; glow: string } {
    if (radLevel <= 2) return { fill: 'var(--primary)', glow: 'rgba(57,255,20,0.5)' };
    if (radLevel <= 5) return { fill: 'var(--secondary)', glow: 'rgba(212,175,55,0.5)' };
    return { fill: 'var(--accent)', glow: 'rgba(255,0,60,0.5)' };
}
