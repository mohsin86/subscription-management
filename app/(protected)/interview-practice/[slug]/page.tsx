import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL, INTERVIEW_PRACTICE_TOPICS } from "@/lib/interview-practice";
import InterviewQuestionsList from "./InterviewQuestionsList";

/**
 * InterviewPracticeTopicPage — auth/slug gate for one category's questions.
 * Args: params.slug (string) — must match a slug in INTERVIEW_PRACTICE_TOPICS.
 * Returns: InterviewQuestionsList JSX; 404s for any account other than INTERVIEW_PRACTICE_EMAIL or an unknown slug.
 */
export default async function InterviewPracticeTopicPage(
  { params }: PageProps<"/interview-practice/[slug]">
) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    notFound();
  }

  const { slug } = await params;
  const topic = INTERVIEW_PRACTICE_TOPICS.find((item) => item.slug === slug);
  if (!topic) {
    notFound();
  }

  return (
    <section className="max-w-3xl">
      <Link href="/interview-practice" className="text-sm underline text-gray-500">
        &larr; Back to Interview Practice
      </Link>

      <InterviewQuestionsList categoryTitle={topic.title} />
    </section>
  );
}
