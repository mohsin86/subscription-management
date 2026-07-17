import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import { InterviewQuestionEditSchema } from "@/lib/validation/interview-question";

/**
 * PATCH /api/interview-questions/[id] — updates one question's content.
 * Args: params.id (string), request body (InterviewQuestionEditSchema shape).
 * Returns: 200 JSON InterviewQuestion, 400 if invalid, 404 if not the interview-practice account or missing row.
 */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/interview-questions/[id]">
) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;

  const body = await request.json();
  const parsed = InterviewQuestionEditSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const existing = await prisma.interviewQuestion.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.interviewQuestion.update({
    where: { id },
    data: {
      question: parsed.data.question,
      answer: parsed.data.answer,
      codeSnippet: parsed.data.codeSnippet || null,
    },
  });

  return NextResponse.json(updated);
}

/**
 * DELETE /api/interview-questions/[id] — deletes one question.
 * Args: params.id (string). Returns: 200 JSON { success: true }, 404 if not the interview-practice account or missing row.
 */
export async function DELETE(
  request: Request,
  { params }: RouteContext<"/api/interview-questions/[id]">
) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;

  const existing = await prisma.interviewQuestion.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.interviewQuestion.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
