import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionSchema } from "@/lib/validation/subscription";

/**
 * PATCH /api/subscriptions/[id] — updates one subscription owned by the logged-in user.
 * Args: params.id (string), request body (SubscriptionSchema shape).
 * Returns: 200 JSON Subscription, 400 if invalid, 401 if not logged in, 404 if missing/not owned.
 */
export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/subscriptions/[id]">
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const body = await request.json();
  const parsed = SubscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const existing = await prisma.subscription.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const subscription = await prisma.subscription.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json(subscription);
}

/**
 * DELETE /api/subscriptions/[id] — deletes one subscription owned by the logged-in user.
 * Args: params.id (string). Returns: 200 JSON { success: true }, 401 if not logged in, 404 if missing/not owned.
 */
export async function DELETE(
  request: Request,
  { params }: RouteContext<"/api/subscriptions/[id]">
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.subscription.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.subscription.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
