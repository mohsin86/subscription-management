import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Subscription Tracker Login",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Subscription Tracker Login</h1>
      <LoginForm />
    </section>
  );
}
