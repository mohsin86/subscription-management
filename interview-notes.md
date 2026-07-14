# Interview Prep Notes

Core questions an interviewer is most likely to ask as follow-ups to "walk me through this project," with full answers.

## Current Status (resume point — Claude updates this after every step)

- **Project**: subscription-tracker MVP (repo `subscription-management`, renamed from `memory-next` in `package.json`), now doubling as Mohammed Mohasin's personal portfolio site.
- **Phase 6 (Subscription CRUD): complete.**
- **Phase 7 (Dashboard): complete.** `dashboard/page.tsx` rebuilt as an async Server Component — per-currency monthly/yearly spend totals via `Prisma.Decimal` arithmetic, plus a list of active subscriptions linking to `app/(protected)/subscriptions/[id]/page.tsx` (ownership-checked via `findFirst({ id, userId })`, `notFound()` for both missing and not-owned).
- **Deployed**: not yet — pushed to `origin/initial-phase` (commit `dca96b3`), no Vercel project connected yet.
- **Next**: no Phase 8 defined yet — decide what's next (renewal reminders, spend history/charts, or wrapping up for interview readiness).
- **Workflow note**: strict instruction-only workflow is standing baseline; user types/pastes all app code themselves.

---

## Q1: Why split the contact flow into four layers (`route.ts`, `lib/api/contact.ts`, `hooks/useSubmitContact.ts`, `page.tsx`) instead of just calling `fetch` inside the component?

Each layer has exactly one job. The Route Handler is the server boundary — it validates input and is the only place that can be called directly (by anyone, with any client). `lib/api/contact.ts` is a plain, framework-agnostic fetch wrapper — no React, no React Query — so it could be unit tested or reused outside of a component entirely. `hooks/useSubmitContact.ts` wires that fetcher into React Query's mutation state machine, so any component needing "submit the contact form" logic reuses the hook instead of duplicating fetch/error handling. The component only handles UI: form state and rendering. The payoff: swapping React Query for something else later only touches the hook, not every component that submits a form; and the fetcher can be tested with a mocked `fetch`, no component rendering required.

## Q2: Why validate with Zod on the server (`route.ts`) if `react-hook-form` already validates on the client?

Client-side validation is a UX feature, not a security boundary. A Route Handler is directly reachable via raw `fetch`/`curl`/Postman regardless of what any form does — nothing forces a request to have gone through the page component at all. So the server-side `ContactSchema.safeParse(body)` in `route.ts` is the actual trust boundary; the client-side check via `zodResolver` in `page.tsx` just gives instant feedback without a round trip. Sharing one schema between both means the definition of "valid" is written once and can't drift between client and server.

## Q3: What does `proxy.ts` do on a request to a protected route, and why isn't the cookie check there "secure enough" on its own?

`proxy.ts` (the renamed, Node.js-runtime-by-default successor to `middleware.ts` in this Next.js version) runs before the route renders, on nearly every matching request. For `/dashboard`, it reads the `session` cookie, verifies the JWT's signature and expiry via `decrypt()`, and redirects to login before any page code runs if there's no valid session.

This is an "optimistic" check — it only verifies the cookie cryptographically, never queries the database. It can't know if the user was since deleted, deactivated, or had their role changed. It's also easy to silently lose coverage of a route if the `matcher` isn't kept in sync during a refactor, and Server Functions/Route Handlers are directly callable via raw `fetch`/POST regardless of what a browser-only proxy redirect would suggest. So the real authorization decision is made twice, deliberately (defense in depth): `proxy.ts` gives a fast, good-enough-for-UX redirect so unauthenticated users never see the page shell, while the DB-backed check next to the actual data access is what really decides whether Prisma returns any rows.

## Q4: Why is the session strategy `"jwt"` when `PrismaAdapter(prisma)` is also configured — isn't the adapter supposed to manage sessions?

An `Adapter` in Auth.js has two separate jobs: persisting OAuth account links/verification tokens, and (optionally) persisting sessions in a `Session` table. The Credentials provider has a hard constraint baked into Auth.js itself — it cannot participate in database sessions at all, only JWT — because there's no OAuth `account` row to anchor a database session to for a plain email/password login. Since this app needs both Google (which *could* use database sessions) and Credentials (which can't) side by side, JWT is the only strategy that works for both. `PrismaAdapter` is still doing real work here: it's what persists the Google `Account` row (provider, `providerAccountId`, tokens) and links it to the right `User` row on first Google sign-in — it's just not the thing storing the session itself.

## Q5: Why is `price` typed as `Decimal` instead of `Float`/a plain JS `number`?

`Float` in Prisma maps to a native binary floating-point type, the same representation JS numbers use under the hood (IEEE-754 double). That format can't represent many base-10 fractions exactly — `0.1 + 0.2` famously comes out as `0.30000000000000004` — because 0.1 has no exact finite binary expansion. For money, those rounding errors compound across renewals and reports. `Decimal` maps to Postgres's `numeric` type, which stores an exact base-10 value, so `9.99` is really `9.99`, not the nearest representable binary approximation. The tradeoff is that `Decimal` values arrive in JS as a special `Decimal` object (from `decimal.js`), not a plain `number` — you use `.toString()`/`.toNumber()` deliberately at the boundary instead of doing raw arithmetic on it.