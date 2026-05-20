"use client";

import { useUserStore } from "@/lib/hooks/useUserStore";
import {
  deleteVenueAction,
  getManagerVenuesAction,
  getVenueWithBookingsAction,
} from "@/lib/actions/venueActions";
import type { Venue, VenueWithBookings } from "@/lib/types/apiTypes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DateTime } from "luxon";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import VenueForm from "./VenueForm";

type View = "list" | "create" | "edit";

export default function VenueManagerDashboard() {
  const { name, accessToken, isLoggedIn, venueManager } = useUserStore();

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("list");
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookingsMap, setBookingsMap] = useState<
    Record<string, VenueWithBookings>
  >({});
  const [loadingBookingsId, setLoadingBookingsId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!isLoggedIn || !venueManager) return;
    async function load() {
      const data = await getManagerVenuesAction(name, accessToken);
      setVenues(data);
      setLoading(false);
    }
    void load();
  }, [isLoggedIn, venueManager, name, accessToken]);

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenueAction(accessToken, id);
      setVenues((v) => v.filter((x) => x.id !== id));
      toast.success("Venue deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function toggleBookings(venueId: string) {
    if (expandedId === venueId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(venueId);
    if (bookingsMap[venueId]) return;
    setLoadingBookingsId(venueId);
    const data = await getVenueWithBookingsAction(accessToken, venueId);
    if (data) setBookingsMap((prev) => ({ ...prev, [venueId]: data }));
    setLoadingBookingsId(null);
  }

  function handleEditSuccess(updated: Venue) {
    setVenues((v) => v.map((x) => (x.id === updated.id ? updated : x)));
    setView("list");
    setEditingVenue(null);
    toast.success("Venue updated!");
  }

  function handleCreateSuccess(created: Venue) {
    setVenues((v) => [created, ...v]);
    setView("list");
    toast.success("Venue created!");
  }

  if (!isLoggedIn || !venueManager) return null;

  if (view === "create") {
    return (
      <VenueForm
        onSuccess={handleCreateSuccess}
        onCancel={() => setView("list")}
      />
    );
  }

  if (view === "edit" && editingVenue) {
    return (
      <VenueForm
        initial={editingVenue}
        onSuccess={handleEditSuccess}
        onCancel={() => {
          setView("list");
          setEditingVenue(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Venues</h1>
        <button
          onClick={() => setView("create")}
          className="flex cursor-pointer items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Add New Venue
        </button>
      </div>

      {loading && (
        <p className="text-muted-foreground text-sm">Loading venues...</p>
      )}

      {!loading && venues.length === 0 && (
        <div className="border rounded-xl p-10 text-center text-muted-foreground">
          <p className="mb-4">You have not created any venues yet.</p>
          <button
            onClick={() => setView("create")}
            className="flex cursor-pointer items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors mx-auto"
          >
            <Plus size={16} />
            Create your first venue
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <div className="flex gap-4 p-4">
              {venue.media.length > 0 && (
                <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={venue.media[0].url}
                    alt={venue.media[0].alt}
                    fill
                    sizes="112px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="font-semibold text-base truncate">
                  {venue.name}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {venue.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {venue.price} NOK / night
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {venue.maxGuests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {venue._count.bookings} booking
                    {venue._count.bookings !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingVenue(venue);
                    setView("edit");
                  }}
                  className="flex cursor-pointer items-center gap-1.5 text-sm border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(venue.id)}
                  className="flex cursor-pointer items-center gap-1.5 text-sm border border-red-200 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
                <button
                  onClick={() => toggleBookings(venue.id)}
                  className="flex cursor-pointer items-center justify-center gap-1.5 text-sm border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
                >
                  <CalendarDays size={14} />
                  {expandedId === venue.id ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>
            </div>

            {expandedId === venue.id && (
              <div className="border-t px-4 py-4 bg-muted/30">
                <h3 className="font-medium text-sm mb-3">Bookings</h3>

                {loadingBookingsId === venue.id && (
                  <p className="text-sm text-muted-foreground">
                    Loading bookings...
                  </p>
                )}

                {loadingBookingsId !== venue.id && bookingsMap[venue.id] && (
                  <>
                    {!bookingsMap[venue.id].bookings?.length && (
                      <p className="text-sm text-muted-foreground">
                        No bookings yet.
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      {bookingsMap[venue.id].bookings?.map((b) => (
                        <div
                          key={b.id}
                          className="flex flex-wrap items-center gap-4 text-sm bg-background rounded-lg border px-3 py-2"
                        >
                          <CalendarDays
                            size={14}
                            className="text-muted-foreground shrink-0"
                          />
                          <span>
                            {DateTime.fromISO(b.dateFrom).toLocaleString(
                              DateTime.DATE_MED,
                            )}{" "}
                            →{" "}
                            {DateTime.fromISO(b.dateTo).toLocaleString(
                              DateTime.DATE_MED,
                            )}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users size={13} />
                            {b.guests} guest{b.guests !== 1 ? "s" : ""}
                          </span>
                          {b.customer && (
                            <span className="ml-auto text-muted-foreground">
                              {b.customer.name}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
