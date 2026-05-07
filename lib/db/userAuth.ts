import type { RegisterFormData, RegisterResponse } from "../types/userTypes";
import type {
  CreateVenueInput,
  Datum,
  DatumWithBookings,
} from "../types/apiTypes";

export async function createVenue(
  accessToken: string,
  venue: CreateVenueInput,
): Promise<Datum> {
  const response = await fetch(`${process.env.API_HOLIDAZE_VENUES_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
    },
    body: JSON.stringify(venue),
  });

  const json = await response.json();

  if (!response.ok) {
    const message =
      json?.errors?.[0]?.message ?? `Create venue failed (${response.status})`;
    throw new Error(message);
  }

  return json?.data;
}

export async function deleteVenue(
  accessToken: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${process.env.API_HOLIDAZE_VENUES_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
    },
  });

  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    const message =
      json?.errors?.[0]?.message ?? `Delete venue failed (${response.status})`;
    throw new Error(message);
  }
}

export async function updateProfile(
  name: string,
  accessToken: string,
  data: { bio?: string; avatar?: { url: string; alt: string }; banner?: { url: string; alt: string } },
): Promise<{
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
}> {
  const response = await fetch(
    `${process.env.API_HOLIDAZE_PROFILES_URL}/${name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
      },
      body: JSON.stringify(data),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    const message =
      json?.errors?.[0]?.message ?? `Update failed (${response.status})`;
    throw new Error(message);
  }

  return json?.data;
}

export async function registerUser(
  formData: RegisterFormData,
): Promise<RegisterResponse> {
  const response = await fetch(`${process.env.API_AUTH_REGISTER_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.errors?.[0]?.message ?? `Registration failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function loginUser(formData: {
  email: string;
  password: string;
}): Promise<{
  data: {
    accessToken: string;
    name: string;
    email: string;
    venueManager: boolean;
    avatar?: { url: string; alt: string };
    banner?: { url: string; alt: string };
  };
}> {
  const response = await fetch(
    `${process.env.API_AUTH_LOGIN_URL}?_holidaze=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
      },
      body: JSON.stringify(formData),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.errors?.[0]?.message ?? `Login failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function getManagerVenues(
  name: string,
  accessToken: string,
): Promise<Datum[]> {
  const response = await fetch(
    `${process.env.API_HOLIDAZE_PROFILES_URL}/${name}/venues`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
      },
    },
  );
  const json = await response.json();
  if (!response.ok) return [];
  return Array.isArray(json?.data) ? json.data : [];
}

export async function updateVenue(
  accessToken: string,
  id: string,
  venue: CreateVenueInput,
): Promise<Datum> {
  const response = await fetch(`${process.env.API_HOLIDAZE_VENUES_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
    },
    body: JSON.stringify(venue),
  });
  const json = await response.json();
  if (!response.ok) {
    const message =
      json?.errors?.[0]?.message ?? `Update venue failed (${response.status})`;
    throw new Error(message);
  }
  return json?.data;
}

export async function getVenueWithBookings(
  accessToken: string,
  id: string,
): Promise<DatumWithBookings | null> {
  const response = await fetch(
    `${process.env.API_HOLIDAZE_VENUES_URL}/${id}?_bookings=true&_customer=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,
      },
    },
  );
  const json = await response.json();
  if (!response.ok) return null;
  return json?.data ?? null;
}
