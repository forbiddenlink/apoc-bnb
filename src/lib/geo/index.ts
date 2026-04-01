import * as turf from "@turf/turf";
import type {
  Feature,
  FeatureCollection,
  Polygon,
  Point,
  Position,
  BBox,
  GeoJsonProperties,
} from "geojson";

// Re-export GeoJSON types for use elsewhere
export type { Feature, FeatureCollection, Polygon, Point, Position, BBox, GeoJsonProperties };

export interface RadiationZone {
  id: string;
  name: string;
  center: Position; // [lng, lat]
  radiusKm: number;
  level: "low" | "moderate" | "high" | "extreme";
  description: string;
}

// Radiation zones across the wasteland
export const radiationZones: RadiationZone[] = [
  {
    id: "zone-1",
    name: "New York Exclusion Zone",
    center: [-74.006, 40.7128],
    radiusKm: 50,
    level: "moderate",
    description: "Former metropolitan area - elevated background radiation",
  },
  {
    id: "zone-2",
    name: "LA Dead Zone",
    center: [-118.2437, 34.0522],
    radiusKm: 80,
    level: "low",
    description: "Coastal winds have cleared most fallout",
  },
  {
    id: "zone-3",
    name: "Chicago Hot Spot",
    center: [-87.6298, 41.8781],
    radiusKm: 60,
    level: "high",
    description: "Industrial contamination - caution advised",
  },
  {
    id: "zone-4",
    name: "Denver Crater Zone",
    center: [-104.9903, 39.7392],
    radiusKm: 40,
    level: "extreme",
    description: "Direct impact site - DO NOT ENTER",
  },
  {
    id: "zone-5",
    name: "Houston Quarantine",
    center: [-95.3698, 29.7604],
    radiusKm: 70,
    level: "moderate",
    description: "Chemical contamination from refineries",
  },
  {
    id: "zone-6",
    name: "Atlanta Fallout Region",
    center: [-84.3, 33.8],
    radiusKm: 45,
    level: "moderate",
    description: "Reactor incident - stable but elevated readings",
  },
  {
    id: "zone-7",
    name: "Phoenix Scorch Zone",
    center: [-112.074, 33.4484],
    radiusKm: 100,
    level: "low",
    description: "Desert heat has accelerated decay - mostly clear",
  },
  {
    id: "zone-8",
    name: "Seattle Green Zone",
    center: [-122.3321, 47.6062],
    radiusKm: 90,
    level: "low",
    description: "Rain has cleansed most contamination - relatively safe",
  },
  {
    id: "zone-9",
    name: "Dallas Contested Area",
    center: [-96.8, 32.78],
    radiusKm: 55,
    level: "moderate",
    description: "Mixed readings - approach with caution",
  },
  {
    id: "zone-10",
    name: "Minneapolis Freeze Zone",
    center: [-93.265, 44.9778],
    radiusKm: 35,
    level: "low",
    description: "Cold winters have preserved but also contained fallout",
  },
];

/**
 * Get the fill color for a radiation zone based on its level
 */
export function getRadiationZoneColor(level: RadiationZone["level"]): string {
  switch (level) {
    case "low":
      return "rgba(57, 255, 20, 0.15)"; // green
    case "moderate":
      return "rgba(212, 175, 55, 0.2)"; // yellow
    case "high":
      return "rgba(255, 140, 0, 0.25)"; // orange
    case "extreme":
      return "rgba(255, 0, 60, 0.3)"; // red
  }
}

/**
 * Get the stroke color for a radiation zone based on its level
 */
export function getRadiationZoneStrokeColor(
  level: RadiationZone["level"]
): string {
  switch (level) {
    case "low":
      return "rgba(57, 255, 20, 0.6)";
    case "moderate":
      return "rgba(212, 175, 55, 0.7)";
    case "high":
      return "rgba(255, 140, 0, 0.8)";
    case "extreme":
      return "rgba(255, 0, 60, 0.9)";
  }
}

/**
 * Create a circular buffer polygon around a point using Turf.js
 */
export function createRadiationBuffer(
  zone: RadiationZone
): Feature<Polygon> & { properties: RadiationZone } {
  const point = turf.point(zone.center);
  const buffer = turf.buffer(point, zone.radiusKm, { units: "kilometers" });

  if (!buffer) {
    throw new Error(`Failed to create buffer for zone ${zone.id}`);
  }

  return {
    ...buffer,
    properties: zone,
  } as Feature<Polygon> & { properties: RadiationZone };
}

/**
 * Create all radiation zone buffers as GeoJSON features
 */
export function createAllRadiationBuffers(): Array<
  Feature<Polygon> & { properties: RadiationZone }
> {
  return radiationZones.map(createRadiationBuffer);
}

/**
 * Calculate distance between two points in kilometers
 */
export function calculateDistance(
  from: Position,
  to: Position
): number {
  const fromPoint = turf.point(from);
  const toPoint = turf.point(to);
  return turf.distance(fromPoint, toPoint, { units: "kilometers" });
}

/**
 * Check if a point is inside a radiation zone
 */
export function isPointInRadiationZone(
  point: Position,
  zone: RadiationZone
): boolean {
  const distance = calculateDistance(point, zone.center);
  return distance <= zone.radiusKm;
}

/**
 * Get all radiation zones that contain a given point
 */
export function getRadiationZonesAtPoint(
  point: Position
): RadiationZone[] {
  return radiationZones.filter((zone) => isPointInRadiationZone(point, zone));
}

/**
 * Find the nearest bunker to a given point
 */
export function findNearestBunker<T extends { location: { coordinates: Position } }>(
  point: Position,
  bunkers: T[]
): { bunker: T; distance: number } | null {
  if (bunkers.length === 0) return null;

  let nearest: T = bunkers[0];
  let minDistance = calculateDistance(point, nearest.location.coordinates);

  for (const bunker of bunkers.slice(1)) {
    const dist = calculateDistance(point, bunker.location.coordinates);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = bunker;
    }
  }

  return { bunker: nearest, distance: minDistance };
}

/**
 * Get bunkers within a radius of a point
 */
export function getBunkersWithinRadius<T extends { location: { coordinates: Position } }>(
  point: Position,
  bunkers: T[],
  radiusKm: number
): Array<{ bunker: T; distance: number }> {
  return bunkers
    .map((bunker) => ({
      bunker,
      distance: calculateDistance(point, bunker.location.coordinates),
    }))
    .filter(({ distance }) => distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

// ============================================================================
// Bounding Box Utilities
// ============================================================================

/**
 * Calculate bounding box for an array of points
 * Returns [minLng, minLat, maxLng, maxLat]
 */
export function calculateBoundingBox(points: Position[]): BBox {
  if (points.length === 0) {
    throw new Error("Cannot calculate bounding box for empty array");
  }

  const features = turf.featureCollection(
    points.map((p) => turf.point(p))
  );
  return turf.bbox(features);
}

/**
 * Calculate bounding box for bunkers
 */
export function getBunkersBoundingBox<T extends { location: { coordinates: Position } }>(
  bunkers: T[]
): BBox {
  const points = bunkers.map((b) => b.location.coordinates);
  return calculateBoundingBox(points);
}

/**
 * Expand a bounding box by a given percentage
 */
export function expandBoundingBox(bbox: BBox, expandPercent: number = 10): BBox {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  const lngSpan = maxLng - minLng;
  const latSpan = maxLat - minLat;
  const lngExpand = (lngSpan * expandPercent) / 100;
  const latExpand = (latSpan * expandPercent) / 100;

  return [
    minLng - lngExpand,
    minLat - latExpand,
    maxLng + lngExpand,
    maxLat + latExpand,
  ];
}

/**
 * Check if a point is within a bounding box
 */
export function isPointInBoundingBox(point: Position, bbox: BBox): boolean {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  const [lng, lat] = point;
  return lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat;
}

// ============================================================================
// Point-in-Polygon Utilities
// ============================================================================

/**
 * Check if a point is within a polygon using turf.booleanPointInPolygon
 */
export function isPointInPolygon(
  point: Position,
  polygon: Feature<Polygon> | Polygon
): boolean {
  const pt = turf.point(point);
  return turf.booleanPointInPolygon(pt, polygon);
}

/**
 * Check if a point is within any radiation zone polygon
 */
export function isPointInAnyRadiationZone(point: Position): boolean {
  const buffers = createAllRadiationBuffers();
  return buffers.some((buffer) => isPointInPolygon(point, buffer));
}

/**
 * Get the highest radiation level at a given point
 */
export function getMaxRadiationLevelAtPoint(
  point: Position
): RadiationZone["level"] | null {
  const zones = getRadiationZonesAtPoint(point);
  if (zones.length === 0) return null;

  const levelPriority: Record<RadiationZone["level"], number> = {
    low: 1,
    moderate: 2,
    high: 3,
    extreme: 4,
  };

  return zones.reduce((max, zone) =>
    levelPriority[zone.level] > levelPriority[max.level] ? zone : max
  ).level;
}

// ============================================================================
// Center Calculation Utilities
// ============================================================================

/**
 * Calculate the geographic center of multiple points
 */
export function calculateCenter(points: Position[]): Position {
  if (points.length === 0) {
    throw new Error("Cannot calculate center for empty array");
  }

  if (points.length === 1) {
    return points[0];
  }

  const features = turf.featureCollection(
    points.map((p) => turf.point(p))
  );
  const center = turf.center(features);
  return center.geometry.coordinates as Position;
}

/**
 * Calculate the center of multiple bunkers
 */
export function getBunkersCenter<T extends { location: { coordinates: Position } }>(
  bunkers: T[]
): Position {
  const points = bunkers.map((b) => b.location.coordinates);
  return calculateCenter(points);
}

/**
 * Calculate the centroid (center of mass) of a polygon
 */
export function getPolygonCentroid(polygon: Feature<Polygon> | Polygon): Position {
  const centroid = turf.centroid(polygon);
  return centroid.geometry.coordinates as Position;
}

// ============================================================================
// Area and Measurement Utilities
// ============================================================================

/**
 * Calculate the area of a polygon in square kilometers
 */
export function calculatePolygonArea(polygon: Feature<Polygon> | Polygon): number {
  const area = turf.area(polygon);
  return area / 1_000_000; // Convert from sq meters to sq km
}

/**
 * Calculate the bearing (direction) from one point to another
 * Returns degrees from north (0-360)
 */
export function calculateBearing(from: Position, to: Position): number {
  const fromPoint = turf.point(from);
  const toPoint = turf.point(to);
  return turf.bearing(fromPoint, toPoint);
}

/**
 * Get a destination point given a start, distance, and bearing
 */
export function getDestination(
  start: Position,
  distanceKm: number,
  bearingDegrees: number
): Position {
  const startPoint = turf.point(start);
  const destination = turf.destination(startPoint, distanceKm, bearingDegrees, {
    units: "kilometers",
  });
  return destination.geometry.coordinates as Position;
}

// ============================================================================
// Convex Hull and Clustering Support
// ============================================================================

/**
 * Calculate the convex hull of a set of points
 * Returns a polygon that encloses all points
 */
export function calculateConvexHull(points: Position[]): Feature<Polygon> | null {
  if (points.length < 3) return null;

  const features = turf.featureCollection(
    points.map((p) => turf.point(p))
  );
  const hull = turf.convex(features);
  return hull ?? null;
}

/**
 * Calculate convex hull for bunkers
 */
export function getBunkersConvexHull<T extends { location: { coordinates: Position } }>(
  bunkers: T[]
): Feature<Polygon> | null {
  const points = bunkers.map((b) => b.location.coordinates);
  return calculateConvexHull(points);
}

// ============================================================================
// GeoJSON Helpers
// ============================================================================

/**
 * Create a GeoJSON Point feature
 */
export function createPoint<P extends GeoJsonProperties = GeoJsonProperties>(
  coordinates: Position,
  properties?: P
): Feature<Point, P> {
  return turf.point(coordinates, properties) as Feature<Point, P>;
}

/**
 * Create a GeoJSON FeatureCollection from bunkers
 */
export function bunkersToFeatureCollection<T extends { id: string; location: { coordinates: Position } }>(
  bunkers: T[]
): FeatureCollection<Point, { bunkerId: string; bunker: T }> {
  return {
    type: "FeatureCollection",
    features: bunkers.map((bunker) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: bunker.location.coordinates,
      },
      properties: {
        bunkerId: bunker.id,
        bunker,
      },
    })),
  };
}
