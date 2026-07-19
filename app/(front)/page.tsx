import type { Metadata } from "next";
import { profile, skills, experience, education, certifications, cvDownloadUrl } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

/**
 * HomePage — portfolio landing page: CV content only (name, skills, experience, education, certifications).
 * Args: none. Returns: static page JSX built from lib/data/profile.ts.
 */
export default function HomePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
          <p className="text-zinc-500">{profile.title}</p>
        </div>
        <a
          href={cvDownloadUrl}
          download
          className="shrink-0 border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Download CV
        </a>
      </div>

      <p className="mt-2 text-sm text-zinc-500">
        <a
          href="https://maps.app.goo.gl/4HiFWMwtPKQS3GaB7"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {profile.location}
        </a>{" "}
        ·{" "}
        <a href={`mailto:${profile.email}`} className="hover:text-zinc-900 dark:hover:text-zinc-100">
          {profile.email}
        </a>{" "}
        ·{" "}
        <a
          href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {profile.phone}
        </a>
      </p>

      {profile.about.map((paragraph, index) => (
        <p key={index} className={`text-zinc-600 dark:text-zinc-400 ${index === 0 ? "mt-6" : "mt-3"}`}>
          {paragraph}
        </p>
      ))}

      <h2 className="mt-10 text-lg font-bold">Core Skills</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold">{group.category}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{group.items.join(" · ")}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold">Professional Experience</h2>
      <div className="mt-3 flex flex-col gap-6">
        {experience.map((job) => (
          <div key={`${job.company}-${job.period}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold">
                {job.role} · {job.company}
                {job.type && ` · ${job.type}`}
                {job.location && <span className="text-zinc-500"> ({job.location})</span>}
              </h3>
              <span className="text-xs text-zinc-500">{job.period}</span>
            </div>
            <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold">Education</h2>
      {education.map((item) => (
        <div key={item.school} className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{item.degree}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.school}</p>
          </div>
          <span className="text-xs text-zinc-500">{item.period}</span>
        </div>
      ))}

      <h2 className="mt-10 text-lg font-bold">Certifications</h2>
      <ul className="mt-3 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
        {certifications.map((cert) => (
          <li key={cert}>{cert}</li>
        ))}
      </ul>
    </section>
  );
}
