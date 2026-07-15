import type { Metadata } from "next";
import Link from "next/link";
import { profile, personalProjects, clientProjects } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description: "Personal projects and selected client work.",
};

/**
 * ProjectsPage — portfolio Projects page (personal + client work).
 * Args: none. Returns: static page JSX built from lib/data/profile.ts.
 */
export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>

      <h2 className="mt-12 text-xl font-bold">Personal Projects</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {personalProjects.map((project) => (
          <div key={project.name} className="flex flex-col border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
            {project.tech.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className="border border-zinc-300 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex gap-4 text-sm">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-zinc-500"
                >
                  Live demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-zinc-500"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold">Selected Client Work</h2>
      <p className="mt-2 text-sm text-zinc-500">
        A selection from 10+ years leading client delivery at SEBPO. More available on request.
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {clientProjects.filter((project) => !project.hidden).map((project) => (
          <div key={project.name} className="flex flex-col border border-zinc-200 p-5 dark:border-zinc-800">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold">{project.name}</h3>
              <span className="text-xs text-zinc-500">{project.category}</span>
            </div>
            <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{project.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="border border-zinc-300 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {item}
                </li>
              ))}
            </ul>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-medium underline hover:text-zinc-500"
              >
                Visit site
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 border border-zinc-200 p-8 text-center dark:border-zinc-800">
        <h2 className="text-lg font-bold">Want to see more?</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          I&apos;ve got more projects I don&apos;t showcase publicly — ping me and I&apos;ll walk you through them.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full border border-zinc-900 bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Ping me
        </Link>
      </div>
    </section>
  );
}
