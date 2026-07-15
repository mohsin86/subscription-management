import { z } from "zod";

/**
 * SettingsSchema — validates the account settings form.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const SettingsSchema = z.object({
  telegramChatId: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof SettingsSchema>;
