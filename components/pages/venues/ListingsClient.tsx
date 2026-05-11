"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Datum } from "@/lib/types/apiTypes";
import { MapPin, Search, Star, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function ListingsClient({ venues }: { venues: Datum[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return venues.filter((v) => v.media.length > 0);
    return venues.filter(
      (v) =>
        v.media.length > 0 &&
        (v.name.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.location.city?.toLowerCase().includes(q) ||
          v.location.country?.toLowerCase().includes(q)),
    );
  }, [query, venues]);

  return (
    <div>
      <div className="relative mb-6 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city, country..."
          className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No venues match &ldquo;{query}&rdquo;.
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((venue: Datum) => (
          <Card
            key={venue.id}
            className="overflow-hidden flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group p-0"
            onClick={() => router.push(`/venues/${venue.id}`)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={venue.media[0].url}
                alt={venue.media[0].alt}
                width={0}
                height={0}
                sizes="100vw"
                objectFit="cover"
                className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-black/70 text-white text-sm font-semibold px-2 py-1 rounded-full">
                {venue.price} NOK / night
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold leading-tight line-clamp-1">
                {venue.name}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(venue.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {venue.rating.toFixed(1)}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 pb-2 flex-1">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {venue.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-auto pt-2">
                {venue.location.city && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {venue.location.city}
                    {venue.location.country
                      ? `, ${venue.location.country}`
                      : ""}
                  </span>
                )}
                <span className="flex items-center gap-1 ml-auto">
                  <Users size={14} />
                  {venue.maxGuests}
                </span>
              </div>
            </CardContent>

            <CardFooter className="pt-0 pb-4 px-4">
              <Button
                className="w-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/venues/${venue.id}`);
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
