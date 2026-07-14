import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  description: z.string().min(1, 'Description is required'),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
