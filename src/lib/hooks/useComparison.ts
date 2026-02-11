"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ComparisonStore {
  bunkerIds: string[];
  addBunker: (id: string) => void;
  removeBunker: (id: string) => void;
  clearAll: () => void;
  isBunkerAdded: (id: string) => boolean;
}

export const useComparison = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      bunkerIds: [],
      
      addBunker: (id: string) => {
        const current = get().bunkerIds;
        if (current.includes(id)) return; // Already added
        if (current.length >= 3) return; // Max 3 bunkers
        set({ bunkerIds: [...current, id] });
      },
      
      removeBunker: (id: string) => {
        set({ bunkerIds: get().bunkerIds.filter((bId) => bId !== id) });
      },
      
      clearAll: () => {
        set({ bunkerIds: [] });
      },
      
      isBunkerAdded: (id: string) => {
        return get().bunkerIds.includes(id);
      },
    }),
    {
      name: "bunker-comparison", // LocalStorage key
    }
  )
);
