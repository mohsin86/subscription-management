import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "@/app/(protected)/subscriptions/subscriptions.client";

export function useSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });
}
