import { Skeleton } from "@/components/ui/skeleton";
import { VenueGridSkeleton } from "@/components/pages/venues/VenueCardSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center px-4 py-8 w-full">
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-4 w-80 mb-8" />

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mb-6">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-8 w-full max-w-3xl">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      <VenueGridSkeleton count={12} />
    </div>
  );
}
