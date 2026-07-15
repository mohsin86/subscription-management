import SignupForm from "./SignupForm";

/**
 * SignupPage — signup route wrapping SignupForm.
 * Args: none. Returns: page JSX.
 */
export default function SignupPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Sign up</h1>
      <SignupForm />
    </section>
  );
}
