import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'wedding_admin';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) {
    throw new Error('SESSION_SECRET not set');
  }
  return s;
}

export function signSession(): string {
  const ts = Date.now().toString();
  const hmac = createHmac('sha256', secret()).update(ts).digest('hex');
  return `${ts}.${hmac}`;
}

export function verifySession(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  const [ts, sig] = value.split('.');
  if (!ts || !sig) {
    return false;
  }
  const expected = createHmac('sha256', secret()).update(ts).digest('hex');
  const a = Buffer.from(sig, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) {
    return false;
  }
  if (!timingSafeEqual(a, b)) {
    return false;
  }
  const age = Date.now() - parseInt(ts, 10);
  return age >= 0 && age <= MAX_AGE_MS;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
};
