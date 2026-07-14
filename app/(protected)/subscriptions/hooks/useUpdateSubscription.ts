import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubscription } from "../subscriptions.client";
import type { SubscriptionFormData } from "@/lib/validation/subscription";

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
