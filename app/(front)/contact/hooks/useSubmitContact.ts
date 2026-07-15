import { useMutation } from '@tanstack/react-query';
import { submitContactForm } from '../contact.client';

/**
 * useSubmitContact — React Query mutation hook to submit the contact form.
 * Args: none (call .mutate(data: ContactFormData)). Returns: useMutation result.
 */
export function useSubmitContact() {
  return useMutation({
    mutationFn: submitContactForm,
  });
}
