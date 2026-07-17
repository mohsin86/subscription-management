import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";

/**
 * GET /api/interview-questions?category=X — lists all questions for a category, ordered.
 * Args: query param `category` (string). Returns: 200 JSON InterviewQuestion[], 401/404 if not the interview-practice account.
 */
export async function GET(request: Request) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

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
