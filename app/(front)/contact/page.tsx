'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, type ContactFormData } from '@/lib/validation/contact';
import { useSubmitContact } from './hooks/useSubmitContact';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const { mutate, isPending, isSuccess, isError, error } = useSubmitContact();

  function onSubmit(data: ContactFormData) {
    mutate(data, {
      onSuccess: () => reset(),
    });
  }

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register('name')}
            placeholder="Name"
            className="border rounded px-3 py-2 w-full"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('email')}
            placeholder="Email"
            className="border rounded px-3 py-2 w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('phone')}
            placeholder="Phone"
            className="border rounded px-3 py-2 w-full"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register('description')}
            placeholder="Description"
            rows={4}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>

        {isSuccess && <p className="text-green-600">Message sent!</p>}
        {isError && <p className="text-red-600">{(error as Error).message}</p>}
      </form>
    </section>
  );
}
