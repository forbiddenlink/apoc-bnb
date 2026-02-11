import type { Bunker, Review } from "@/types";

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

export interface BunkerDetailResponse {
  bunker: Bunker;
  reviews: Review[];
}
