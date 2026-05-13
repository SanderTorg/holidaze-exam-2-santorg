"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/hooks/useUserStore";
import { getProfileBookingsAction } from "@/lib/actions/bookingActions";
import type { BookingWithVenue } from "@/lib/types/apiTypes";
import { DateTime } from "luxon";
import Image from "next/image";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function ViewBookingsClient() {
  const { name, accessToken, isLoggedIn } = useUserStore();
  const [bookings, setBookings] = useState<BookingWithVenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !name || !accessToken) {
      setLoading(false);
      return;
    }
    async function load() {
      const data = await getProfileBookingsAction(name!, accessToken!);
      // sort upcoming first
      setBookings(
        data.sort(
          (a, b) =>
            new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
        ),
      );
      setLoading(false);
    }
    void load();
  }, [isLoggedIn, name, accessToken]);

  if (!isLoggedIn) {
    return (
      <p className="text-muted-foreground">
        You must be logged in to view your bookings.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-muted-foreground">You have no bookings yet.</p>;
  }

  const now = DateTime.now();

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => {
        const from = DateTime.fromISO(booking.dateFrom);
        const to = DateTime.fromISO(booking.dateTo);
        const nights = Math.round(to.diff(from, "days").days);
        const isPast = to < now;

        return (
          <div
            key={booking.id}
            className={`flex gap-4 rounded-xl border p-4 ${isPast ? "opacity-60" : ""}`}
          >
            {booking.venue?.media?.[0] ? (
              <div className="relative w-28 h-24 shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || booking.venue?.name || ""}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-28 h-24 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
                No image
              </div>
            )}

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold truncate">
                  {booking.venue?.name ?? "Venue"}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                    isPast
                      ? "bg-muted text-muted-foreground"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isPast ? "Past" : "Upcoming"}
                </span>
              </div>

              {(booking.venue?.location?.city ||
                booking.venue?.location?.country) && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  {[booking.venue.location.city, booking.venue.location.country]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays size={12} />
                {from.toLocaleString(DateTime.DATE_MED)} →{" "}
                {to.toLocaleString(DateTime.DATE_MED)}{" "}
                <span className="ml-1">
                  ({nights} night{nights !== 1 ? "s" : ""})
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users size={12} />
                {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
              </div>

              {booking.venue?.price && (
                <p className="text-sm font-medium mt-1">
                  {nights * booking.venue.price} NOK total
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
