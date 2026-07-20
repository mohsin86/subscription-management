/**
 * CheckEmailPage — shown right after signup; tells the user a confirmation
 * link was emailed and the account can't log in until it's clicked.
 * Args: searchParams.email (string, optional) — the address it was sent to.
 * Returns: static confirmation message JSX.
 */
export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <section className="mx-auto max-w-sm px-6 py-16 text-center">
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        We&apos;ve sent a confirmation link{email ? ` to ${email}` : ""}. Click it to activate your
        account before signing in.
      </p>
    </section>
  );
}
