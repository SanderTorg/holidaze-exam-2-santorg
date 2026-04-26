export function getAllVenues() {
  return fetch(`${process.env.API_HOLIDAZE_VENUES_URL}`).then((res) =>
    res.json(),
  );
}
