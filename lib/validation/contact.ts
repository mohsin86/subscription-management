import { z } from 'zod';

/**
 * ContactSchema — validates the contact form input.
 * Args: n/a (Zod schema). Returns: n/a — used via .safeParse() and z.infer.
 */
export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  description: z.string().min(1, 'Description is required'),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
