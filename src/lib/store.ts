import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchFilters, Booking } from '@/types';

interface AppState {
  favorites: string[];
  bookings: Booking[];
  searchFilters: SearchFilters;
  addFavorite: (bunkerId: string) => void;
  removeFavorite: (bunkerId: string) => void;
  toggleFavorite: (bunkerId: string) => void;
  isFavorite: (bunkerId: string) => boolean;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  addBooking: (booking: Booking) => void;
  removeBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
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
      bookings: [],
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

      addBooking: (booking: Booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),

      removeBooking: (bookingId: string) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== bookingId),
        })),

      updateBookingStatus: (bookingId: string, status: Booking['status']) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status } : b
          ),
        })),
    }),
    {
      name: 'apoc-bnb-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        bookings: state.bookings,
      }),
    }
  )
);
