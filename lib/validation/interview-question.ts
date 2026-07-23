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

/**
 * InterviewQuestionCreateSchema — validates creating a new interview question.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const InterviewQuestionCreateSchema = InterviewQuestionEditSchema.extend({
  topicId: z.string().min(1, "Topic is required"),
});

export type InterviewQuestionCreateData = z.infer<typeof InterviewQuestionCreateSchema>;
