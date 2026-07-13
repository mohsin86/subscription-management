export default function AboutPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        About this project
      </h1>
      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
        This is a small Next.js App Router project built to practice for an
        interview — covering routing, Server Components, authentication, and
        a Prisma-backed todo list.
      </p>
    </section>
  );
}
