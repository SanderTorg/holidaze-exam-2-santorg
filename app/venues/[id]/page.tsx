import ListingDetailsClientPage from "@/components/pages/slug/ListingDetailsClient";
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
    <Suspense fallback={<p>Loading listing details...</p>}>
      <ListingDetailsClientPage venue={venue} />
    </Suspense>
  );
}
