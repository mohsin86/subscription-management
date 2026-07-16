"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SettingsSchema } from "@/lib/validation/settings";
import { updateSettingsAction } from "./actions";

type SettingsFormInput = z.input<typeof SettingsSchema>;
type SettingsFormOutput = z.output<typeof SettingsSchema>;

/**
 * SettingsForm — form to save the user's Telegram chat ID.
 * Args: defaultChatId (string | null) — the currently saved value, if any.
 * Returns: form JSX; calls updateSettingsAction on submit.
 */
export default function SettingsForm({
  defaultChatId,
  defaultEnabled,
}: {
  defaultChatId: string | null;
  defaultEnabled: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SettingsFormInput, unknown, SettingsFormOutput>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: { telegramChatId: defaultChatId ?? "", telegramEnabled: defaultEnabled },
  });

  async function onSubmit(data: SettingsFormOutput) {
    const result = await updateSettingsAction(data);
    setStatus("error" in result ? "error" : "saved");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label htmlFor="telegramChatId">Telegram Chat ID</label>
        <input
          id="telegramChatId"
          {...register("telegramChatId")}
          placeholder="123456789"
          className="border px-2 py-1 w-full"
        />
      </div>

      <div className="flex items-center gap-2">
      <input id="telegramEnabled" type="checkbox" {...register("telegramEnabled")} />
      <label htmlFor="telegramEnabled">Enable Telegram reminders</label>
    </div>


      <button type="submit" disabled={isSubmitting} className="border px-4 py-2 w-fit">
        {isSubmitting ? "Saving..." : "Save"}
      </button>

      {status === "saved" && <p className="text-green-600 text-sm">Saved.</p>}
      {status === "error" && <p className="text-red-500 text-sm">Something went wrong.</p>}
    </form>
  );
}
