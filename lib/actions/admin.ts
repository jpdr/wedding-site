'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { timingSafeEqual } from 'crypto';

import { getSql } from '@/lib/db';
import {
  ADMIN_COOKIE_NAME,
  COOKIE_OPTIONS,
  signSession,
  verifySession,
} from '@/lib/auth';

export interface RsvpRow {
  id: number;
  name: string;
  attending: boolean;
  guest_count: number;
  message: string | null;
  created_at: string;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get('password') ?? '');
  const expected = process.env.ADMIN_PASSWORD ?? '';

  if (!expected || !safeEqual(password, expected)) {
    redirect('/admin/login?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, signSession(), COOKIE_OPTIONS);
  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/admin/login');
}

export async function getRsvps(): Promise<RsvpRow[]> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySession(cookie)) {
    return [];
  }

  const sql = getSql();
  const rows = await sql`
    SELECT id, name, attending, guest_count, message, created_at
    FROM rsvp
    ORDER BY created_at DESC
  `;
  return rows as unknown as RsvpRow[];
}
