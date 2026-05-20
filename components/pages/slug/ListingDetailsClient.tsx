"use client";

import { VenueWithBookings } from "@/lib/types/apiTypes";
import { Car, Coffee, Dog, MapPin, Star, Users, Wifi } from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { DateTime } from "luxon";
import { enUS } from "date-fns/locale";
import { useUserStore } from "@/lib/hooks/useUserStore";
import { createBookingAction } from "@/lib/actions/bookingActions";
import { toast } from "sonner";
import Image from "next/image";

export default function ListingDetailsClientPage({
  venue,
}: {
  venue: VenueWithBookings;
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const {
    accessToken,
    isLoggedIn,
    venueManager,
    name: userName,
  } = useUserStore();

  const isOwnVenue =
    venueManager && !!venue.owner && venue.owner.name === userName;

  async function handleBook() {
    if (!range?.from || !range?.to || !accessToken) return;
    setIsBooking(true);
    try {
      await createBookingAction(accessToken, {
        dateFrom: DateTime.fromJSDate(range.from).toISO()!,
        dateTo: DateTime.fromJSDate(range.to).toISO()!,
        guests,
        venueId: venue.id,
      });
      toast.success("Booking confirmed!");
      setRange(undefined);
      setGuests(1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setIsBooking(false);
    }
  }

  const bookedDates: Date[] = (venue.bookings ?? []).flatMap((b) => {
    const dates: Date[] = [];
    let current = DateTime.fromISO(b.dateFrom).startOf("day");
    const end = DateTime.fromISO(b.dateTo).startOf("day");
    while (current <= end) {
      dates.push(current.toJSDate());
      current = current.plus({ days: 1 });
    }
    return dates;
  });

  const today = DateTime.now().startOf("day").toJSDate();

  const nights =
    range?.from && range?.to
      ? Math.round(
          DateTime.fromJSDate(range.to).diff(
            DateTime.fromJSDate(range.from),
            "days",
          ).days,
        )
      : 0;

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
                <Image
                  src={m.url}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="guests">
              Guests
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              max={venue.maxGuests}
              value={guests}
              onChange={(e) =>
                setGuests(
                  Math.min(
                    venue.maxGuests,
                    Math.max(1, Number(e.target.value)),
                  ),
                )
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Select dates</p>
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={[{ before: today }, ...bookedDates]}
              numberOfMonths={1}
              className="rounded-md border w-full p-0"
              locale={enUS}
            />
          </div>

          {range?.from && (
            <div className="text-sm text-muted-foreground flex flex-col gap-1">
              <span>
                Check-in:{" "}
                <span className="font-medium text-foreground">
                  {DateTime.fromJSDate(range.from).toLocaleString(
                    DateTime.DATE_MED,
                  )}
                </span>
              </span>
              {range.to && (
                <>
                  <span>
                    Check-out:{" "}
                    <span className="font-medium text-foreground">
                      {DateTime.fromJSDate(range.to).toLocaleString(
                        DateTime.DATE_MED,
                      )}
                    </span>
                  </span>
                  <span>
                    Total:{" "}
                    <span className="font-medium text-foreground">
                      {nights} night{nights !== 1 ? "s" : ""} ·{" "}
                      {nights * venue.price} NOK
                    </span>
                  </span>
                </>
              )}
            </div>
          )}

          {!isLoggedIn && range?.from && range?.to && (
            <p className="text-xs text-muted-foreground text-center">
              You must be logged in to book.
            </p>
          )}

          {isOwnVenue ? (
            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm text-center text-muted-foreground border rounded-lg py-2 px-3 bg-muted">
                This is your venue.
              </p>
              <Link
                href="/profile"
                className="w-full text-center rounded-lg border py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                View bookings
              </Link>
              <Link
                href="/profile"
                className="w-full text-center rounded-lg border py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                My venues
              </Link>
            </div>
          ) : (
            <button
              disabled={!range?.from || !range?.to || !isLoggedIn || isBooking}
              onClick={handleBook}
              className="mt-2 cursor-pointer w-full rounded-lg bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isBooking ? "Booking..." : "Book now"}
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
