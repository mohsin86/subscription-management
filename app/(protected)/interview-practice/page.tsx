import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL, INTERVIEW_PRACTICE_TOPICS } from "@/lib/interview-practice";

/**
 * InterviewPracticePage — menu listing all interview practice topics.
 * Args: none (server component; only renders for INTERVIEW_PRACTICE_EMAIL, 404s otherwise).
 * Returns: list of links to /interview-practice/[slug].
 */
export default async function InterviewPracticePage() {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Interview Practice</h1>
      <p className="mt-1 text-gray-500 text-sm">Pick a topic to review.</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {INTERVIEW_PRACTICE_TOPICS.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/interview-practice/${topic.slug}`}
              className="block border px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
