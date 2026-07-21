import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL, INTERVIEW_PRACTICE_TOPICS } from "@/lib/interview-practice";
import AddQuestionForm from "./AddQuestionForm";

export const metadata: Metadata = {
  title: "Interview Practice",
  description: "Interview prep notes across frontend, backend, and system design topics.",
};

/**
 * PracticePage — public menu listing all interview practice topics.
 * Args: none. Returns: list of links to /practice/[slug]; shows AddQuestionForm
 * only when signed in as INTERVIEW_PRACTICE_EMAIL.
 */
export default async function PracticePage() {
  const session = await auth();
  const isOwner = session?.user?.email === INTERVIEW_PRACTICE_EMAIL;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">Interview Practice</h1>
      <p className="mt-1 text-gray-500 text-sm">Pick a topic to review.</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {INTERVIEW_PRACTICE_TOPICS.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/practice/${topic.slug}`}
              className="block border px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>

      {isOwner && <AddQuestionForm />}
    </section>
  );
}
