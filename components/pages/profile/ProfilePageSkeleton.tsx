import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePageSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-48 rounded-none" />

      <div className="max-w-2xl mx-auto py-6 px-4 flex flex-col gap-8">
        <div className="flex items-end gap-6 -mt-14">
          <Skeleton className="w-24 h-24 rounded-full shrink-0 border-4 border-background" />
          <div className="flex flex-col gap-2 pb-1 flex-1">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-52" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        <div className="flex gap-4 border-b pb-0">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border p-4">
              <Skeleton className="h-36 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
