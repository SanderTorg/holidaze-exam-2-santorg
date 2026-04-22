"use server";

import { registerUser } from "@/lib/db/userAuth";
import type { RegisterFormData } from "@/lib/types/userTypes";

export async function registerAction(formData: RegisterFormData) {
  const data = await registerUser(formData);
  return data;
}
