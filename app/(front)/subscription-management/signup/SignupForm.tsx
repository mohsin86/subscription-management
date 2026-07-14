"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignupSchema, type SignupFormData } from "@/lib/validation/auth";
import { signupAction, googleSignupAction } from "./actions";

export default function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name")} className="border px-2 py-1 w-full" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" {...register("confirmPassword")} className="border px-2 py-1 w-full" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        <button type="submit" disabled={isSubmitting} className="border px-4 py-2">
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <form action={googleSignupAction}>
        <button type="submit" className="border px-4 py-2 w-full">
          Sign up with Google
        </button>
      </form>
    </div>
  );
}
