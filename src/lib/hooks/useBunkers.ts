import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchBunkers } from "@/lib/api/bunkers";
import type { SearchFilters, Bunker } from "@/types";

// Query key factory for consistent key management
export const bunkerKeys = {
  all: ["bunkers"] as const,
  lists: () => [...bunkerKeys.all, "list"] as const,
  list: (filters: Partial<SearchFilters>) =>
    [...bunkerKeys.lists(), filters] as const,
  details: () => [...bunkerKeys.all, "detail"] as const,
  detail: (id: string) => [...bunkerKeys.details(), id] as const,
};

interface UseBunkersOptions {
  enabled?: boolean;
}

export function useBunkers(
  filters: Partial<SearchFilters> = {},
  options: UseBunkersOptions = {}
) {
  // Only include API-supported filters in the query key
  const apiFilters = {
    location: filters.location,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
    radFree: filters.radFree,
  };

  const query = useQuery({
    queryKey: bunkerKeys.list(apiFilters),
    queryFn: () => fetchBunkers(apiFilters),
    enabled: options.enabled,
  });

  // Extract client-side filter values for dependency tracking
  const { minPrice, maxRadLevel, guests, amenities } = filters;

  // Access query data directly for dependency
  const queryBunkers = query.data?.bunkers;

  // Apply client-side filtering for params not supported by API
  const bunkers = useMemo(() => {
    if (!queryBunkers || queryBunkers.length === 0) return [];

    return queryBunkers.filter((bunker: Bunker) => {
      // minPrice filtering (not supported by API)
      if (minPrice && bunker.price.caps < minPrice) {
        return false;
      }

      // maxRadLevel filtering (not supported by API)
      if (maxRadLevel !== undefined && bunker.features.radLevel > maxRadLevel) {
        return false;
      }

      // guests/capacity filtering (not supported by API)
      if (guests && bunker.capacity < guests) {
        return false;
      }

      // amenities filtering (not supported by API)
      if (amenities && amenities.length > 0) {
        const bunkerAmenityIds = bunker.amenities.map((a) => a.id);
        if (!amenities.every((id) => bunkerAmenityIds.includes(id))) {
          return false;
        }
      }

      return true;
    });
  }, [queryBunkers, minPrice, maxRadLevel, guests, amenities]);

  return {
    bunkers,
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
