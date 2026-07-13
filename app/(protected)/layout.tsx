import { auth } from "@/auth";
import Sidebar from "@/components/protected/Sidebar";
import Topbar from "@/components/protected/Topbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar name={session?.user?.name} email={session?.user?.email} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
