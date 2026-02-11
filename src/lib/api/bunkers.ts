import type { SearchFilters } from "@/types";
import type { BunkersResponse, BunkerDetailResponse } from "./types";

export async function fetchBunkers(
  filters: Partial<SearchFilters> = {}
): Promise<BunkersResponse> {
  const params = new URLSearchParams();

  if (filters.location) {
    params.set("location", filters.location);
  }
  if (filters.maxPrice !== undefined && filters.maxPrice < 2500) {
    params.set("maxPrice", String(filters.maxPrice));
  }
  if (filters.minRating !== undefined && filters.minRating > 0) {
    params.set("minRating", String(filters.minRating));
  }
  if (filters.radFree) {
    params.set("radFree", "true");
  }

  const queryString = params.toString();
  const url = queryString ? `/api/bunkers?${queryString}` : "/api/bunkers";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch bunkers: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBunker(id: string): Promise<BunkerDetailResponse> {
  const response = await fetch(`/api/bunkers/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bunker: ${response.statusText}`);
  }

  return response.json();
}
