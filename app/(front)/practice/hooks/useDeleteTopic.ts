import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTopic } from "../interviewTopics.client";

/**
 * useDeleteTopic — deletes a topic (and its questions, via cascade) and
 * refreshes the topics list.
 * Returns: TanStack mutation; call with the topic id.
 */
export function useDeleteTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-topics"] });
    },
  });
}
