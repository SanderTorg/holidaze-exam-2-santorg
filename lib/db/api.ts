export async function getAllVenues() {
  const res = await fetch(`${process.env.API_HOLIDAZE_VENUES_URL}`);
  return res.json();
}
