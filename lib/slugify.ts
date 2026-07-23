/**
 * slugify — turns a display title into a URL-safe, lowercase, hyphenated
 * slug (e.g. "Node.js & Express!" -> "nodejs-express").
 * Args: title (string). Returns: slug (string).
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
