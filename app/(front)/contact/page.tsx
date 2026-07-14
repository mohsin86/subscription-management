'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, type ContactFormData } from '@/lib/validation/contact';
import { useSubmitContact } from './hooks/useSubmitContact';
import { profile } from '@/lib/data/profile';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const { mutate, isPending, isSuccess, isError, error, reset: resetMutation } = useSubmitContact();

  function onSubmit(data: ContactFormData) {
    mutate(data, {
      onSuccess: () => resetForm(),
    });
  }

  function sendAnother() {
    resetMutation();
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s Talk</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Hiring, freelancing, or just have a project in mind? Send a message and I&apos;ll get back to you —
          usually within a day.
        </p>

        <div className="mt-8 flex flex-col gap-3 text-sm">
          <a href={`mailto:${profile.email}`} className="font-medium hover:text-zinc-500">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-zinc-500">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-zinc-500">
            GitHub
          </a>
          <p className="text-zinc-500">{profile.location}</p>
        </div>
      </div>

      <div>
        {isSuccess ? (
          <div className="flex flex-col items-start gap-4 border border-zinc-200 p-8 dark:border-zinc-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-900/40">
              ✓
            </div>
            <h2 className="text-xl font-bold">Message sent!</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Thanks for reaching out — I&apos;ve received your message and will reply to you at your email
              within a day or two. Looking forward to talking.
            </p>
            <button
              type="button"
              onClick={sendAnother}
              className="mt-2 border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                {...register('name')}
                placeholder="Your name"
                className="mt-1 w-full border border-zinc-300 px-4 py-3 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-transparent dark:focus:border-zinc-100"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                {...register('email')}
                placeholder="you@company.com"
                className="mt-1 w-full border border-zinc-300 px-4 py-3 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-transparent dark:focus:border-zinc-100"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                {...register('phone')}
                placeholder="+1 234 567 890"
                className="mt-1 w-full border border-zinc-300 px-4 py-3 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-transparent dark:focus:border-zinc-100"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="description"
                {...register('description')}
                placeholder="Tell me about the role or project..."
                rows={6}
                className="mt-1 w-full border border-zinc-300 px-4 py-3 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-transparent dark:focus:border-zinc-100"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="border border-zinc-900 bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {isPending ? 'Sending...' : 'Send Message'}
            </button>

            {isError && <p className="text-sm text-red-600">{(error as Error).message}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
