/**
 * INTERVIEW_PRACTICE_EMAIL — the only account allowed to see the
 * Interview Practice menu and its pages; everyone else gets a 404.
 */
export const INTERVIEW_PRACTICE_EMAIL = "devctg01@gmail.com";

/**
 * INTERVIEW_PRACTICE_TOPICS — maps each content/interview-practice/*.md file
 * to a slug (used in the route) and a display title (used in the menu/page heading).
 */
/**
 * unescapeMarkdown — undoes stray backslash-escapes (e.g. `\`code\`` , `1\.`)
 * left over from how these files were originally exported, so `marked` parses
 * backtick code spans and other markdown syntax as intended.
 * Args: markdown (string). Returns: markdown with those backslashes stripped.
 */
export function unescapeMarkdown(markdown: string): string {
  return markdown.replace(/\\([`.*_\[\]()#+!-])/g, "$1");
}

export const INTERVIEW_PRACTICE_TOPICS: { slug: string; title: string }[] = [
  { slug: "react", title: "React" },
  { slug: "nextjs", title: "Next.js" },
  { slug: "nodejs", title: "Node.js" },
  { slug: "express", title: "Express" },
  { slug: "mongodb", title: "MongoDB" },
  { slug: "postgresql", title: "PostgreSQL" },
  { slug: "nestjs", title: "NestJS" },
  { slug: "tailwind", title: "Tailwind CSS" },
  { slug: "wordpress", title: "WordPress" },
  { slug: "design-principles", title: "Design Principles" },
  { slug: "javascript", title: "JavaScript" },
  { slug: "typescript", title: "TypeScript" },
  { slug: "database-sql", title: "Database / SQL" },
  { slug: "system-design", title: "System Design" },
  { slug: "testing", title: "Jest, Vitest & React Testing Library" },
  { slug: "ai-fundamentals", title: "AI Fundamentals" },
  { slug: "restful-api", title: "RESTful API" },
  { slug: "laravel", title: "Laravel" },
];
