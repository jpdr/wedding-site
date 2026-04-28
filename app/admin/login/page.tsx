import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ADMIN_COOKIE_NAME, verifySession } from '@/lib/auth';
import { loginAction } from '@/lib/actions/admin';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (verifySession(cookie)) {
    redirect('/admin');
  }

  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-100 via-emerald-100 to-emerald-200 px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-emerald-100">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light text-emerald-900">
          Sign in
        </h1>

        <form action={loginAction} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-teal-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
              Invalid password
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
