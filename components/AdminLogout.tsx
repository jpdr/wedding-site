import { logoutAction } from '@/lib/actions/admin';

export default function AdminLogout() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full border border-turquoise-200 bg-white px-4 py-2 text-sm font-medium text-turquoise-800 shadow-sm transition-colors hover:bg-turquoise-50"
      >
        Sign out
      </button>
    </form>
  );
}
