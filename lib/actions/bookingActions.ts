"use server";

import {
  createBooking,
  deleteBooking,
  getProfileBookings,
  updateBooking,
} from "@/lib/db/userAuth";

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

export async function deleteBookingAction(
  accessToken: string,
  id: string,
): Promise<void> {
  return await deleteBooking(accessToken, id);
}

export async function updateBookingAction(
  accessToken: string,
  id: string,
  data: { dateFrom: string; dateTo: string; guests: number },
) {
  return await updateBooking(accessToken, id, data);
}
