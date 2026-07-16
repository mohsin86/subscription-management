"use server";

import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PasswordSchema, type PasswordFormData } from "@/lib/validation/password";
import { DEMO_EMAIL } from "@/lib/demo-account";

/**
 * updatePasswordAction — sets or updates the current user's login password.
 * Args: data (PasswordFormData). Returns: { error } on failure, { success: true } on success.
 */
export async function updatePasswordAction(
  data: PasswordFormData
): Promise<{ error: string } | { success: true }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not signed in." };
  }

  if (session.user.email === DEMO_EMAIL) {
    return { error: "Changing the password is disabled for the demo account." };
  }

  const parsed = PasswordSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const hashed = await bcrypt.hash(parsed.data.password, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: true };
}
