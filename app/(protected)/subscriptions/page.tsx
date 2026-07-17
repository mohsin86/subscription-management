"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSubscriptions } from "./hooks/useSubscriptions";
import { useDeleteSubscription } from "./hooks/useDeleteSubscription";
import SubscriptionForm from "./SubscriptionForm";
import type { Subscription } from "./subscriptions.client";
import { getSubscriptionStatus, STATUS_LABEL, STATUS_COLOR } from "@/lib/subscription-status";
import Link from "next/link";
import { buildGoogleCalendarUrl } from "@/lib/calendar-link";
import { DEMO_EMAIL } from "@/lib/demo-account";
import { formatBillingCycle } from "@/lib/billing-cycle";



/**
 * SubscriptionsPage — lists the logged-in user's subscriptions in a table.
 * Args: none (client component; reads data via useSubscriptions()).
 * Returns: table UI with inline add/edit form and delete buttons.
 */
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function SubscriptionsPage() {
  const { data: session } = useSession();
  const isDemoAccount = session?.user?.email === DEMO_EMAIL;

  const { data: subscriptions, isPending, isError, error } = useSubscriptions();
  const { mutate: deleteSubscription, isPending: isDeleting } = useDeleteSubscription();


  const [formTarget, setFormTarget] = useState<Subscription | "new" | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  function closeForm() {
    setFormTarget(null);
  }

  const filtered = (subscriptions ?? []).filter((subscription) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      subscription.name.toLowerCase().includes(query) ||
      subscription.category.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handlePageSizeChange(value: number) {
    setPageSize(Math.min(value, MAX_PAGE_SIZE));
    setPage(1);
  }

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <button
          type="button"
          onClick={() => setFormTarget("new")}
          className="border px-4 py-2 w-full sm:w-auto"
        >
          Add subscription
        </button>
      </div>

      {formTarget && (
        <div className="mb-6 border p-4">
          <SubscriptionForm
            subscription={formTarget === "new" ? undefined : formTarget}
            onSuccess={closeForm}
            onCancel={closeForm}
          />
        </div>
      )}

      {isPending && <p className="text-gray-500">Loading...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}

      {subscriptions && subscriptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name or category..."
            className="border px-2 py-1 w-full max-w-sm"
          />

          <label className="flex items-center gap-2 text-sm text-gray-500">
            Per page
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border px-2 py-1"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {subscriptions && subscriptions.length === 0 && (
        <p className="text-gray-500">No subscriptions yet.</p>
      )}

      {subscriptions && subscriptions.length > 0 && filtered.length === 0 && (
        <p className="text-gray-500">No subscriptions match "{search}".</p>
      )}

      {subscriptions && filtered.length > 0 && (
        <div>
          {/* Mobile: stacked cards */}
          <div className="sm:hidden flex flex-col gap-3">
            {paginated.map((subscription) => {
              const status = getSubscriptionStatus(subscription.renewalDate, subscription.reminderDaysBefore);

              return (
                <div key={subscription.id} className="border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/subscriptions/${subscription.id}`} className="font-medium underline">
                      {subscription.name}
                    </Link>
                    <span className={`text-sm shrink-0 ${STATUS_COLOR[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{subscription.category}</p>

                  <dl className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
                    <dt className="text-gray-500">Price</dt>
                    <dd>{subscription.price} {subscription.currency}</dd>
                    <dt className="text-gray-500">Cycle</dt>
                    <dd>{formatBillingCycle(subscription.billingCycleMonths)}</dd>
                    <dt className="text-gray-500">Renews</dt>
                    <dd>{new Date(subscription.renewalDate).toLocaleDateString()}</dd>
                    <dt className="text-gray-500">Auto-renew</dt>
                    <dd>{subscription.autoRenew ? "Yes" : "No"}</dd>
                  </dl>

                  {subscription.vendorUrl && (
                    <a
                      href={subscription.vendorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm mt-2 inline-block"
                    >
                      Visit vendor &rarr;
                    </a>
                  )}

                  <div className="flex gap-2 mt-3">
                    <button type="button" onClick={() => setFormTarget(subscription)} className="border px-2 py-1 flex-1">
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting || isDemoAccount}
                      title={isDemoAccount ? "Delete is disabled for the demo account" : undefined}
                      onClick={() => deleteSubscription(subscription.id)}
                      className="border px-2 py-1 flex-1 disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                  <a
                    href={buildGoogleCalendarUrl(
                      subscription.name,
                      subscription.price,
                      subscription.currency,
                      new Date(subscription.renewalDate)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border px-2 py-1 mt-2 block text-center"
                  >
                    + Calendar
                  </a>
                </div>
              );
            })}
          </div>

          {/* Desktop/tablet: table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-160 text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Cycle</th>
                  <th className="py-2">Renews</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Auto-renew</th>
                  <th className="py-2">Vendor</th>
                  <th className="py-2"></th>
                </tr>

              </thead>
              <tbody>
                {paginated.map((subscription) => {
                  const status = getSubscriptionStatus(subscription.renewalDate, subscription.reminderDaysBefore);

                  return (
                    <tr key={subscription.id} className="border-b">
                      <td className="py-2">
                      <Link href={`/subscriptions/${subscription.id}`} className="underline">
                        {subscription.name}
                      </Link>
                    </td>
                      <td className="py-2">{subscription.category}</td>
                      <td className="py-2">
                        {subscription.price} {subscription.currency}
                      </td>
                      <td className="py-2">{formatBillingCycle(subscription.billingCycleMonths)}</td>
                      <td className="py-2">
                        {new Date(subscription.renewalDate).toLocaleDateString()}
                      </td>
                      <td className={`py-2 ${STATUS_COLOR[status]}`}>
                        {STATUS_LABEL[status]}
                      </td>
                      <td className="py-2">{subscription.autoRenew ? "Yes" : "No"}</td>
                        <td className="py-2">
                          {subscription.vendorUrl ? (
                            <a
                              href={subscription.vendorUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              Visit &rarr;
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                      <td className="py-2">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setFormTarget(subscription)} className="border px-2 py-1">
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting || isDemoAccount}
                            title={isDemoAccount ? "Delete is disabled for the demo account" : undefined}
                            onClick={() => deleteSubscription(subscription.id)}
                            className="border px-2 py-1 disabled:opacity-40"
                          >
                            Delete
                          </button>
                          <a
                            href={buildGoogleCalendarUrl(
                              subscription.name,
                              subscription.price,
                              subscription.currency,
                              new Date(subscription.renewalDate)
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border px-2 py-1"
                          >
                            + Calendar
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="border px-3 py-1 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="border px-3 py-1 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
