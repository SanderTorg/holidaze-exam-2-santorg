"use client";

import { useEffect, useState } from "react";
import { formatNOK } from "@/lib/utils";
import { useUserStore } from "@/lib/hooks/useUserStore";
import {
  deleteBookingAction,
  getProfileBookingsAction,
  updateBookingAction,
} from "@/lib/actions/bookingActions";
import type { BookingWithVenue } from "@/lib/types/apiTypes";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";

export default function ViewBookingsClient() {
  const { name, accessToken, isLoggedIn } = useUserStore();
  const [bookings, setBookings] = useState<BookingWithVenue[]>([]);
  const [loading, setLoading] = useState(isLoggedIn && !!name && !!accessToken);

  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRange, setEditRange] = useState<DateRange | undefined>();
  const [editGuests, setEditGuests] = useState(1);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !name || !accessToken) return;
    async function load() {
      const data = await getProfileBookingsAction(name!, accessToken!);
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

  async function handleCancel(id: string) {
    if (cancelingId !== id) {
      setCancelingId(id);
      return;
    }
    setDeletingId(id);
    try {
      await deleteBookingAction(accessToken!, id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking cancelled.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to cancel.");
    } finally {
      setDeletingId(null);
      setCancelingId(null);
    }
  }

  function openEdit(booking: BookingWithVenue) {
    setEditingId(booking.id);
    setCancelingId(null);
    setEditRange({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    });
    setEditGuests(booking.guests);
  }

  function closeEdit() {
    setEditingId(null);
    setEditRange(undefined);
  }

  async function handleSaveEdit(booking: BookingWithVenue) {
    if (!editRange?.from || !editRange?.to) {
      toast.error("Please select a valid date range.");
      return;
    }
    setSaving(true);
    try {
      const updated = await updateBookingAction(accessToken!, booking.id, {
        dateFrom: DateTime.fromJSDate(editRange.from).toISO()!,
        dateTo: DateTime.fromJSDate(editRange.to).toISO()!,
        guests: editGuests,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                dateFrom: updated.dateFrom,
                dateTo: updated.dateTo,
                guests: updated.guests,
              }
            : b,
        ),
      );
      toast.success("Booking updated!");
      closeEdit();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update.");
    } finally {
      setSaving(false);
    }
  }

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
          <div
            key={i}
            className="h-40 sm:h-28 rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-muted-foreground">You have no bookings yet.</p>;
  }

  const now = DateTime.now();
  const today = DateTime.now().startOf("day").toJSDate();

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => {
        const from = DateTime.fromISO(booking.dateFrom);
        const to = DateTime.fromISO(booking.dateTo);
        const nights = Math.round(to.diff(from, "days").days);
        const isPast = to < now;
        const isEditing = editingId === booking.id;
        const isConfirmingCancel = cancelingId === booking.id;
        const isDeleting = deletingId === booking.id;
        const maxGuests = booking.venue?.maxGuests ?? 100;

        const editNights =
          editRange?.from && editRange?.to
            ? Math.round(
                DateTime.fromJSDate(editRange.to).diff(
                  DateTime.fromJSDate(editRange.from),
                  "days",
                ).days,
              )
            : 0;

        return (
          <div
            key={booking.id}
            className={`rounded-xl border overflow-hidden ${isPast ? "opacity-60" : ""}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              {booking.venue?.media?.[0] ? (
                <Link
                  href={`/venues/${booking.venue?.id}`}
                  className="relative w-full h-44 sm:w-40 sm:h-32 md:w-52 md:h-40 shrink-0 rounded-lg overflow-hidden block"
                >
                  <Image
                    src={booking.venue.media[0].url}
                    alt={
                      booking.venue.media[0].alt || booking.venue?.name || ""
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, 208px"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              ) : (
                <div className="w-full h-44 sm:w-40 sm:h-32 md:w-52 md:h-40 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  No image
                </div>
              )}

              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/venues/${booking.venue?.id}`}
                    className="font-semibold truncate hover:underline"
                  >
                    {booking.venue?.name ?? "Venue"}
                  </Link>
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
                    {[
                      booking.venue.location.city,
                      booking.venue.location.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs text-muted-foreground">
                  <CalendarDays size={12} className="shrink-0" />
                  <span>{from.toLocaleString(DateTime.DATE_MED)}</span>
                  <span>→</span>
                  <span>{to.toLocaleString(DateTime.DATE_MED)}</span>
                  <span className="ml-0.5">
                    ({nights} night{nights !== 1 ? "s" : ""})
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users size={12} />
                  {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
                </div>

                {booking.venue?.price && (
                  <p className="text-sm font-medium mt-1">
                    {formatNOK(nights * booking.venue.price)} total
                  </p>
                )}

                {!isPast && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() =>
                        isEditing ? closeEdit() : openEdit(booking)
                      }
                    >
                      <Pencil size={13} />
                      {isEditing ? "Cancel edit" : "Edit"}
                    </Button>

                    {isConfirmingCancel ? (
                      <>
                        <span className="text-xs text-destructive">
                          Are you sure?
                        </span>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-1.5"
                          disabled={isDeleting}
                          onClick={() => handleCancel(booking.id)}
                        >
                          <Trash2 size={13} />
                          {isDeleting ? "Cancelling…" : "Confirm"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setCancelingId(null)}
                        >
                          No
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-destructive hover:text-destructive"
                        onClick={() => handleCancel(booking.id)}
                      >
                        <Trash2 size={13} />
                        Cancel booking
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="border-t bg-muted/30 px-4 py-4 flex flex-col gap-4">
                <p className="text-sm font-medium">Edit booking</p>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <Calendar
                    mode="range"
                    selected={editRange}
                    onSelect={setEditRange}
                    disabled={{ before: today }}
                    numberOfMonths={1}
                    className="rounded-lg border bg-background"
                  />

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        Guests (max {maxGuests})
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          disabled={editGuests <= 1}
                          onClick={() =>
                            setEditGuests((g) => Math.max(1, g - 1))
                          }
                        >
                          −
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">
                          {editGuests}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          disabled={editGuests >= maxGuests}
                          onClick={() =>
                            setEditGuests((g) => Math.min(maxGuests, g + 1))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    {editRange?.from && editRange?.to && (
                      <div className="text-xs text-muted-foreground flex flex-col gap-0.5">
                        <span>
                          {DateTime.fromJSDate(editRange.from).toLocaleString(
                            DateTime.DATE_MED,
                          )}{" "}
                          →{" "}
                          {DateTime.fromJSDate(editRange.to).toLocaleString(
                            DateTime.DATE_MED,
                          )}
                        </span>
                        <span>
                          {editNights} night{editNights !== 1 ? "s" : ""}
                          {booking.venue?.price
                            ? ` · ${formatNOK(editNights * booking.venue.price)}`
                            : ""}
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-auto">
                      <Button
                        size="sm"
                        disabled={saving || !editRange?.from || !editRange?.to}
                        onClick={() => handleSaveEdit(booking)}
                      >
                        {saving ? "Saving…" : "Save changes"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={closeEdit}>
                        Discard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
