"use client";

import { Datum } from "@/lib/types/apiTypes";
import {
  CalendarDays,
  Car,
  Coffee,
  Dog,
  MapPin,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import Image from "next/image";

export default function ListingDetailsClientPage({ venue }: { venue: Datum }) {
  const amenities = [
    { label: "WiFi", enabled: venue.meta.wifi, icon: <Wifi size={18} /> },
    {
      label: "Breakfast",
      enabled: venue.meta.breakfast,
      icon: <Coffee size={18} />,
    },
    { label: "Parking", enabled: venue.meta.parking, icon: <Car size={18} /> },
    {
      label: "Pets allowed",
      enabled: venue.meta.pets,
      icon: <Dog size={18} />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < Math.round(venue.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted"
              }
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            {venue.rating.toFixed(1)}
          </span>
        </div>

        {venue.media.length > 0 && (
          <div
            className={`grid gap-2 rounded-xl overflow-hidden ${
              venue.media.length === 1
                ? "grid-cols-1"
                : "grid-cols-2 md:grid-cols-3"
            }`}
          >
            {venue.media.slice(0, 5).map((m, i) => (
              <div
                key={i}
                className={`relative ${
                  i === 0 && venue.media.length > 1
                    ? "col-span-2 row-span-2 h-80"
                    : "h-60"
                }`}
              >
                <Image src={m.url} alt={m.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">About this venue</h2>
            <p className="text-muted-foreground leading-relaxed">
              {venue.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((a) => (
                <div
                  key={a.label}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    a.enabled
                      ? "border-green-500 text-green-700 bg-green-50"
                      : "border-muted text-muted-foreground line-through opacity-50"
                  }`}
                >
                  {a.icon}
                  {a.label}
                </div>
              ))}
            </div>
          </section>

          {(venue.location.address ||
            venue.location.city ||
            venue.location.country) && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>
                  {[
                    venue.location.address,
                    venue.location.city,
                    venue.location.zip,
                    venue.location.country,
                    venue.location.continent,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-4 rounded-xl border shadow-md p-6 h-fit sticky top-6">
          <div className="text-2xl font-bold">
            {venue.price}{" "}
            <span className="text-base font-normal text-muted-foreground">
              NOK / night
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} />
            Up to {venue.maxGuests} guests
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={16} />
            {venue._count.bookings} booking
            {venue._count.bookings !== 1 ? "s" : ""} so far
          </div>

          <button className="mt-2 cursor-pointer w-full rounded-lg bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary/90 transition-colors">
            Book now
          </button>
        </aside>
      </div>
    </div>
  );
}
