'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
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

async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySession(cookie)) {
    throw new Error('Not authenticated');
  }
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

export interface UpdateRsvpInput {
  id: number;
  name: string;
  attending: boolean;
  guest_count: number;
  message: string | null;
}

export async function updateRsvpAction(
  input: UpdateRsvpInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();

  const name = input.name.trim();
  if (!name || name.length > 100) {
    return { ok: false, error: 'Name is required (max 100 chars)' };
  }
  const guestCount = Number.isInteger(input.guest_count)
    ? input.guest_count
    : 1;
  if (guestCount < 1 || guestCount > 3) {
    return { ok: false, error: 'Guest count must be between 1 and 3' };
  }
  const attending = Boolean(input.attending);
  const message = input.message?.trim() ? input.message.trim().slice(0, 1000) : null;
  const finalGuestCount = attending ? guestCount : 1;

  const sql = getSql();
  await sql`
    UPDATE rsvp
    SET name = ${name},
        attending = ${attending},
        guest_count = ${finalGuestCount},
        message = ${message}
    WHERE id = ${input.id}
  `;
  revalidatePath('/admin');
  return { ok: true };
}

export async function deleteRsvpAction(
  id: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: 'Invalid id' };
  }

  const sql = getSql();
  await sql`DELETE FROM rsvp WHERE id = ${id}`;
  revalidatePath('/admin');
  return { ok: true };
}
