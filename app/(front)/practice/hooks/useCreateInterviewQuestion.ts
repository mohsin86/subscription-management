import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInterviewQuestion, type InterviewQuestionCreateData } from "../interviewQuestions.client";

/**
 * useCreateInterviewQuestion — adds a new question and refreshes the list for
 * whichever topic it was created under (read from the response, not a
 * closed-over argument, since the form lets you pick any topic).
 * Returns: TanStack mutation; call with InterviewQuestionCreateData.
 */
export function useCreateInterviewQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InterviewQuestionCreateData) => createInterviewQuestion(data),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["interview-questions", created.topicId] });
    },
  });
}
