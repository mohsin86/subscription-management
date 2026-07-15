import { handlers } from "@/auth";

/**
 * GET, POST /api/auth/[...nextauth] — Auth.js's own route handlers, re-exported.
 * Args/Returns: see next-auth — handles all sign-in/callback/session requests.
 */
export const { GET, POST } = handlers;