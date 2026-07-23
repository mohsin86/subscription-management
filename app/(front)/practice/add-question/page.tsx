import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import AddQuestionForm from "../AddQuestionForm";

/**
 * AddQuestionPage — owner-only page for adding a new interview question.
 * Args: none (server component; only renders for INTERVIEW_PRACTICE_EMAIL, 404s otherwise).
 * Returns: back link + AddQuestionForm JSX.
 */
export default async function AddQuestionPage() {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/practice" className="text-sm underline text-gray-500">
        &larr; Back to Interview Practice
      </Link>

      <h1 className="mt-4 text-2xl font-bold">Add Question</h1>

      <div className="mt-6">
        <AddQuestionForm />
      </div>
    </section>
  );
}
