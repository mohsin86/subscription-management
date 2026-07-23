/**
 * INTERVIEW_PRACTICE_EMAIL — the only account allowed to see the
 * Interview Practice menu and its pages; everyone else gets a 404.
 */
export const INTERVIEW_PRACTICE_EMAIL = "devctg01@gmail.com";

/**
 * unescapeMarkdown — undoes stray backslash-escapes (e.g. `\`code\`` , `1\.`)
 * left over from how these files were originally exported, so `marked` parses
 * backtick code spans and other markdown syntax as intended.
 * Args: markdown (string). Returns: markdown with those backslashes stripped.
 */
export function unescapeMarkdown(markdown: string): string {
  return markdown.replace(/\\([`.*_\[\]()#+!-])/g, "$1");
}
