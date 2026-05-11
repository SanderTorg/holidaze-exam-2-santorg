export async function getAllVenues(): Promise<{
  data: import("@/lib/types/apiTypes").Datum[];
}> {
  try {
    const res = await fetch(`${process.env.API_HOLIDAZE_VENUES_URL}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { data: [] };
    const json = await res.json();
    return { data: Array.isArray(json?.data) ? json.data : [] };
  } catch {
    return { data: [] };
  }
}

export async function getVenueById(
  id: string,
): Promise<import("@/lib/types/apiTypes").DatumWithBookings | null> {
  try {
    const res = await fetch(
      `${process.env.API_HOLIDAZE_VENUES_URL}/${id}?_bookings=true`,
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
): Promise<import("@/lib/types/apiTypes").Datum[]> {
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
