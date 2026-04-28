import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AdminLogout from '@/components/AdminLogout';
import AdminTable from '@/components/AdminTable';
import { ADMIN_COOKIE_NAME, verifySession } from '@/lib/auth';
import { getRsvps } from '@/lib/actions/admin';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySession(cookie)) {
    redirect('/admin/login');
  }

  const rows = await getRsvps();

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 to-white px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl font-light text-emerald-900">
              RSVP Dashboard
            </h1>
          </div>
          <AdminLogout />
        </header>

        <div className="mt-10">
          <AdminTable rows={rows} />
        </div>
      </div>
    </main>
  );
}
