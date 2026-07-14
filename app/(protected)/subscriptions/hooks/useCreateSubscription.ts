import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscription } from "../subscriptions.client";

/**
 * useCreateSubscription — React Query mutation hook to add a subscription.
 * Args: none (call .mutate(data: SubscriptionFormData)). Returns: useMutation result — { mutate, isPending, ... }
 * Side effect: invalidates the ["subscriptions"] query on success so the list refetches.
 */
export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
