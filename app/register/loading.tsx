import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Skeleton className="absolute inset-0 rounded-none" />

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-4 rounded-xl bg-background p-8 shadow-lg">
        <Skeleton className="h-7 w-40 mx-auto" />
        <Skeleton className="h-4 w-52 mx-auto" />
        <div className="flex flex-col gap-3 mt-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
