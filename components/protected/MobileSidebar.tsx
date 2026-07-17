"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, BookOpen, Settings, GraduationCap } from "lucide-react";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/docs", label: "Documentation", icon: BookOpen },
];

/**
 * MobileSidebar — collapsible nav menu for the protected app on small screens.
 * Args: email (string | null | undefined) — signed-in user's email, from the server session, used to gate the Interview Practice link.
 * Returns: toggle button + dropdown nav JSX.
 */
export default function MobileSidebar({ email }: { email?: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const showInterviewPractice = email === INTERVIEW_PRACTICE_EMAIL;

  const visibleLinks = showInterviewPractice
    ? [...links, { href: "/interview-practice", label: "Interview Practice", icon: GraduationCap }]
    : links;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border"
      >
        <span className={`h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-10 border-b bg-white p-4 shadow-md dark:bg-zinc-950">
          <nav className="flex flex-col gap-1">
            {visibleLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
