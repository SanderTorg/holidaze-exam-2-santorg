export async function getAllVenues(): Promise<{
  data: import("@/lib/types/apiTypes").Venue[];
}> {
  try {
    const ressponse = await fetch(
      `${process.env.API_HOLIDAZE_VENUES_URL}?limit=100&page=1`,
      { cache: "no-store" },
    );
    if (!ressponse.ok) return { data: [] };
    const { data: venuesData, meta } = await ressponse.json();
    const venues: import("@/lib/types/apiTypes").Venue[] = Array.isArray(
      venuesData,
    )
      ? venuesData
      : [];
    const pageCount: number = meta?.pageCount ?? 1;

    if (pageCount > 1) {
      const rest = await Promise.all(
        Array.from({ length: pageCount - 1 }, (_, i) =>
          fetch(
            `${process.env.API_HOLIDAZE_VENUES_URL}?limit=100&page=${i + 2}`,
            { cache: "no-store" },
          ).then((r) => r.json()),
        ),
      );
      for (const json of rest) {
        if (Array.isArray(json?.data)) venues.push(...json.data);
      }
    }

    return { data: venues };
  } catch {
    return { data: [] };
  }
}

export async function getVenueById(
  id: string,
): Promise<import("@/lib/types/apiTypes").VenueWithBookings | null> {
  try {
    const res = await fetch(
      `${process.env.API_HOLIDAZE_VENUES_URL}/${id}?_bookings=true&_owner=true`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function searchVenues(
  query: string,
): Promise<import("@/lib/types/apiTypes").Venue[]> {
  try {
    const res = await fetch(
      `${process.env.API_HOLIDAZE_VENUES_URL}/search?q=${encodeURIComponent(query)}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
}
