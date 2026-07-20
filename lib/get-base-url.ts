import { headers } from "next/headers";

/**
 * getBaseUrl — reconstructs the site's origin from the incoming request's
 * headers, for building absolute links (e.g. a verification email) from a
 * Server Action, which has no direct access to the request URL.
 * Args: none. Returns: origin string, e.g. "https://example.com".
 */
export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
