import { NextRequest, NextResponse } from 'next/server';
import { filterBunkers } from '@/lib/data/bunkers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const filters = {
    location: searchParams.get('location') || '',
    maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
    minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
    radFree: searchParams.get('radFree') === 'true',
  };

  const filteredBunkers = filterBunkers(filters);

  return NextResponse.json({
    bunkers: filteredBunkers,
    total: filteredBunkers.length,
    filters: filters,
  });
}
