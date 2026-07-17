import { z } from "zod";

/**
 * SubscriptionSchema — validates subscription create/update input.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const SubscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  billingCycleMonths: z.coerce.number().int().min(1, "Billing cycle must be at least 1 month"),
  renewalDate: z.coerce.date(),
  autoRenew: z.boolean().default(true),
  reminderDaysBefore: z.coerce.number().int().min(0).default(7),
  vendorUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});


export type SubscriptionFormData = z.infer<typeof SubscriptionSchema>;
