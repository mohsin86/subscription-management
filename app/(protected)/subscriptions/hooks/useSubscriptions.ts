import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "../subscriptions.client";
/**
 * useSubscriptions — React Query hook that fetches the current user's subscriptions.
 * Args: none. Returns: useQuery result — { data: Subscription[], isPending, isError, error, ... }
 */
export function useSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });
}
