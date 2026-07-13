"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoginSchema, type LoginFormData } from "@/lib/validation/auth";
import { loginAction, googleLoginAction } from "./actions";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    const result = await loginAction(data);
    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <button type="submit" disabled={isSubmitting} className="border px-4 py-2">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <form action={googleLoginAction}>
        <button type="submit" className="border px-4 py-2 w-full">
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
