import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL, INTERVIEW_PRACTICE_TOPICS } from "@/lib/interview-practice";

/**
 * InterviewPracticeTopicPage — renders one category's questions from the
 * InterviewQuestion table, grouped by section.
 * Args: params.slug (string) — must match a slug in INTERVIEW_PRACTICE_TOPICS.
 * Returns: rendered Q&A list; 404s for any account other than INTERVIEW_PRACTICE_EMAIL or an unknown slug.
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

  const questions = await prisma.interviewQuestion.findMany({
    where: { category: topic.title },
    orderBy: { order: "asc" },
  });

  const sections: { name: string | null; entries: typeof questions }[] = [];
  for (const q of questions) {
    const last = sections[sections.length - 1];
    if (last && last.name === q.section) {
      last.entries.push(q);
    } else {
      sections.push({ name: q.section, entries: [q] });
    }
  }

  return (
    <section className="max-w-3xl">
      <Link href="/interview-practice" className="text-sm underline text-gray-500">
        &larr; Back to Interview Practice
      </Link>

      <div className="interview-content mt-4">
        <h1>{topic.title}</h1>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.name && <h2>{section.name}</h2>}

            {section.entries.map((q) => (
              <InterviewQuestionCard key={q.id} question={q.question} answer={q.answer} codeSnippet={q.codeSnippet} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * InterviewQuestionCard — renders one question/answer/codeSnippet row as HTML.
 * Args: question, answer (markdown strings), codeSnippet (string | null).
 * Returns: a styled card with the question as a heading, answer as prose, and code (if any) in its own box.
 */
async function InterviewQuestionCard({
  question,
  answer,
  codeSnippet,
}: {
  question: string;
  answer: string;
  codeSnippet: string | null;
}) {
  const questionHtml = await marked.parseInline(question);
  const answerHtml = answer ? await marked.parse(answer) : "";
  const codeHtml = codeSnippet ? await marked.parse("```\n" + codeSnippet + "\n```") : null;

  return (
    <div className="interview-question">
      <h3 dangerouslySetInnerHTML={{ __html: questionHtml }} />
      {answerHtml && <div dangerouslySetInnerHTML={{ __html: answerHtml }} />}
      {codeHtml && <div dangerouslySetInnerHTML={{ __html: codeHtml }} />}
    </div>
  );
}
