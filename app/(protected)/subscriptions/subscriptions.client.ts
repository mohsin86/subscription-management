import type { SubscriptionFormData } from "@/lib/validation/subscription";

export type Subscription = {
  id: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  cycle: "MONTHLY" | "YEARLY";
  renewalDate: string;
  autoRenew: boolean;
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

export async function fetchSubscriptions() {
  const res = await fetch("/api/subscriptions");
  return handleResponse<Subscription[]>(res);
}

export async function createSubscription(data: SubscriptionFormData) {
  const res = await fetch("/api/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Subscription>(res);
}

export async function updateSubscription(id: string, data: SubscriptionFormData) {
  const res = await fetch(`/api/subscriptions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Subscription>(res);
}

export async function deleteSubscription(id: string) {
  const res = await fetch(`/api/subscriptions/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: true }>(res);
}
