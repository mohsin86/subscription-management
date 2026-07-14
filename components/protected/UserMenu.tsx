"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/(protected)/actions";

type UserMenuProps = {
  name: string | null | undefined;
  email: string | null | undefined;
};

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  const source = name?.trim() || email || "?";
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export default function UserMenu({ name, email }: UserMenuProps) {
  const initials = getInitials(name, email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="flex items-center gap-2 rounded-full px-2 py-1 sm:rounded-md sm:px-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
              {initials}
            </span>
            <span className="hidden sm:inline">{name ?? email ?? "Account"}</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link href="/profile">Profile</Link>} />
        <DropdownMenuItem variant="destructive" onClick={() => logoutAction()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
