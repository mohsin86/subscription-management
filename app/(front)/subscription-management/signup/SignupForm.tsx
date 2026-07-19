"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignupSchema, type SignupFormData } from "@/lib/validation/auth";
import { signupAction, googleSignupAction } from "./actions";

/**
 * SignupForm — Google signup only for now; email/password fields are shown
 * but disabled, with a message explaining why.
 * Args: none. Returns: form JSX; calls googleSignupAction on submit.
 */
export default function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(SignupSchema) });

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);
    const result = await signupAction(data);
    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <p className="text-sm text-zinc-500 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2">
        Email/password signup is temporarily disabled. Please sign up with Google for now.
      </p>

      <form
        id="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 opacity-50 pointer-events-none"
      >
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" disabled {...register("name")} className="border px-2 py-1 w-full" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" disabled {...register("email")} className="border px-2 py-1 w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" disabled {...register("password")} className="border px-2 py-1 w-full" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" disabled {...register("confirmPassword")} className="border px-2 py-1 w-full" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      </form>

      <div className="flex gap-3">
        <button type="submit" form="signup-form" disabled className="border px-4 py-2 flex-1 opacity-50 cursor-not-allowed">
          Sign up
        </button>

        <form action={googleSignupAction} className="flex-1">
          <button type="submit" className="border px-4 py-2 w-full">
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
