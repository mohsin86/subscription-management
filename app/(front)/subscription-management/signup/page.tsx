import SignupForm from "./SignupForm";

/**
 * SignupPage — signup route wrapping SignupForm.
 * Args: none. Returns: page JSX.
 */
export default function SignupPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold">Sign up</h1>
      <div className="max-w-sm w-full border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 rounded-md px-4 py-3 mt-3 mb-6 text-center">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
          🔔 Never miss a renewal — add your subscriptions and Telegram ID for instant email & Telegram reminders.
        </p>
      </div>
      <SignupForm />
    </section>
  );
}
