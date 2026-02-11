import { NextResponse } from "next/server";
import type { Booking, CreateBookingRequest } from "@/types";

export async function POST(request: Request) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 10% random failure rate for testing rollback
  if (Math.random() < 0.1) {
    return NextResponse.json(
      { error: "Booking failed: Raiders intercepted your transmission. Try again." },
      { status: 500 }
    );
  }

  const body: CreateBookingRequest = await request.json();

  const booking: Booking = {
    id: crypto.randomUUID(),
    bunkerId: body.bunkerId,
    bunkerName: body.bunkerName,
    guests: body.guests,
    nights: body.nights,
    total: body.total,
    currency: body.currency,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    confirmationNumber: `APOC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  };

  return NextResponse.json({ booking });
}
