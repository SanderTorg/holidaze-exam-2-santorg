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
