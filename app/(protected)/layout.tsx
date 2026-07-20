import { auth } from "@/auth";
import Sidebar from "@/components/protected/Sidebar";
import Topbar from "@/components/protected/Topbar";

/**
 * ProtectedLayout — shared layout for the logged-in subscription tracker route group.
 * Args: children (React.ReactNode). Returns: JSX wrapping children with Topbar + Sidebar.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar name={session?.user?.name} email={session?.user?.email} />
      <div className="flex flex-1">
        <Sidebar email={session?.user?.email} />
        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
