// Shared radiation-level colour logic for bunker markers (Mapbox + token-free map).
// Explicit folio hexes (geiger / bone / lit oxide) so LOW, MODERATE and SEVERE stay
// distinct on the soot map regardless of the surrounding token scope.
export const RAD_COLORS = {
    low: { fill: '#c8f03a', glow: 'rgba(200,240,58,0.5)' },
    moderate: { fill: '#e6dcc6', glow: 'rgba(230,220,198,0.5)' },
    severe: { fill: '#e2552b', glow: 'rgba(226,85,43,0.55)' },
} as const;

export function getRadColor(radLevel: number): { fill: string; glow: string } {
    if (radLevel <= 2) return RAD_COLORS.low;
    if (radLevel <= 5) return RAD_COLORS.moderate;
    return RAD_COLORS.severe;
}
