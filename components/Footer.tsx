export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-8 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
      © {new Date().getFullYear()} MyLogo. Built while learning Next.js.
    </footer>
  );
}
