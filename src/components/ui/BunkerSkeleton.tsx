export function BunkerSkeleton() {
  return (
    <div className="containment-skeleton h-full flex flex-col">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-muted relative">
        {/* Rad Level Badge skeleton */}
        <div className="absolute top-3 left-3 z-20 bg-muted-foreground/20 h-6 w-32 rounded animate-pulse" />

        {/* Favorite button skeleton */}
        <div className="absolute top-3 right-3 z-20 bg-muted-foreground/20 h-8 w-8 rounded-full animate-pulse" />

        {/* Tags skeleton */}
        <div className="absolute bottom-3 left-3 z-20 flex gap-1">
          <div className="bg-muted-foreground/20 h-5 w-16 rounded animate-pulse" />
          <div className="bg-muted-foreground/20 h-5 w-20 rounded animate-pulse" />
        </div>

        {/* Dashed containment lines overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="skeleton-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#skeleton-grid)" />
          </svg>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Location skeleton */}
        <div className="flex items-center gap-1 mb-2">
          <div className="bg-muted-foreground/20 h-3 w-3 rounded animate-pulse" />
          <div className="bg-muted-foreground/20 h-3 w-40 rounded animate-pulse" />
        </div>

        {/* Title & Rating skeleton */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <div className="flex-1 space-y-1">
            <div className="bg-muted-foreground/20 h-5 w-full rounded animate-pulse" />
            <div className="bg-muted-foreground/20 h-5 w-3/4 rounded animate-pulse" />
          </div>
          <div className="bg-muted-foreground/20 h-5 w-12 rounded animate-pulse flex-shrink-0" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-1 mb-4 flex-1">
          <div className="bg-muted-foreground/20 h-4 w-full rounded animate-pulse" />
          <div className="bg-muted-foreground/20 h-4 w-5/6 rounded animate-pulse" />
        </div>

        {/* Price skeleton */}
        <div className="mt-auto">
          <div className="bg-muted-foreground/20 h-6 w-28 rounded animate-pulse" />
        </div>
      </div>

      {/* Corner indicator - "SCANNING" text */}
      <div className="absolute bottom-2 right-2 text-[10px] text-primary/40 font-mono uppercase tracking-widest">
        Scanning...
      </div>
    </div>
  );
}

export function BunkerListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <BunkerSkeleton key={i} />
      ))}
    </>
  );
}

export function BunkerDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-muted rounded w-3/4" />
      <div className="h-6 bg-muted rounded w-1/2" />
      <div className="h-[500px] bg-muted rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-20 bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
