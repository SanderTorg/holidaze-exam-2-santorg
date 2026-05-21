import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <Skeleton className="relative h-[90vh] w-full rounded-none" />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-4/5 max-w-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-8 w-56 mb-6" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-72 shrink-0 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-8 w-56 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
