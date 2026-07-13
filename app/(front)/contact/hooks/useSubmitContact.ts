import { useMutation } from '@tanstack/react-query';
import { submitContactForm } from '../contact.client';

export function useSubmitContact() {
  return useMutation({
    mutationFn: submitContactForm,
  });
}
