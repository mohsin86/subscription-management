import { z } from "zod";

/**
 * PasswordSchema — validates the set/update password form.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const PasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type PasswordFormData = z.infer<typeof PasswordSchema>;
