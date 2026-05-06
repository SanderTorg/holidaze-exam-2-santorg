"use server";

import { registerUser, loginUser, updateProfile } from "@/lib/db/userAuth";
import type { RegisterFormData } from "@/lib/types/userTypes";

export async function registerAction(formData: RegisterFormData) {
  const data = await registerUser(formData);
  return data;
}

export async function loginAction(formData: {
  email: string;
  password: string;
}) {
  const data = await loginUser(formData);
  return data;
}

export async function updateProfileAction(
  name: string,
  accessToken: string,
  data: { bio?: string; avatar?: { url: string; alt: string } },
) {
  return await updateProfile(name, accessToken, data);
}
