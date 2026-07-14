import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { getSubscriptionStatus, STATUS_LABEL, STATUS_COLOR } from "@/lib/subscription-status";

/**
 * DashboardPage — shows spend totals (grouped by currency) and the active subscriptions list.
 * Args: none (server component; reads the session user, queries their subscriptions from the DB).
 * Returns: dashboard summary JSX.
 */
export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id },
  });

  const totalsByCurrency = new Map<
    string,
    { monthly: Prisma.Decimal; yearly: Prisma.Decimal }
  >();

  for (const sub of subscriptions) {
    const monthly = sub.cycle === "MONTHLY" ? sub.price : sub.price.dividedBy(12);
    const yearly = sub.cycle === "YEARLY" ? sub.price : sub.price.times(12);

    const existing =
      totalsByCurrency.get(sub.currency) ?? {
        monthly: new Prisma.Decimal(0),
        yearly: new Prisma.Decimal(0),
      };

    totalsByCurrency.set(sub.currency, {
      monthly: existing.monthly.plus(monthly),
      yearly: existing.yearly.plus(yearly),
    });
  }

  const totals = Array.from(totalsByCurrency.entries()).map(
    ([currency, { monthly, yearly }]) => ({
      currency,
      monthly: monthly.toFixed(2),
      yearly: yearly.toFixed(2),
    })
  );

  return (
    <section>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {subscriptions.length === 0 && (
        <p className="text-gray-500 mt-2">No subscriptions yet.</p>
      )}

      {totals.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {totals.map(({ currency, monthly, yearly }) => (
            <div key={currency} className="border p-4">
              <h2 className="font-semibold">{currency}</h2>
              <p className="text-gray-500 mt-1">Monthly: {monthly}</p>
              <p className="text-gray-500">Yearly: {yearly}</p>
            </div>
          ))}
        </div>
      )}

      {subscriptions.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Active subscriptions</h2>
          <ul className="border divide-y">
            {subscriptions.map((sub) => {
              const status = getSubscriptionStatus(sub.renewalDate);

              return (
                <li key={sub.id}>
                  <Link
                    href={`/subscriptions/${sub.id}`}
                    className="flex justify-between px-4 py-2"
                  >
                    <span>{sub.name}</span>
                    <span className="flex gap-3">
                      <span className={STATUS_COLOR[status]}>
                        {STATUS_LABEL[status]}
                      </span>
                      <span className="text-gray-500">
                        {sub.price.toFixed(2)} {sub.currency}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}



      <p className="text-gray-500 mt-4">
        {subscriptions.length} active subscription
        {subscriptions.length === 1 ? "" : "s"}
      </p>
    </section>
  );
}
