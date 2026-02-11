import type { Bunker } from "@/types";

export interface BunkersResponse {
  bunkers: Bunker[];
  total: number;
  filters: {
    location: string;
    maxPrice?: number;
    minRating?: number;
    radFree: boolean;
  };
}

// Bunker detail response is the full Bunker type
// Using type alias for clarity and future extensions
export type BunkerDetailResponse = Bunker;
