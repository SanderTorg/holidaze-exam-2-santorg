import { Skeleton } from "@/components/ui/skeleton";

export function ListingDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <Skeleton className="h-9 w-2/3 mb-4" />
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-sm" />
          ))}
          <Skeleton className="h-5 w-10 ml-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
          <Skeleton className="col-span-2 row-span-2 h-80" />
          <Skeleton className="h-60" />
          <Skeleton className="h-60" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div>
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-lg" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-28 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-5 w-48 mx-auto" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
