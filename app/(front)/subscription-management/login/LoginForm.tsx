"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoginSchema, type LoginFormData } from "@/lib/validation/auth";
import { loginAction, googleLoginAction, resendVerificationAction } from "./actions";

const DEMO_EMAIL = "demo@subscription-tracker.dev";
const DEMO_PASSWORD = "Demo@1234";

/**
 * LoginForm — email/password + Google sign-in form, with a fill-demo-credentials shortcut.
 * Args: none. Returns: form JSX; calls loginAction or googleLoginAction on submit.
 */
export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

  function fillDemoCredentials() {
    setValue("email", DEMO_EMAIL);
    setValue("password", DEMO_PASSWORD);
  }

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setNeedsVerification(false);
    setResendState("idle");
    const result = await loginAction(data);
    if (result?.error) {
      setServerError(result.error);
      setNeedsVerification(!!result.needsVerification);
    }
  };

  async function handleResend() {
    setResendState("sending");
    const email = getValues("email");
    const result = await resendVerificationAction(email);
    setResendState("error" in result ? "error" : "sent");
  }

  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <div className="border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="font-medium">Just want to look around?</p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Use the demo account — no signup needed.
        </p>
        <p className="mt-2 font-mono text-xs">
          {DEMO_EMAIL} / {DEMO_PASSWORD}
        </p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-2 border border-zinc-900 px-3 py-1 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-100 dark:hover:bg-zinc-800"
        >
          Fill demo credentials
        </button>
      </div>

      <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} className="border px-2 py-1 w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} className="border px-2 py-1 w-full" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        {needsVerification && resendState !== "sent" && (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendState === "sending"}
            className="text-sm underline text-left w-fit"
          >
            {resendState === "sending" ? "Resending..." : "Resend confirmation email"}
          </button>
        )}
        {resendState === "sent" && (
          <p className="text-sm text-green-600">Confirmation email resent — check your inbox.</p>
        )}
        {resendState === "error" && (
          <p className="text-sm text-red-500">Failed to resend. Try again shortly.</p>
        )}
      </form>

      <div className="flex gap-3">
        <button type="submit" form="login-form" disabled={isSubmitting} className="border px-4 py-2 flex-1">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <form action={googleLoginAction} className="flex-1">
          <button type="submit" className="border px-4 py-2 w-full">
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
