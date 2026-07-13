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

export default function UserMenu({ name, email }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">{name ?? email ?? "Account"}</Button>}
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
