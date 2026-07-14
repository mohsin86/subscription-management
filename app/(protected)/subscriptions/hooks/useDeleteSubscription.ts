import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubscription } from "../subscriptions.client";

/**
 * useDeleteSubscription — React Query mutation hook to remove a subscription.
 * Args: none (call .mutate(id: string)). Returns: useMutation result.
 * Side effect: invalidates the ["subscriptions"] query on success so the list refetches.
 */
export function useDeleteSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
