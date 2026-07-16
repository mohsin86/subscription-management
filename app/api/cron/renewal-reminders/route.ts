import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { getSubscriptionStatus } from "@/lib/subscription-status";
import { sendTelegramMessage } from "@/lib/notifications/telegram";

/**
 * GET /api/cron/renewal-reminders — emails each user whose subscriptions are renewing soon.
 * Args: none (triggered by Vercel Cron; requires "Authorization: Bearer <CRON_SECRET>" header).
 * Returns: 200 JSON { sent: number }, or 401 if the cron secret doesn't match.
 */
export async function GET(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscriptions = await prisma.subscription.findMany({
    include: { user: true },
  });

  const dueByUser = new Map<
  string,
  { email: string; name: string | null; telegramChatId: string | null; telegramEnabled: boolean; subs: typeof subscriptions }
>();


  for (const sub of subscriptions) {
    const status = getSubscriptionStatus(sub.renewalDate, sub.reminderDaysBefore);
    if (status !== "RENEWING_SOON" || !sub.user.email) continue;

    const existing = dueByUser.get(sub.userId) ?? {
      email: sub.user.email,
      name: sub.user.name,
      telegramChatId: sub.user.telegramChatId,
      telegramEnabled: sub.user.telegramEnabled,
      subs: [],
    };
    existing.subs.push(sub);
    dueByUser.set(sub.userId, existing);
  }

  let sent = 0;
  for (const { email, name, telegramChatId, telegramEnabled, subs } of dueByUser.values()) {
    const listHtml = subs
      .map(
        (s) =>
          `<li>${s.name} — ${s.price.toFixed(2)} ${s.currency}, renews ${s.renewalDate.toLocaleDateString()}</li>`
      )
      .join("");

    const { error } = await resend.emails.send({
      from: "Subscription Tracker <onboarding@resend.dev>",
      to: [email],
      subject: `${subs.length} subscription${subs.length === 1 ? "" : "s"} renewing soon`,
      html: `<p>Hi ${name ?? "there"},</p><p>These subscriptions are renewing soon:</p><ul>${listHtml}</ul>`,
    });

    if (!error) sent += 1;

    if (telegramChatId && telegramEnabled) {
        const listText = subs
          .map((s) => `- ${s.name}: ${s.price.toFixed(2)} ${s.currency}, renews ${s.renewalDate.toLocaleDateString()}`)
          .join("\n");
        await sendTelegramMessage(telegramChatId, `${subs.length} subscription(s) renewing soon:\n${listText}`);
      }

  }

  return NextResponse.json({ sent });
}
