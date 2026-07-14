import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscription } from "../subscriptions.client";

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
