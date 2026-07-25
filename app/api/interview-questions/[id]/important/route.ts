import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import { InterviewQuestionImportantSchema } from "@/lib/validation/interview-question";

/**
 * PATCH /api/interview-questions/[id]/important — toggles a question's
 * isImportant flag. Separate from the main edit PATCH since this is a
 * single-field, high-frequency toggle that doesn't need the full
 * question/answer/codeSnippet payload.
 * Args: params.id (string), request body { isImportant: boolean }.
 * Returns: 200 JSON InterviewQuestion, 400 if invalid, 404 if not the interview-practice account or missing row.
 */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/interview-questions/[id]/important">
) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;

  const body = await request.json();
  const parsed = InterviewQuestionImportantSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const existing = await prisma.interviewQuestion.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.interviewQuestion.update({
    where: { id },
    data: { isImportant: parsed.data.isImportant },
  });

  return NextResponse.json(updated);
}
