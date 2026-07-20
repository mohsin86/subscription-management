"use server";

import { randomUUID } from "crypto";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/get-base-url";
import { sendVerificationEmail } from "@/lib/email/verification";
import { LoginSchema, type LoginFormData } from "@/lib/validation/auth";

const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const NOT_VERIFIED_ERROR = "Please verify your email before logging in.";

/**
 * loginAction — signs a user in with email/password credentials. Accounts
 * with a password but no confirmed email are blocked until verified.
 * Args: data (LoginFormData). Returns: { error, needsVerification? } on
 * failure; redirects to /dashboard on success.
 */
export async function loginAction(
  data: LoginFormData
): Promise<{ error: string; needsVerification?: boolean } | void> {
  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (user?.password && !user.emailVerified) {
    return { error: NOT_VERIFIED_ERROR, needsVerification: true };
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
 * resendVerificationAction — re-issues a fresh confirmation link for an
 * unverified account (the old token, if any, is discarded).
 * Args: email (string). Returns: { sent: true } or { error }.
 */
export async function resendVerificationAction(
  email: string
): Promise<{ sent: true } | { error: string }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.password || user.emailVerified) {
    return { error: "Nothing to resend for this account." };
  }

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  const token = randomUUID();
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires: new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS) },
  });

  const baseUrl = await getBaseUrl();

  try {
    await sendVerificationEmail(email, `${baseUrl}/api/verify-email?token=${token}`);
  } catch {
    return { error: "Failed to resend the confirmation email. Try again shortly." };
  }

  return { sent: true };
}

/**
 * googleLoginAction — starts the Google OAuth sign-in flow.
 * Args: none. Returns: void — redirects to /dashboard on success.
 */
export async function googleLoginAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
