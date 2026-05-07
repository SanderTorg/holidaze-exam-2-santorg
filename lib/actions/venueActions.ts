"use server";

import {
  createVenue,
  deleteVenue,
  updateVenue,
  getManagerVenues,
  getVenueWithBookings,
} from "@/lib/db/userAuth";
import type { CreateVenueInput } from "@/lib/types/apiTypes";

export async function createVenueAction(
  accessToken: string,
  venue: CreateVenueInput,
) {
  return await createVenue(accessToken, venue);
}

export async function updateVenueAction(
  accessToken: string,
  id: string,
  venue: CreateVenueInput,
) {
  return await updateVenue(accessToken, id, venue);
}

export async function deleteVenueAction(accessToken: string, id: string) {
  return await deleteVenue(accessToken, id);
}

export async function getManagerVenuesAction(
  name: string,
  accessToken: string,
) {
  return await getManagerVenues(name, accessToken);
}

export async function getVenueWithBookingsAction(
  accessToken: string,
  id: string,
) {
  return await getVenueWithBookings(accessToken, id);
}
