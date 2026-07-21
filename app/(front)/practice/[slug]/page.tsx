import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL, INTERVIEW_PRACTICE_TOPICS } from "@/lib/interview-practice";
import InterviewQuestionsList from "./InterviewQuestionsList";

/**
 * PracticeTopicPage — public page for one category's interview questions.
 * Args: params.slug (string) — must match a slug in INTERVIEW_PRACTICE_TOPICS.
 * Returns: InterviewQuestionsList JSX; 404s only for an unknown slug. Edit/Delete
 * are gated inside InterviewQuestionsList via the isOwner flag computed here.
 */
export default async function PracticeTopicPage(
  { params }: PageProps<"/practice/[slug]">
) {
  const { slug } = await params;
  const topic = INTERVIEW_PRACTICE_TOPICS.find((item) => item.slug === slug);
  if (!topic) {
    notFound();
  }

  const session = await auth();
  const isOwner = session?.user?.email === INTERVIEW_PRACTICE_EMAIL;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/practice" className="text-sm underline text-gray-500">
        &larr; Back to Interview Practice
      </Link>

      <InterviewQuestionsList categoryTitle={topic.title} isOwner={isOwner} />
    </section>
  );
}
