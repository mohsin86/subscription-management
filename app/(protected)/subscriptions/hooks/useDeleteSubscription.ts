import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubscription } from "@/app/(protected)/subscriptions/subscriptions.client";

export function useDeleteSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
