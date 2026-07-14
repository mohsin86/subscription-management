import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionSchema } from "@/lib/validation/subscription";

/**
 * GET /api/subscriptions — lists the logged-in user's subscriptions.
 * Args: none (reads the session). Returns: 200 JSON Subscription[], or 401 if not logged in.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    orderBy: { renewalDate: "asc" },
  });

  return NextResponse.json(subscriptions);
}

/**
 * POST /api/subscriptions — creates a subscription for the logged-in user.
 * Args: request body (SubscriptionSchema shape). Returns: 201 JSON Subscription, 400 if invalid, 401 if not logged in.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = SubscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const subscription = await prisma.subscription.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  });

  return NextResponse.json(subscription, { status: 201 });
}
