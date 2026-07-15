"use server";

import { signOut } from "@/auth";

/**
 * logoutAction — signs the current user out.
 * Args: none. Returns: void — redirects to "/" via signOut().
 */
export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
