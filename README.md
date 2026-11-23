# Marlene Service Hub

Premium multi-service hub for Kigali and across Rwanda — car wash, laundry & dry cleaning,
house cleaning, restaurant cleaning, tourism & transport, and hair salon services.

This is the revived version of the original static site, rebuilt with **Next.js 16 (App Router)**,
**TypeScript**, SQLite for local bookings, and **Neon Postgres** for Vercel bookings. It is
designed to deploy on **Vercel**.

## What changed from the old site

- Old static HTML/CSS/JS/PHP files are archived in `legacy/` (nothing deleted).
- One consistent gold-on-navy design system replaces the fractured mix of blue/green/gold styles
  and fixes the missing `contact-page-background.png` reference.
- Photos now live in `public/assets` and are served through `next/image`.
- Bookings are stored in Neon Postgres instead of the PHP `mail()` handler, which Vercel cannot run.
- New `/admin` dashboard lists incoming booking requests (token protected).

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

Without `DATABASE_URL`, local development stores bookings in `.data/bookings.sqlite`. The
`.data` directory is ignored by Git.

### Environment variables

| Variable       | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `DATABASE_URL` | Neon Postgres connection string (`?sslmode=require` included); required on Vercel, optional locally. |
| `ADMIN_TOKEN`  | Secret used to open `/admin` and view bookings.                |

The `bookings` table is created automatically on first use — no migration step needed.

## Deploying to Vercel

1. Push this project to GitHub and import it in Vercel.
2. Create a Neon project (or use the Vercel Neon integration) and copy its pooled connection string.
3. Add `DATABASE_URL` and `ADMIN_TOKEN` to the Vercel project's environment variables.
4. Deploy. The build is a standard `next build`; no extra configuration is required.

## Database schema

```sql
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Viewing bookings

Visit `/admin` and enter `ADMIN_TOKEN`. Requests are ordered newest first.

## Project structure

```
app/
  page.tsx              Home
  services/page.tsx     Service categories
  about/page.tsx        About the hub
  contact/page.tsx      Contact + booking form
  admin/page.tsx        Token-protected bookings dashboard
  api/bookings/route.ts Booking API (validation + Neon insert)
components/             Header, footer, service cards, booking form
lib/site.ts             Brand details and service content
lib/db.ts               Neon client, schema bootstrap, queries
public/assets/          Brand photos
legacy/                 Archived original static site
```
