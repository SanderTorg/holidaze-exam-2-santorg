"use client";

import { Datum } from "@/lib/types/apiTypes";
import Image from "next/image";

export default function ListingDetailsClientPage({ venue }: { venue: Datum }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{venue.name}</h1>
      {venue.media.length > 0 && (
        <Image
          src={venue.media[0].url}
          alt={venue.media[0].alt}
          width={500}
          height={500}
          className="rounded-md object-cover"
        />
      )}
    </div>
  );
}
