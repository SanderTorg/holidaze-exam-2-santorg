import { ListingsClient } from "@/components/pages/venues/ListingsClient";
import { getAllVenues } from "@/lib/db/api";
import { Suspense } from "react";

export default async function Venues() {
  const venues = await getAllVenues();

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="pb-2 text-2xl font-bold">Venues</h1>
      <p className="pb-8 text-muted-foreground">
        Explore our curated selection of venues for your next unforgettable
        experience.
      </p>

      <div>
        <label htmlFor="searchbar">Search...</label>
        <input type="text" id="searchbar" name="searchbar" />
      </div>

      <Suspense fallback={<p>Loading venues...</p>}>
        <ListingsClient venues={venues.data} />
      </Suspense>
    </div>
  );
}
