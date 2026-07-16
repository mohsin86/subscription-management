import fs from "fs";
import path from "path";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { INTERVIEW_PRACTICE_EMAIL, INTERVIEW_PRACTICE_TOPICS, unescapeMarkdown } from "@/lib/interview-practice";

/**
 * InterviewPracticeTopicPage — renders one content/interview-practice/*.md file as HTML.
 * Args: params.slug (string) — must match a slug in INTERVIEW_PRACTICE_TOPICS.
 * Returns: rendered markdown JSX; 404s for any account other than INTERVIEW_PRACTICE_EMAIL or an unknown slug.
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

  const filePath = path.join(process.cwd(), "content", "interview-practice", `${slug}.md`);
  const markdown = unescapeMarkdown(fs.readFileSync(filePath, "utf-8"));
  const html = await marked.parse(markdown);

  return (
    <section className="max-w-3xl">
      <Link href="/interview-practice" className="text-sm underline text-gray-500">
        &larr; Back to Interview Practice
      </Link>

      <div className="interview-content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
