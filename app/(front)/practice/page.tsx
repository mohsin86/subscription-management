import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";

export const metadata: Metadata = {
  title: "Interview Practice",
  description: "Interview prep notes across frontend, backend, and system design topics.",
};

/**
 * PracticePage — public menu listing all interview practice topics.
 * Args: none. Returns: list of links to /practice/[slug]; owner-only links to
 * /practice/add-question and /practice/topics.
 */
export default async function PracticePage() {
  const session = await auth();
  const isOwner = session?.user?.email === INTERVIEW_PRACTICE_EMAIL;

  const topics = await prisma.topic.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">Interview Practice</h1>
      <p className="mt-1 text-gray-500 text-sm">Pick a topic to review.</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/practice/${topic.slug}`}
              className="block border px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>

      {isOwner && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/practice/add-question" className="underline text-gray-500">
            + Add question
          </Link>
          <Link href="/practice/topics" className="underline text-gray-500">
            Manage topics
          </Link>
        </div>
      )}
    </section>
  );
}
