import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Subscription Tracker Login",
};

/**
 * LoginPage — login route wrapping LoginForm.
 * Args: searchParams.verified/verifyError (string, optional) — set by the
 * /api/verify-email redirect to show a confirmation banner.
 * Returns: page JSX.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; verifyError?: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  const { verified, verifyError } = await searchParams;

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold">Subscription Tracker Login</h1>
      {verified && (
        <p className="max-w-sm w-full text-center text-sm text-green-600 mt-3">
          Email confirmed — you can sign in now.
        </p>
      )}
      {verifyError && (
        <p className="max-w-sm w-full text-center text-sm text-red-500 mt-3">
          That confirmation link is invalid or expired. Try signing in to resend it.
        </p>
      )}
      <div className="max-w-sm w-full border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 rounded-md px-4 py-3 mt-3 mb-6 text-center">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
          🔔 Never miss a renewal — add your subscriptions and Telegram ID for instant email & Telegram reminders.
        </p>
      </div>
      <LoginForm />

      <div className="hidden sm:block w-full max-w-2xl mt-16">
        <p className="text-center text-sm text-gray-500 mb-3">How it works</p>
        <img
          src="/subscription-flow.svg"
          alt="How the subscription tracker works: add a subscription, status auto-tracked, daily cron scan, reminder sent via email and Telegram"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
