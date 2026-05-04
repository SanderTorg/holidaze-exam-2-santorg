import type { RegisterFormData, RegisterResponse } from "../types/userTypes";

export async function updateProfile(
  name: string,
  accessToken: string,
  data: { bio?: string; avatar?: { url: string; alt: string } },
): Promise<{
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOLIDAZE_PROFILES_URL}/${name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${process.env.NEXT_PUBLIC_NOROFF_API_KEY}`,
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
  };
}> {
  const response = await fetch(`${process.env.API_AUTH_LOGIN_URL}`, {
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
      data?.errors?.[0]?.message ?? `Login failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}
