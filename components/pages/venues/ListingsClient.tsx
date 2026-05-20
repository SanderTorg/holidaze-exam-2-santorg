"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Venue } from "@/lib/types/apiTypes";
import { MapPin, Search, Star, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

enum SortOption {
  Newest = "newest",
  Oldest = "oldest",
  AZ = "az",
  ZA = "za",
  PriceHigh = "price-high",
  PriceLow = "price-low",
}

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "popular", label: "Popular" },
  { value: "top-rated", label: "Top Rated" },
  { value: "budget", label: "Budget" },
  { value: "pets", label: "Pets" },
  { value: "breakfast", label: "Breakfast" },
  { value: "parking", label: "Parking" },
  { value: "wifi", label: "Wifi" },
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number]["value"];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: SortOption.Newest, label: "Latest" },
  { value: SortOption.Oldest, label: "Oldest" },
  { value: SortOption.AZ, label: "A → Z" },
  { value: SortOption.ZA, label: "Z → A" },
  { value: SortOption.PriceHigh, label: "Price: High → Low" },
  { value: SortOption.PriceLow, label: "Price: Low → High" },
];

export function ListingsClient({ venues }: { venues: Venue[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>(SortOption.Newest);
  const [filter, setFilter] = useState<FilterOption>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const base = venues.filter((v) => {
      if (v.media.length === 0) return false;
      if (
        q &&
        !(
          v.name.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.location.city?.toLowerCase().includes(q) ||
          v.location.country?.toLowerCase().includes(q)
        )
      )
        return false;
      switch (filter) {
        case "popular":
          return v._count.bookings >= 3;
        case "top-rated":
          return v.rating >= 4;
        case "budget":
          return v.price <= 100;
        case "pets":
          return v.meta.pets;
        case "breakfast":
          return v.meta.breakfast;
        case "parking":
          return v.meta.parking;
        case "wifi":
          return v.meta.wifi;
        default:
          return true;
      }
    });

    switch (sort) {
      case SortOption.Newest:
        return [...base].sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      case SortOption.Oldest:
        return [...base].sort(
          (a, b) =>
            new Date(a.created).getTime() - new Date(b.created).getTime(),
        );
      case SortOption.AZ:
        return [...base].sort((a, b) => a.name.localeCompare(b.name));
      case SortOption.ZA:
        return [...base].sort((a, b) => b.name.localeCompare(a.name));
      case SortOption.PriceHigh:
        return [...base].sort((a, b) => b.price - a.price);
      case SortOption.PriceLow:
        return [...base].sort((a, b) => a.price - b.price);
      default:
        return base;
    }
  }, [query, sort, filter, venues]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
              filter === f.value
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-input hover:border-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center w-full gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="flex cursor-pointer rounded-md  border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {SORT_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="cursor-pointer"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm">
          {query
            ? `No venues match "${query}".`
            : filter !== "all"
              ? `No venues match the "${FILTER_OPTIONS.find((f) => f.value === filter)?.label}" filter.`
              : "No venues available right now."}
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((venue: Venue) => (
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
    </>
  );
}
