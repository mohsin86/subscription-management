import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PasswordForm from "./PasswordForm";

/**
 * ProfilePage — lets the user set/update their login password.
 * Args: none (server component; reads the session user's password state).
 * Returns: profile page JSX.
 */
export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Password</h2>
        <p className="mt-1 text-gray-500 text-sm">
          {user?.password
            ? "Update the password you use to sign in."
            : "You signed up with Google — set a password to also sign in with email and password."}
        </p>
        <div className="mt-3">
          <PasswordForm hasPassword={!!user?.password} />
        </div>
      </div>
    </section>
  );
}
