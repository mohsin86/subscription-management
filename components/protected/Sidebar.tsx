"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, CreditCard, BookOpen, Settings, User, GraduationCap } from "lucide-react";
import { INTERVIEW_PRACTICE_EMAIL } from "@/lib/interview-practice";


const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/docs", label: "Documentation", icon: BookOpen },

];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const showInterviewPractice = session?.user?.email === INTERVIEW_PRACTICE_EMAIL;

  const visibleLinks = showInterviewPractice
    ? [...links, { href: "/interview-practice", label: "Interview Practice", icon: GraduationCap }]
    : links;

  return (
    <aside className="hidden w-60 shrink-0 border-r p-4 md:block">
      <nav className="flex flex-col gap-1">
        {visibleLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
    </aside>
  );
}
