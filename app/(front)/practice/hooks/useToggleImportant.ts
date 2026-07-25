import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleQuestionImportant } from "../interviewQuestions.client";

/**
 * useToggleImportant — marks/unmarks a question as important and refreshes
 * its topic's list.
 * Args: topicId (string) — used to invalidate the right query key on success.
 * Returns: TanStack mutation; call with { id, isImportant }.
 */
export function useToggleImportant(topicId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isImportant }: { id: string; isImportant: boolean }) =>
      toggleQuestionImportant(id, isImportant),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-questions", topicId] });
    },
  });
}
