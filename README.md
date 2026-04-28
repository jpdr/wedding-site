# Wedding Site

A personal wedding RSVP site built with Next.js 15, Tailwind, and Neon Postgres.

## What this is

- Public landing page (hero, our story, details, RSVP form)
- Server-action backed RSVP submission persisted to Neon
- Password-protected `/admin` dashboard listing all RSVPs
- Single Next.js App Router project — no separate API server

## Local development

1. Copy the example env file and fill in your values:

   ```bash
   cp .env.local.example .env.local
   ```

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

### Required environment variables

| Var | What it is |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string (with `?sslmode=require`). |
| `ADMIN_PASSWORD` | Password for `/admin/login`. |
| `SESSION_SECRET` | 32+ char random hex used to sign the admin session cookie. Generate with `openssl rand -hex 32`. |

## Database setup (Neon)

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the pooled connection string from the dashboard and paste it as `DATABASE_URL` in `.env.local`.
3. Open the **SQL Editor** in Neon and run the contents of `db/schema.sql`. This creates the `rsvp` table and an index on `created_at`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New Project** → import the repository.
3. Add the three environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`) under **Project Settings → Environment Variables** for the Production environment.
4. Deploy. The build does not need any of the env vars set — the DB client and session secret lazy-init at request time.

## Filling in your wedding details

All copy lives in `lib/wedding-config.ts`. Edit:

- `coupleNames.partner1` / `partner2`
- `weddingDate` (ISO 8601 with timezone offset)
- `venue.name` / `venue.address`
- `schedule` items
- `dressCode`
- `story.headline` / `story.body`
- `rsvpDeadline`

## Admin dashboard

- Visit `/admin/login` and enter `ADMIN_PASSWORD`.
- Session lasts 7 days; sign out from the dashboard header.
- Direct GETs to `/admin` redirect to login if you don't have a valid session cookie.

## Tech stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- `@neondatabase/serverless` for Postgres
- `zod` for validation
- HMAC-signed session cookie (custom, no NextAuth)
- `next/font/google` — Cormorant Garamond (headings) + Inter (body)
