import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r p-4">
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/subscriptions">Subscriptions</Link>
      </nav>
    </aside>
  );
}
