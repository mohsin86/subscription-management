import { z } from "zod";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * InterviewTopicSchema — validates creating or editing an interview practice topic.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const InterviewTopicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(SLUG_PATTERN, "Slug must be lowercase letters, numbers, and hyphens only"),
});

export type InterviewTopicData = z.infer<typeof InterviewTopicSchema>;
