import { NextRequest, NextResponse } from 'next/server';
import { getBunkerById } from '@/lib/data/bunkers';
import { getReviewsByBunkerId } from '@/lib/data/reviews';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bunker = getBunkerById(id);

  if (!bunker) {
    return NextResponse.json(
      { error: 'Bunker not found' },
      { status: 404 }
    );
  }

  const reviews = getReviewsByBunkerId(id);

  return NextResponse.json({
    bunker,
    reviews,
  });
}
