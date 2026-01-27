export function BunkerSkeleton() {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-border bg-card animate-pulse">
      <div className="aspect-[4/3] bg-muted relative">
        <div className="absolute top-3 left-3 bg-muted rounded h-6 w-32" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-5 bg-muted rounded w-32" />
          <div className="h-5 bg-muted rounded w-12" />
        </div>
        <div className="h-4 bg-muted rounded w-48" />
        <div className="h-6 bg-muted rounded w-24" />
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
