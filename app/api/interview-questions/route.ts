import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import { InterviewQuestionCreateSchema } from "@/lib/validation/interview-question";

/**
 * GET /api/interview-questions?category=X — lists all questions for a category, ordered.
 * Public: the Interview Practice pages are read-only for everyone.
 * Args: query param `category` (string). Returns: 200 JSON InterviewQuestion[].
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  if (!category) {
    return NextResponse.json({ error: "Missing category" }, { status: 400 });
  }

  const questions = await prisma.interviewQuestion.findMany({
    where: { category },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(questions);
}

/**
 * POST /api/interview-questions — creates a new question, appended to the end
 * of its category.
 * Args: request body (InterviewQuestionCreateSchema shape).
 * Returns: 201 JSON InterviewQuestion, 400 if invalid, 404 if not the interview-practice account.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = InterviewQuestionCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const last = await prisma.interviewQuestion.findFirst({
    where: { category: parsed.data.category },
    orderBy: { order: "desc" },
  });

  const created = await prisma.interviewQuestion.create({
    data: {
      category: parsed.data.category,
      question: parsed.data.question,
      answer: parsed.data.answer,
      codeSnippet: parsed.data.codeSnippet || null,
      order: (last?.order ?? -1) + 1,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
