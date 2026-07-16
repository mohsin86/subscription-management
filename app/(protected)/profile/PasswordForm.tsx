"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema, type PasswordFormData } from "@/lib/validation/password";
import { updatePasswordAction } from "./actions";
import { DEMO_EMAIL } from "@/lib/demo-account";

/**
 * PasswordForm — lets the user set or update their login password.
 * Args: hasPassword (boolean) — whether the account already has a password (Google-only accounts don't).
 * Returns: form JSX; calls updatePasswordAction on submit. Disabled for the demo account.
 */
export default function PasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const { data: session } = useSession();
  const isDemoAccount = session?.user?.email === DEMO_EMAIL;

  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(data: PasswordFormData) {
    const result = await updatePasswordAction(data);
    if ("error" in result) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }
    setStatus("saved");
    setErrorMessage("");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label htmlFor="password">{hasPassword ? "New password" : "Set password"}</label>
        <input
          id="password"
          type="password"
          disabled={isDemoAccount}
          {...register("password")}
          className="border px-2 py-1 w-full disabled:opacity-40"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          disabled={isDemoAccount}
          {...register("confirmPassword")}
          className="border px-2 py-1 w-full disabled:opacity-40"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isDemoAccount}
        title={isDemoAccount ? "Changing the password is disabled for the demo account" : undefined}
        className="border px-4 py-2 w-fit disabled:opacity-40"
      >
        {isSubmitting ? "Saving..." : hasPassword ? "Update password" : "Set password"}
      </button>

      {status === "saved" && <p className="text-green-600 text-sm">Password saved.</p>}
      {status === "error" && errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </form>
  );
}
