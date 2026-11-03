export interface PlotPoint {
    id: string;
    lng: number;
    lat: number;
}

export interface Projection {
    project: (lng: number, lat: number) => { x: number; y: number };
    bounds: { west: number; east: number; south: number; north: number };
}

const MIN_SPAN_DEG = 4;

/**
 * Equirectangular projection fitted to the bounding box of the points.
 * Longitude is scaled by cos(mid latitude) so shapes are not stretched east-west.
 */
export function fitProjection(
    points: PlotPoint[],
    width: number,
    height: number,
    padding: number,
): Projection {
    const lngs = points.map((p) => p.lng);
    const lats = points.map((p) => p.lat);
    let west = lngs.length ? Math.min(...lngs) : -125;
    let east = lngs.length ? Math.max(...lngs) : -66;
    let south = lats.length ? Math.min(...lats) : 24;
    let north = lats.length ? Math.max(...lats) : 50;

    // Guarantee a visible span for a single point or a tight cluster.
    if (east - west < MIN_SPAN_DEG) {
        const mid = (east + west) / 2;
        west = mid - MIN_SPAN_DEG / 2;
        east = mid + MIN_SPAN_DEG / 2;
    }
    if (north - south < MIN_SPAN_DEG) {
        const mid = (north + south) / 2;
        south = mid - MIN_SPAN_DEG / 2;
        north = mid + MIN_SPAN_DEG / 2;
    }

    const kx = Math.cos((((north + south) / 2) * Math.PI) / 180);
    const spanX = (east - west) * kx;
    const spanY = north - south;
    const innerW = Math.max(1, width - padding * 2);
    const innerH = Math.max(1, height - padding * 2);
    const scale = Math.min(innerW / spanX, innerH / spanY);
    const offsetX = (width - spanX * scale) / 2;
    const offsetY = (height - spanY * scale) / 2;

    return {
        bounds: { west, east, south, north },
        project: (lng, lat) => ({
            x: offsetX + (lng - west) * kx * scale,
            y: offsetY + (north - lat) * scale,
        }),
    };
}

/** Pick a "nice" grid step (1, 2, 5, 10 ... degrees) giving roughly `target` lines across `span`. */
export function niceStep(span: number, target = 5): number {
    const raw = span / target;
    const pow = 10 ** Math.floor(Math.log10(raw));
    const n = raw / pow;
    const base = n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10;
    return base * pow;
}

export function formatCoord(value: number, pos: string, neg: string): string {
    return `${Math.abs(value).toFixed(value % 1 === 0 ? 0 : 1)}°${value >= 0 ? pos : neg}`;
}
