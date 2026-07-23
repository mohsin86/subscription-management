import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInterviewQuestion, type InterviewQuestionEditData } from "../interviewQuestions.client";

/**
 * useUpdateInterviewQuestion — updates a question's content and refreshes its topic's list.
 * Args: topicId (string) — used to invalidate the right query key on success.
 * Returns: TanStack mutation; call with { id, data }.
 */
export function useUpdateInterviewQuestion(topicId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InterviewQuestionEditData }) =>
      updateInterviewQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-questions", topicId] });
    },
  });
}
