import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .regex(/@stud\.noroff\.no$/, "Must be a @stud.noroff.no email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export { loginSchema };
