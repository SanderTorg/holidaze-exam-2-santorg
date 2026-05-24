import { ListingsClient } from "@/components/pages/venues/ListingsClient";
import { VenueGridSkeleton } from "@/components/pages/venues/VenueCardSkeleton";
import { getAllVenues } from "@/lib/db/api";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Venues() {
  const venues = await getAllVenues();
  const hasVenues = venues.data.length > 0;

  if (!hasVenues) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No venues found.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <h1 className="pb-2 text-2xl font-bold">Venues</h1>
      <p className="pb-8 text-muted-foreground">
        Explore our curated selection of venues for your next unforgettable
        experience.
      </p>

      <Suspense fallback={<VenueGridSkeleton count={12} />}>
        <ListingsClient venues={venues.data} />
      </Suspense>
    </div>
  );
}
