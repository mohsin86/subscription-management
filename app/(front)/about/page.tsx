import type { Metadata } from "next";
import Image from "next/image";
import { profile, skills, experience, education, certifications } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: `About — ${profile.name}`,
  description: profile.tagline,
};

/**
 * AboutPage — portfolio About page (bio, skills, experience, education, certifications).
 * Args: none. Returns: static page JSX built from lib/data/profile.ts.
 */
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={112}
          height={112}
          className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-28 sm:w-28"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h1>
          {profile.about.map((paragraph, index) => (
            <p key={index} className={`text-zinc-600 dark:text-zinc-400 ${index === 0 ? "mt-4" : "mt-3"}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <h2 className="mt-12 text-xl font-bold">Skills</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="font-semibold">{group.category}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-zinc-300 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold">Experience</h2>
      <div className="mt-4 flex flex-col gap-8">
        {experience.map((job) => (
          <div key={`${job.company}-${job.period}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">
                {job.role} · {job.company}
                {job.location && <span className="text-zinc-500"> ({job.location})</span>}
              </h3>
              <span className="text-sm text-zinc-500">{job.period}</span>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold">Education</h2>
      <div className="mt-4">
        {education.map((item) => (
          <div key={item.school} className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="font-semibold">{item.degree}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.school}</p>
            </div>
            <span className="text-sm text-zinc-500">{item.period}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold">Certifications</h2>
      <ul className="mt-4 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
        {certifications.map((cert) => (
          <li key={cert}>{cert}</li>
        ))}
      </ul>
    </section>
  );
}
