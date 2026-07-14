import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { profile } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
      <Image
        src={profile.photo}
        alt={profile.name}
        width={144}
        height={144}
        priority
        className="h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36"
      />

      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
        {profile.title}
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
        Hi, I&apos;m {profile.name}
      </h1>
      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/projects"
          className="border border-zinc-900 bg-zinc-900 px-5 py-2 font-medium text-white hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          View Projects
        </Link>
        <Link href="/cv" className="border border-zinc-300 px-5 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
          View CV
        </Link>
        <Link href="/contact" className="border border-zinc-300 px-5 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
          Contact Me
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`} className="hover:text-zinc-900 dark:hover:text-zinc-100">
          {profile.email}
        </a>
      </div>
    </section>
  );
}
