import { useQuery } from "@tanstack/react-query";
import { fetchInterviewQuestions } from "../interviewQuestions.client";

/**
 * useInterviewQuestions — fetches all questions for a category.
 * Args: category (string). Returns: TanStack Query result for InterviewQuestion[].
 */
export function useInterviewQuestions(category: string) {
  return useQuery({
    queryKey: ["interview-questions", category],
    queryFn: () => fetchInterviewQuestions(category),
  });
}
