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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-turquoise-700 via-turquoise-800 to-turquoise-900 px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-turquoise-100">
        <p className="text-xs uppercase tracking-[0.3em] text-turquoise-700">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-light text-turquoise-900">Sign in</h1>

        <form action={loginAction} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-turquoise-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-2 w-full rounded-xl border border-turquoise-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
              Invalid password
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-turquoise-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-colors hover:bg-turquoise-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
