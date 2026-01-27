import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchFilters } from '@/types';

interface AppState {
  favorites: string[];
  searchFilters: SearchFilters;
  addFavorite: (bunkerId: string) => void;
  removeFavorite: (bunkerId: string) => void;
  toggleFavorite: (bunkerId: string) => void;
  isFavorite: (bunkerId: string) => boolean;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
}

const defaultFilters: SearchFilters = {
  location: '',
  minPrice: 0,
  maxPrice: 2500,
  minRating: 0,
  radFree: false,
  guests: 2,
  amenities: [],
  maxRadLevel: 10,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      searchFilters: defaultFilters,

      addFavorite: (bunkerId: string) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, bunkerId])],
        })),

      removeFavorite: (bunkerId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== bunkerId),
        })),

      toggleFavorite: (bunkerId: string) => {
        const { favorites } = get();
        if (favorites.includes(bunkerId)) {
          get().removeFavorite(bunkerId);
        } else {
          get().addFavorite(bunkerId);
        }
      },

      isFavorite: (bunkerId: string) => {
        return get().favorites.includes(bunkerId);
      },

      updateSearchFilters: (filters: Partial<SearchFilters>) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),

      resetSearchFilters: () =>
        set({ searchFilters: defaultFilters }),
    }),
    {
      name: 'apoc-bnb-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
