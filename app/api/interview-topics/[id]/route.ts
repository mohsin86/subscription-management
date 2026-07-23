import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import { InterviewTopicSchema } from "@/lib/validation/interview-topic";

/**
 * PATCH /api/interview-topics/[id] — updates a topic's title/slug.
 * Args: params.id (string), request body { title, slug }.
 * Returns: 200 JSON Topic, 400 if invalid, 409 if the slug is taken by
 * another topic, 404 if not the interview-practice account or missing row.
 */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/interview-topics/[id]">
) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;

  const body = await request.json();
  const parsed = InterviewTopicSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const existing = await prisma.topic.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const slugTaken = await prisma.topic.findFirst({
    where: { slug: parsed.data.slug, id: { not: id } },
  });
  if (slugTaken) {
    return NextResponse.json({ error: "That slug is already taken." }, { status: 409 });
  }

  const updated = await prisma.topic.update({
    where: { id },
    data: { title: parsed.data.title, slug: parsed.data.slug },
  });

  return NextResponse.json(updated);
}

/**
 * DELETE /api/interview-topics/[id] — deletes a topic and, via the FK's
 * onDelete: Cascade, every question under it.
 * Args: params.id (string). Returns: 200 JSON { success: true }, 404 if not
 * the interview-practice account or missing row.
 */
export async function DELETE(
  request: Request,
  { params }: RouteContext<"/api/interview-topics/[id]">
) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;

  const existing = await prisma.topic.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.topic.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
