import Link from 'next/link';
import { weddingConfig } from '@/lib/wedding-config';

export default function NavBar() {
  const { partner1, partner2 } = weddingConfig.coupleNames;
  const initials = `${partner1.charAt(0)} & ${partner2.charAt(0)}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-turquoise-900"
        >
          {initials}
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <li>
            <a
              href="#details"
              className="transition-colors hover:text-turquoise-700"
            >
              Details
            </a>
          </li>
          <li>
            <a
              href="#rsvp"
              className="rounded-full bg-turquoise-700 px-4 py-2 text-white shadow-sm transition-opacity hover:opacity-90"
            >
              RSVP
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
