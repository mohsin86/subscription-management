"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SettingsSchema, type SettingsFormData } from "@/lib/validation/settings";

/**
 * updateSettingsAction — saves the current user's Telegram chat ID.
 * Args: data (SettingsFormData). Returns: { error } on failure, { success: true } on success.
 */
export async function updateSettingsAction(
  data: SettingsFormData
): Promise<{ error: string } | { success: true }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not signed in." };
  }

  const parsed = SettingsSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { telegramChatId: parsed.data.telegramChatId || null, 
            telegramEnabled: parsed.data.telegramEnabled 
          },
  });

  return { success: true };
}
