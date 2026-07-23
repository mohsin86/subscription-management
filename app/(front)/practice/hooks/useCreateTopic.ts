import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopic } from "../interviewTopics.client";

/**
 * useCreateTopic — adds a new topic and refreshes the topics list.
 * Returns: TanStack mutation; call with { title, slug }.
 */
export function useCreateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-topics"] });
    },
  });
}
