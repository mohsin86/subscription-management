import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import TopicsManager from "./TopicsManager";

/**
 * TopicsPage — owner-only page for adding, editing, and deleting interview
 * practice topics.
 * Args: none (server component; only renders for INTERVIEW_PRACTICE_EMAIL, 404s otherwise).
 * Returns: back link + TopicsManager JSX.
 */
export default async function TopicsPage() {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/practice" className="text-sm underline text-gray-500">
        &larr; Back to Interview Practice
      </Link>

      <h1 className="mt-4 text-2xl font-bold">Manage Topics</h1>

      <div className="mt-6">
        <TopicsManager />
      </div>
    </section>
  );
}
