import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Name can only contain letters, numbers, and underscores",
    ),
  email: z
    .string()
    .email("Invalid email")
    .regex(/@stud\.noroff\.no$/, "Must be a @stud.noroff.no email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  avatar: z
    .object({
      url: z.string().url("Avatar must be a valid URL"),
      alt: z
        .string()
        .max(120, "Avatar alt must be less than 120 characters")
        .optional(),
    })
    .optional(),
  banner: z
    .object({
      url: z.string().url("Banner must be a valid URL"),
      alt: z
        .string()
        .max(120, "Banner alt must be less than 120 characters")
        .optional(),
    })
    .optional(),
  venueManager: z.boolean().optional(),
});

export { schema };
export type FormData = z.infer<typeof schema>;
