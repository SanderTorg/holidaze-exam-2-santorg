import ListingDetailsClientPage from "@/components/pages/slug/ListingDetailsClient";
import { ListingDetailsSkeleton } from "@/components/pages/slug/ListingDetailsSkeleton";
import { getVenueById } from "@/lib/db/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = await getVenueById(id);

  if (!venue) return notFound();

  return (
    <Suspense fallback={<ListingDetailsSkeleton />}>
      <ListingDetailsClientPage venue={venue} />
    </Suspense>
  );
}
