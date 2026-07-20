"use server";

import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/get-base-url";
import { sendVerificationEmail } from "@/lib/email/verification";
import { SignupSchema, type SignupFormData } from "@/lib/validation/auth";

const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * createVerificationTokenAndSendEmail — issues a fresh VerificationToken row
 * for the given email and emails a confirmation link for it.
 * Args: email (string). Returns: void.
 */
async function createVerificationTokenAndSendEmail(email: string): Promise<void> {
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  const token = randomUUID();
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires: new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS) },
  });

  const baseUrl = await getBaseUrl();
  await sendVerificationEmail(email, `${baseUrl}/api/verify-email?token=${token}`);
}

/**
 * signupAction — creates a new user account with a hashed password, then
 * emails a confirmation link. The account can't log in until it's verified.
 * Args: data (SignupFormData). Returns: { error } on failure; redirects to a
 * "check your email" page on success.
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

  try {
    await createVerificationTokenAndSendEmail(parsed.data.email);
  } catch {
    return { error: "Account created, but the confirmation email failed to send. Try signing in to resend it." };
  }

  redirect(`/subscription-management/signup/check-email?email=${encodeURIComponent(parsed.data.email)}`);
}

/**
 * googleSignupAction — starts the Google OAuth signup/sign-in flow.
 * Args: none. Returns: void — redirects to /dashboard on success.
 */
export async function googleSignupAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
