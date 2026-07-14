import type { ContactFormData } from '@/lib/validation/contact';

export async function submitContactForm(data: ContactFormData) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error ?? 'Something went wrong.');
  }

  return json as { success: true };
}
