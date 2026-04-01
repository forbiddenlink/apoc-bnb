import { useMemo, useCallback } from "react";
import Supercluster from "supercluster";
import type { BBox, Feature, Point } from "geojson";
import type { Bunker } from "../../types";

export interface BunkerPointProperties {
  cluster: false;
  bunkerId: string;
  bunker: Bunker;
}

export interface ClusterProperties {
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string | number;
}

export type PointProperties = BunkerPointProperties | ClusterProperties;

export interface ClusterPoint {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: PointProperties;
}

type SuperclusterInstance = Supercluster<BunkerPointProperties, ClusterProperties>;
type SuperclusterOptions = Supercluster.Options<BunkerPointProperties, ClusterProperties>;

interface UseMapClusteringOptions {
  bunkers: Bunker[];
  zoom: number;
  bounds: BBox | null;
  options?: SuperclusterOptions;
}

interface UseMapClusteringResult {
  clusters: ClusterPoint[];
  supercluster: SuperclusterInstance | null;
  getClusterExpansionZoom: (clusterId: number) => number;
  getClusterLeaves: (clusterId: number, limit?: number, offset?: number) => Bunker[];
  getClusterChildren: (clusterId: number) => ClusterPoint[];
  getTotalPointCount: () => number;
}

const DEFAULT_OPTIONS: SuperclusterOptions = {
  radius: 60,
  maxZoom: 14,
  minZoom: 0,
  extent: 512,
  nodeSize: 64,
};

export function useMapClustering({
  bunkers,
  zoom,
  bounds,
  options = {},
}: UseMapClusteringOptions): UseMapClusteringResult {
  // Create supercluster instance with bunker points
  const supercluster = useMemo((): SuperclusterInstance | null => {
    if (bunkers.length === 0) return null;

    const index: SuperclusterInstance = new Supercluster({
      ...DEFAULT_OPTIONS,
      ...options,
    });

    const points: Array<Feature<Point, BunkerPointProperties>> = bunkers.map((bunker) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: bunker.location.coordinates,
      },
      properties: {
        cluster: false as const,
        bunkerId: bunker.id,
        bunker,
      },
    }));

    index.load(points);
    return index;
  }, [bunkers, options]);

  // Get clusters for current viewport
  const clusters = useMemo((): ClusterPoint[] => {
    if (!supercluster || !bounds) return [];

    const rawClusters = supercluster.getClusters(bounds, Math.floor(zoom));

    return rawClusters.map((feature: Supercluster.ClusterFeature<ClusterProperties> | Supercluster.PointFeature<BunkerPointProperties>) => ({
      type: "Feature" as const,
      geometry: feature.geometry as { type: "Point"; coordinates: [number, number] },
      properties: feature.properties as PointProperties,
    }));
  }, [supercluster, bounds, zoom]);

  // Get zoom level to expand a cluster
  const getClusterExpansionZoom = useCallback(
    (clusterId: number): number => {
      if (!supercluster) return zoom;
      return supercluster.getClusterExpansionZoom(clusterId);
    },
    [supercluster, zoom]
  );

  // Get all bunkers (leaves) within a cluster
  const getClusterLeaves = useCallback(
    (clusterId: number, limit: number = Infinity, offset: number = 0): Bunker[] => {
      if (!supercluster) return [];
      const leaves = supercluster.getLeaves(clusterId, limit, offset);
      return leaves
        .map((leaf) => (leaf.properties as BunkerPointProperties).bunker)
        .filter(Boolean);
    },
    [supercluster]
  );

  // Get immediate children of a cluster (can be other clusters or points)
  const getClusterChildren = useCallback(
    (clusterId: number): ClusterPoint[] => {
      if (!supercluster) return [];
      const children = supercluster.getChildren(clusterId);
      return children.map((child) => ({
        type: "Feature" as const,
        geometry: child.geometry as { type: "Point"; coordinates: [number, number] },
        properties: child.properties as PointProperties,
      }));
    },
    [supercluster]
  );

  // Get total number of points loaded
  const getTotalPointCount = useCallback((): number => {
    return bunkers.length;
  }, [bunkers.length]);

  return {
    clusters,
    supercluster,
    getClusterExpansionZoom,
    getClusterLeaves,
    getClusterChildren,
    getTotalPointCount,
  };
}
