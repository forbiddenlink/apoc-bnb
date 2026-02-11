import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBooking } from "@/lib/api/bookings";
import { useAppStore } from "@/lib/store";
import type { Booking, CreateBookingRequest } from "@/types";

// Query key factory for bookings
export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  detail: (id: string) => [...bookingKeys.all, "detail", id] as const,
};

export function useBookBunker() {
  const { addBooking, removeBooking } = useAppStore();

  return useMutation({
    mutationFn: createBooking,
    onMutate: async (request: CreateBookingRequest) => {
      // Create optimistic booking with pending status
      const optimisticBooking: Booking = {
        id: `optimistic-${crypto.randomUUID()}`,
        bunkerId: request.bunkerId,
        bunkerName: request.bunkerName,
        guests: request.guests,
        nights: request.nights,
        total: request.total,
        currency: request.currency,
        status: "pending",
        createdAt: new Date().toISOString(),
        confirmationNumber: "PENDING...",
      };

      // Add optimistic booking to store immediately
      addBooking(optimisticBooking);

      // Return context for potential rollback
      return { optimisticBookingId: optimisticBooking.id };
    },
    onSuccess: (data, _request, context) => {
      // Remove optimistic booking
      if (context?.optimisticBookingId) {
        removeBooking(context.optimisticBookingId);
      }

      // Add confirmed booking from server
      addBooking(data.booking);
    },
    onError: (error, _request, context) => {
      // Rollback: remove optimistic booking
      if (context?.optimisticBookingId) {
        removeBooking(context.optimisticBookingId);
      }

      // Show error toast
      toast.error(error instanceof Error ? error.message : "Booking failed. Please try again.");
    },
  });
}
