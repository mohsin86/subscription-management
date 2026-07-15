import Link from "next/link";
import UserMenu from "./UserMenu";
import MobileSidebar from "./MobileSidebar";

type TopbarProps = {
  name: string | null | undefined;
  email: string | null | undefined;
};

/**
 * Topbar — top header bar for the protected app (mobile nav + brand + user menu).
 * Args: name, email (current session user's display info, both nullable). Returns: header JSX.
 */
export default function Topbar({ name, email }: TopbarProps) {
  return (
    <header className="relative flex items-center justify-between border-b px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Link href="/dashboard" className="font-bold">
          Subscription Tracker
        </Link>
      </div>
      <UserMenu name={name} email={email} />
    </header>
  );
}
