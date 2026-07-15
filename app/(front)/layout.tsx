import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/**
 * FrontLayout — shared layout for the public portfolio route group.
 * Args: children (React.ReactNode). Returns: JSX wrapping children with Navbar + Footer.
 */
export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
