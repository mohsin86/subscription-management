import { profile } from "@/lib/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-8 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-center gap-4">
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
      <p className="mt-3">© {new Date().getFullYear()} {profile.name}.</p>
    </footer>
  );
}
