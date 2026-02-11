import type { Booking, CreateBookingRequest } from "@/types";

export interface CreateBookingResponse {
  booking: Booking;
}

export async function createBooking(
  request: CreateBookingRequest
): Promise<CreateBookingResponse> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to create booking: ${response.statusText}`);
  }

  return response.json();
}
