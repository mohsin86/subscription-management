"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema, type LoginFormData } from "@/lib/validation/auth";

/**
 * loginAction — signs a user in with email/password credentials.
 * Args: data (LoginFormData). Returns: { error } on failure; redirects to /dashboard on success.
 */
export async function loginAction(
  data: LoginFormData
): Promise<{ error: string } | void> {
  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}

/**
 * googleLoginAction — starts the Google OAuth sign-in flow.
 * Args: none. Returns: void — redirects to /dashboard on success.
 */
export async function googleLoginAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
