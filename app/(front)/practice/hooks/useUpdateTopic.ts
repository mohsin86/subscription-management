import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTopic, type InterviewTopicData } from "../interviewTopics.client";

/**
 * useUpdateTopic — updates a topic's title/slug and refreshes the topics list.
 * Returns: TanStack mutation; call with { id, data }.
 */
export function useUpdateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InterviewTopicData }) => updateTopic(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-topics"] });
    },
  });
}
