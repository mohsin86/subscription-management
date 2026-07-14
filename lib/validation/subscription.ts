import { z } from "zod";

export const SubscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  cycle: z.enum(["MONTHLY", "YEARLY"]),
  renewalDate: z.coerce.date(),
  autoRenew: z.boolean().default(true),
  notes: z.string().optional(),
});

export type SubscriptionFormData = z.infer<typeof SubscriptionSchema>;
