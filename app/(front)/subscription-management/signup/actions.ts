"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignupSchema, type SignupFormData } from "@/lib/validation/auth";

/**
 * signupAction — creates a new user account with a hashed password.
 * Args: data (SignupFormData). Returns: { error } on failure; redirects to login on success.
 */
export async function signupAction(
  data: SignupFormData
): Promise<{ error: string } | void> {
  const parsed = SignupSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input." };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
    },
  });

  redirect("/subscription-management/login");
}

/**
 * googleSignupAction — starts the Google OAuth signup/sign-in flow.
 * Args: none. Returns: void — redirects to /dashboard on success.
 */
export async function googleSignupAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
