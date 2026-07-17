import type { SubscriptionFormData } from "@/lib/validation/subscription";

export type Subscription = {
  id: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  billingCycleMonths: number;
  renewalDate: string;
  autoRenew: boolean;
  reminderDaysBefore: number;
  vendorUrl: string | null;
  notes: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};



async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error ?? "Something went wrong.");
  }
  return json as T;
}

/**
 * fetchSubscriptions — gets the current user's subscriptions.
 * Args: none. Returns: Promise<Subscription[]>
 */
export async function fetchSubscriptions() {
  const res = await fetch("/api/subscriptions");
  return handleResponse<Subscription[]>(res);
}

/**
 * createSubscription — creates a new subscription.
 * Args: data (SubscriptionFormData). Returns: Promise<Subscription>
 */
export async function createSubscription(data: SubscriptionFormData) {
  const res = await fetch("/api/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Subscription>(res);
}

/**
 * updateSubscription — updates an existing subscription by id.
 * Args: id (string), data (SubscriptionFormData). Returns: Promise<Subscription>
 */
export async function updateSubscription(id: string, data: SubscriptionFormData) {
  const res = await fetch(`/api/subscriptions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Subscription>(res);
}

/**
 * deleteSubscription — deletes a subscription by id.
 * Args: id (string). Returns: Promise<{ success: true }>
 */
export async function deleteSubscription(id: string) {
  const res = await fetch(`/api/subscriptions/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: true }>(res);
}
