import { useQuery } from "@tanstack/react-query";
import { fetchInterviewQuestions } from "../interviewQuestions.client";

/**
 * useInterviewQuestions — fetches all questions for a topic.
 * Args: topicId (string). Returns: TanStack Query result for InterviewQuestion[].
 */
export function useInterviewQuestions(topicId: string) {
  return useQuery({
    queryKey: ["interview-questions", topicId],
    queryFn: () => fetchInterviewQuestions(topicId),
  });
}
