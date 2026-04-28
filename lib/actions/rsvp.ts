'use server';

import { getSql } from '@/lib/db';
import { rsvpSchema } from '@/lib/rsvp-schema';

export async function submitRsvpAction(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const raw = {
    name: formData.get('name'),
    attending: formData.get('attending'),
    guest_count: formData.get('guest_count') ?? 1,
    message: formData.get('message') ?? '',
  };

  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: first?.message ?? 'Invalid submission' };
  }

  const { name, attending, message } = parsed.data;
  const guestCount = attending === 'no' ? 1 : parsed.data.guest_count;
  const isAttending = attending === 'yes';
  const messageText = message && message.length > 0 ? message : null;

  try {
    const sql = getSql();
    await sql`
      INSERT INTO rsvp (name, attending, guest_count, message)
      VALUES (${name}, ${isAttending}, ${guestCount}, ${messageText})
    `;
    return { ok: true };
  } catch (err) {
    console.error('submitRsvpAction failed', err);
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }
}
