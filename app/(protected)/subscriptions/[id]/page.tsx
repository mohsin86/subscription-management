import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getSubscriptionStatus, STATUS_LABEL, STATUS_COLOR } from "@/lib/subscription-status";
import { buildGoogleCalendarUrl } from "@/lib/calendar-link";
import { formatBillingCycle } from "@/lib/billing-cycle";

/**
 * SubscriptionDetailPage — shows one subscription's full details.
 * Args: props.params — Promise<{ id: string }>, the subscription id from the URL.
 * Returns: detail view JSX, or triggers a 404 via notFound() if missing/not owned by the current user.
 */
export default async function SubscriptionDetailPage(
  props: PageProps<"/subscriptions/[id]">
) {
  const { id } = await props.params;

  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

    const subscription = await prisma.subscription.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!subscription) {
    notFound();
  }

  const status = getSubscriptionStatus(subscription.renewalDate, subscription.reminderDaysBefore);


  return (
    <section>
      <Link href="/subscriptions" className="text-sm text-gray-500">
        &larr; Back to subscriptions
      </Link>

      <h1 className="text-2xl font-bold mt-2">{subscription.name}</h1>

      <dl className="mt-4 grid gap-2 max-w-sm">
        <div className="flex justify-between border-b py-2">
          <dt className="text-gray-500">Status</dt>
          <dd className={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</dd>
        </div>
        <div className="flex justify-between border-b py-2">
          <dt className="text-gray-500">Category</dt>
          <dd>{subscription.category}</dd>
        </div>

        <div className="flex justify-between border-b py-2">
          <dt className="text-gray-500">Price</dt>
          <dd>
            {subscription.price.toFixed(2)} {subscription.currency}
          </dd>
        </div>
        <div className="flex justify-between border-b py-2">
          <dt className="text-gray-500">Billing cycle</dt>
          <dd>{formatBillingCycle(subscription.billingCycleMonths)}</dd>
        </div>
        <div className="flex justify-between border-b py-2">
          <dt className="text-gray-500">Renews</dt>
          <dd>{subscription.renewalDate.toLocaleDateString()}</dd>
        </div>
        <div className="flex justify-between border-b py-2">
          <dt className="text-gray-500">Auto-renew</dt>
          <dd>{subscription.autoRenew ? "Yes" : "No"}</dd>
        </div>
        {subscription.notes && (
          <div className="py-2">
            <dt className="text-gray-500">Notes</dt>
            <dd className="mt-1">{subscription.notes}</dd>
          </div>
        )}
      </dl>
            {subscription.vendorUrl && (
            <a
              href={subscription.vendorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 border px-4 py-2"
            >
              Manage on vendor site &rarr;
            </a>
          )}

          <a
            href={buildGoogleCalendarUrl(
              subscription.name,
              subscription.price.toFixed(2),
              subscription.currency,
              subscription.renewalDate
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 ml-2 border px-4 py-2"
          >
            Add to Google Calendar
          </a>


    </section>
  );
}
