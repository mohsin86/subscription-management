import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInterviewQuestion } from "../interviewQuestions.client";

/**
 * useDeleteInterviewQuestion — deletes a question and refreshes its category's list.
 * Args: category (string) — used to invalidate the right query key on success.
 * Returns: TanStack mutation; call with the question id.
 */
export function useDeleteInterviewQuestion(category: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInterviewQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-questions", category] });
    },
  });
}
