# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project: Subscription Tracker (learning / interview-prep + portfolio)

Learning project to prepare for a Next.js interview. Doubles as a personal portfolio site: `(front)` route group is the portfolio, `(protected)` route group is the subscription tracker app.

**No budget** — any third-party service used must be free-tier (no paid WhatsApp Business API, no paid push infra).

## Workflow rule — READ BEFORE TOUCHING ANY FILE

Do not create, edit, or delete application files directly (`app/`, `components/`, `lib/`, `prisma/`, `interview-notes.md`, etc.). Instead, give step-by-step instructions and the code to paste — the user pastes/types it themselves. This is a learning exercise; the value is in the user writing the code, not Claude writing it. Exception: CLI-scaffold commands (e.g. `npx shadcn add`, `prisma migrate`, `prisma generate`) can be run directly — they're not hand-written app code. This rule can be temporarily lifted only for an explicit, scoped initiative the user names outright, and reverts once that initiative wraps.

**Prisma v7 gotcha**: `prisma migrate dev` no longer auto-runs `prisma generate` (unlike v6 and earlier). After *any* schema change, run both commands — `migrate dev` then `generate` — or the generated client silently goes stale and the app throws "Property 'x' does not exist" errors that look like code bugs but aren't.

## Current status (update this after every phase — this is the durable resume point, not memory)

- **Phase 6 (Subscription CRUD)**: complete.
- **Phase 7 (Dashboard)**: complete — per-currency spend totals, subscription list linking to `/subscriptions/[id]` detail pages.
- **Phase 8 (Renewal status)**: complete — `lib/subscription-status.ts` derives `Active` / `Renewing soon` / `Expired` from `renewalDate`; shown on the subscriptions table, detail page, and dashboard.
- **Phase 9 (Configurable reminder + email notifications)**: complete — `Subscription.reminderDaysBefore` (per-subscription setting), `app/api/cron/renewal-reminders/route.ts` (Vercel Cron → Resend email), `vercel.json` cron schedule.
- **Phase 10 (Auth rate limiting + signup spam protection)**: deferred — see roadmap.
- **Phase 11 (Telegram mobile notifications)**: complete — see roadmap for details.
- **Also done, outside the original phase plan**:
  - Portfolio pivot — `(front)` route group rebuilt as a real portfolio (Home/About/Projects/CV); Google OAuth; Resend-based contact form; responsive Navbar/protected layout; Prisma seed data; `postinstall: prisma generate` fix for deploys.
  - Vendor link-out — `Subscription.vendorUrl` (optional), "Manage on vendor site" link on the detail page.
  - In-app documentation page (`/docs`).
  - **Docker containerization** — see below.
- **Not started**: Phase 12 (see roadmap below).
- **Deployed**: live at `mohammed-mohasin.vercel.app/subscription-management/login`, connected to Vercel.

## Containerization (Docker)

- `next.config.ts` has `output: "standalone"` — minimal, self-contained production build.
- Multi-stage `Dockerfile` (deps → builder → runner), non-root user, only copies `public/`, `.next/standalone`, `.next/static` into the final image.
- `docker-compose.yml` builds and runs the app on port 3000, loading env vars from `.env.local` at **runtime only** (not build time — `.env*` is in `.dockerignore` on purpose).
- **Gotcha already hit twice**: any SDK client that validates eagerly in its constructor (e.g. `new Resend(apiKey)`) must be instantiated *inside* the Route Handler function, never at module scope — `next build`'s page-data-collection step imports every route module regardless of whether it's called, and module-scope code with no env vars available at build time will crash the build. Both `app/api/contact/route.ts` and `app/api/cron/renewal-reminders/route.ts` were fixed this way.
- Database migrations are **not** run inside the container — `standalone` output doesn't trace the Prisma CLI or `prisma/migrations/*.sql` since the app itself never imports them. Run `npx prisma migrate deploy` separately, against whichever `DATABASE_URL` you're targeting, before/after building.
- **Workflow split**: daily development uses `npm run dev` (hot reload); Docker (`docker compose up --build`) is only run as a pre-PR/pre-merge sanity check that the app actually builds and runs as a real deployable container — not part of the normal edit-save-check loop.

## Roadmap (Phase 10+)

- **Phase 10 — Auth rate limiting + signup spam protection**: deferred — not worth the added infra (Upstash account, etc.) for a portfolio project with no real traffic. Revisit if this ever needs to handle real public signups.
- **Phase 11 — Mobile notification channel**: complete — Telegram Bot API. `User.telegramChatId` (optional, set via `/settings`), `lib/notifications/telegram.ts` sends via the Bot API, `app/api/cron/renewal-reminders/route.ts` sends both email and Telegram for any user with a chat ID saved. Verified end-to-end with a real test subscription and a real Telegram message received.
- **Phase 12 — Team subscriptions with full RBAC**: new `Team` + `TeamMember` (role: `OWNER` / `ADMIN` / `MEMBER`) models; `Subscription.teamId` (nullable — personal subscriptions unaffected). Only `OWNER`/`ADMIN` can create/edit/delete a team's subscriptions; `MEMBER` is read-only. Every mutation Route Handler needs a role check alongside the existing ownership check.

See `interview-notes.md` for the detailed Q&A/reasoning behind decisions already made.
