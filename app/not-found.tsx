import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-turquoise-50 to-turquoise-100 px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-turquoise-700">404</p>
        <h1 className="mt-4 text-5xl font-light text-turquoise-900">
          Page not found
        </h1>
        <p className="mt-4 text-slate-600">
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-turquoise-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-colors hover:bg-turquoise-800"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
