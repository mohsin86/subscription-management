import { useQuery } from "@tanstack/react-query";
import { fetchInterviewTopics } from "../interviewTopics.client";

/**
 * useInterviewTopics — fetches all interview practice topics.
 * Returns: TanStack Query result for Topic[].
 */
export function useInterviewTopics() {
  return useQuery({
    queryKey: ["interview-topics"],
    queryFn: fetchInterviewTopics,
  });
}
