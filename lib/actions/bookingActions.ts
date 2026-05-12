"use server";

import { createBooking, getProfileBookings } from "@/lib/db/userAuth";

export async function createBookingAction(
  accessToken: string,
  data: { dateFrom: string; dateTo: string; guests: number; venueId: string },
) {
  return await createBooking(accessToken, data);
}

export async function getProfileBookingsAction(
  name: string,
  accessToken: string,
) {
  return await getProfileBookings(name, accessToken);
}
