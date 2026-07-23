import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";
import { slugify } from "@/lib/slugify";
import { InterviewTopicSchema } from "@/lib/validation/interview-topic";

/**
 * GET /api/interview-topics — lists all topics, ordered for the menu, each
 * with its question count for the topic management page.
 * Public: the Interview Practice topic list is read-only for everyone.
 * Returns: 200 JSON Topic[].
 */
export async function GET() {
  const topics = await prisma.topic.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { questions: true } } },
  });
  return NextResponse.json(topics);
}

/**
 * POST /api/interview-topics — creates a new topic, appended to the end of the list.
 * Args: request body { title, slug? } — slug is auto-derived from title if omitted.
 * Returns: 201 JSON Topic, 400 if invalid, 409 if the slug is already taken,
 * 404 if not the interview-practice account.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.email !== INTERVIEW_PRACTICE_EMAIL) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = InterviewTopicSchema.safeParse({
    title: body.title,
    slug: body.slug || slugify(body.title ?? ""),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const existing = await prisma.topic.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "That slug is already taken." }, { status: 409 });
  }

  const last = await prisma.topic.findFirst({ orderBy: { order: "desc" } });

  const created = await prisma.topic.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      order: (last?.order ?? -1) + 1,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
