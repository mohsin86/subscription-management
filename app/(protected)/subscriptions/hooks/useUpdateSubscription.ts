import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubscription } from "../subscriptions.client";
import type { SubscriptionFormData } from "@/lib/validation/subscription";

/**
 * useUpdateSubscription — React Query mutation hook to edit a subscription.
 * Args: none (call .mutate({ id: string, data: SubscriptionFormData })). Returns: useMutation result.
 * Side effect: invalidates the ["subscriptions"] query on success so the list refetches.
 */
export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubscriptionFormData }) =>
      updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
