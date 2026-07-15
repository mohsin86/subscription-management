## About

A personal subscription tracker — track recurring subscriptions (Netflix, Spotify, software tools, etc.), see what's active vs. expiring, and get emailed before something renews so nothing charges you by surprise. Built as a learning project to prepare for a Next.js interview; the public-facing pages double as a personal portfolio.

## Live demo

**[mohammed-mohasin.vercel.app/subscription-management/login](https://mohammed-mohasin.vercel.app/subscription-management/login)**

Log in with the seeded demo account, or sign up with your own email/password or Google:

| | |
|---|---|
| Email | `demo@subscription-tracker.dev` |
| Password | `Demo@1234` |

## Notifications

Both channels are live — set up in **Settings** after logging in:

- **Email**: automatic, no setup — daily reminder (via Resend) before a subscription renews, configurable per subscription (default 7 days before).
- **Telegram**: optional, 3-step setup (message the bot, look up your chat ID, save it in Settings) — see the in-app `/docs` page for the full walkthrough with screenshots.

Not planned: WhatsApp and web push were considered but dropped in favor of Telegram (fully free, no business-account approval needed) — see `AGENTS.md`'s roadmap for the reasoning.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Prisma 7 (driver adapter, no query-engine binary) · PostgreSQL (Neon) · Auth.js v5 · TanStack Query · React Hook Form + Zod · Tailwind CSS · Resend · Docker

## Getting started

### 1. Environment variables

Create `.env.local` with:

```
DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=
CRON_SECRET=
TELEGRAM_BOT_TOKEN=
```

### 2. Install and set up the database

```bash
npm install
npx prisma migrate dev
npx prisma generate
```

> Prisma v7 note: `migrate dev` does **not** auto-run `generate` — always run both after any schema change.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

For a production-style build/run check (not used for day-to-day development — use `npm run dev` for that):

```bash
docker compose up --build
```

Database migrations are **not** run inside the container — run `npx prisma migrate deploy` separately against your target `DATABASE_URL` before/after building.

## Deployment

Deployed on Vercel, auto-deploying from `master`. `vercel.json` configures the daily reminder-email/Telegram cron job — Vercel automatically sends `CRON_SECRET` as the request's `Authorization: Bearer` header, so no extra wiring is needed beyond setting the same env vars as local in the Vercel project settings.

## Project docs

- `AGENTS.md` — project conventions, phase roadmap, and Docker/Prisma notes for contributors (human or AI).
- `interview-notes.md` — interview-prep Q&A on key architectural decisions in this codebase.
- `/docs` (in-app) — feature and field reference for end users, including the Telegram setup walkthrough.
