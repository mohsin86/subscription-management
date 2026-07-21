import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInterviewQuestion, type InterviewQuestionEditData } from "../interviewQuestions.client";

/**
 * useUpdateInterviewQuestion — updates a question's content and refreshes its category's list.
 * Args: category (string) — used to invalidate the right query key on success.
 * Returns: TanStack mutation; call with { id, data }.
 */
export function useUpdateInterviewQuestion(category: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InterviewQuestionEditData }) =>
      updateInterviewQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-questions", category] });
    },
  });
}
