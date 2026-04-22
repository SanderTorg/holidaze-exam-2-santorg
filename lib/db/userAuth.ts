import type { RegisterFormData, RegisterResponse } from "../types/userTypes";

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
}): Promise<{ data: { accessToken: string; name: string; email: string } }> {
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
