import { z } from "zod";

/**
 * InterviewQuestionEditSchema — validates editing an existing interview question's content.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const InterviewQuestionEditSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  codeSnippet: z.string().optional().or(z.literal("")),
});

export type InterviewQuestionEditData = z.infer<typeof InterviewQuestionEditSchema>;
