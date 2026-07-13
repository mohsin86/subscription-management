import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-8 py-4 dark:border-zinc-800">
      <Link href="/" className="text-xl font-bold">
        MyLogo
      </Link>
      <ul className="flex list-none gap-6">
        <li><Link href="/" className="font-medium hover:text-zinc-500">Home</Link></li>
        <li><Link href="/about" className="font-medium hover:text-zinc-500">About</Link></li>
        <li><Link href="/contact" className="font-medium hover:text-zinc-500">Contact</Link></li>
      </ul>
    </nav>
  );
}
