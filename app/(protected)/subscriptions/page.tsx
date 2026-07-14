"use client";

import { useState } from "react";
import { useSubscriptions } from "./hooks/useSubscriptions";
import { useDeleteSubscription } from "./hooks/useDeleteSubscription";
import SubscriptionForm from "./SubscriptionForm";
import type { Subscription } from "./subscriptions.client";

export default function SubscriptionsPage() {
  const { data: subscriptions, isPending, isError, error } = useSubscriptions();
  const { mutate: deleteSubscription, isPending: isDeleting } = useDeleteSubscription();

  const [formTarget, setFormTarget] = useState<Subscription | "new" | null>(null);

  function closeForm() {
    setFormTarget(null);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <button
          type="button"
          onClick={() => setFormTarget("new")}
          className="border px-4 py-2"
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

      {subscriptions && subscriptions.length === 0 && (
        <p className="text-gray-500">No subscriptions yet.</p>
      )}

      {subscriptions && subscriptions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Category</th>
                <th className="py-2">Price</th>
                <th className="py-2">Cycle</th>
                <th className="py-2">Renews</th>
                <th className="py-2">Auto-renew</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b">
                  <td className="py-2">{subscription.name}</td>
                  <td className="py-2">{subscription.category}</td>
                  <td className="py-2">
                    {subscription.price} {subscription.currency}
                  </td>
                  <td className="py-2">{subscription.cycle}</td>
                  <td className="py-2">
                    {new Date(subscription.renewalDate).toLocaleDateString()}
                  </td>
                  <td className="py-2">{subscription.autoRenew ? "Yes" : "No"}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormTarget(subscription)}
                        className="border px-2 py-1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => deleteSubscription(subscription.id)}
                        className="border px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
