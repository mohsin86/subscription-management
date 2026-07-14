# Interview Prep Notes

Questions an interviewer might ask about this project, with answers, organized by build step. Questions are numbered sequentially (Q1, Q2, ...) across the whole file, not restarting per step.

## Current Status (resume point — Claude updates this after every step)

- **Project**: subscription-tracker MVP (repo `subscription-management`, renamed from `memory-next` in `package.json`), now doubling as Mohammed Mohasin's personal portfolio site.
- **Phase 6 (Subscription CRUD): complete.** 6.1 validation schema, 6.2 GET/POST route, 6.3 PATCH/DELETE route (auth check, ownership check via `findFirst({ id, userId })`, `SubscriptionSchema.safeParse`), 6.4 `subscriptions.client.ts` fetch wrapper, 6.5 all 4 React Query hooks, 6.6 `SubscriptionForm.tsx`, 6.7/6.8 `app/(protected)/subscriptions/page.tsx` (table + inline add/edit/delete). Verified with a real seeded demo account (`demo@subscription-tracker.dev` / `Demo@1234`), not just unauthenticated-401 checks.
- **Also done, outside the original phase plan** (portfolio pivot, see chat history for full detail): rebuilt `(front)` pages as a real portfolio (Home/About/Projects/CV) driven by `lib/data/profile.ts`; added `Account`/`Session`/`VerificationToken` Prisma models so Google OAuth via `PrismaAdapter` actually completes; added Google sign-up; wired the contact form to send real email via Resend; redesigned `Navbar` (sticky, active-route pills, mobile menu) and the protected layout (full-width topbar, icon sidebar, avatar dropdown), both responsive; added `prisma/seed.ts` demo data; **fixed a deploy-blocking bug**: `lib/generated/prisma` is gitignored and there was no `postinstall` script, so a fresh `npm install` (e.g. on Vercel) would build without a generated Prisma client — added `"postinstall": "prisma generate"` to `package.json` and confirmed a clean `npx next build` from a deleted `lib/generated/prisma`.
- **Known pre-existing quirk, not yet fixed**: `prisma/migrations/` is also gitignored (`.gitignore:44`), which is backwards from normal practice — migration history isn't in version control. Not a build blocker (the Neon DB is already migrated), but would bite in a fresh clone or CI. Revisit if that becomes a problem.
- **Deployed**: not yet — pushed to `origin/initial-phase` (commit `dca96b3`), but no Vercel project connected yet. Next concrete step for "going live": connect the GitHub repo on vercel.com, set env vars (`DATABASE_URL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `RESEND_API_KEY`, `CONTACT_EMAIL`), and add the prod Google OAuth redirect URI.
- **Next**: Phase 7 — real dashboard spend totals (`app/(protected)/dashboard/page.tsx` is currently a placeholder: "Spend totals coming soon.").
- **Workflow note**: strict instruction-only workflow was relaxed for the whole portfolio-pivot session — the user directed Claude to edit app files, run commands, and push to git directly throughout. This file and CLI-scaffold actions remain the standing baseline exceptions regardless.

## Quick Answers (5-second cheat sheet)

Skim this before an interview. Full reasoning for each is below if you need to go deeper on a follow-up.

- **Q1** Server Component by default; `'use client'` trades a smaller/faster server-only render for hooks + browser APIs — not worth it on a static page.
- **Q2** `<section>` renders inside `(front)/layout.tsx`'s `<main>`, because that's exactly where `{children}` sits — layouts persist across nav, pages swap.
- **Q3** Parentheses only hide the segment from the URL — zero security. Real protection is `proxy.ts` + `verifySession()`/`verifyAdmin()`.
- **Q4** `proxy.ts` does a fast cookie-signature check before render and redirects if invalid; it never hits the DB, so the page/route re-checks authoritatively.
- **Q5** `Providers` needs `'use client'` because Context needs a client runtime — but its `children` can stay Server Components (interleaving).
- **Q6** `useState(() => new QueryClient())` gives each request/mount its own client; a module-level one would leak cached data across users on the server.
- **Q7** Four layers = four single jobs (validate boundary, fetch, React Query state, UI) — each swappable and testable alone.
- **Q8** `useMutation` gives pending/success/error state for free (plus resubmit/race handling) — replacing hand-rolled `loading` state.
- **Q9** Client-side Zod validation is UX only; server-side `safeParse` in `route.ts` is the real trust boundary since Route Handlers are directly callable by anyone.
- **Q10** `zodResolver` plugs Zod into RHF's error state; `register()` wires inputs via `ref` (uncontrolled) so typing doesn't re-render the form.
- **Q11** `ContactFormData` is `z.infer`'d from the schema — type and runtime validation can never drift apart.
- **Q12** One `.prisma` file is required today because relations (`Todo.user → User`) must resolve across the whole schema at once; at scale, Prisma supports splitting into multiple files under `prisma/schema/` (still one merged schema/migration history), and very large orgs sometimes split by bounded context into fully separate schemas/clients instead.
- **Q13** Prisma 7's `"prisma-client"` generator makes `new PrismaClient()` require an explicit driver `adapter` (e.g. `new PrismaPg({ connectionString })`) instead of reading the datasource URL itself — the schema's `datasource` block only declares the provider type now, `prisma.config.ts` supplies the URL for CLI commands (migrate/studio), and app code must pass its own adapter.
- **Q14** `Decimal` maps to Postgres `numeric` (exact); `Float`/JS numbers are IEEE-754 binary floating point, which can't represent values like 0.1 exactly — wrong for money.
- **Q15** `migrate reset` drops the whole dev DB and replays every migration from scratch (then re-seeds if configured) — for when history is broken/stale; `migrate dev` just diffs the schema, writes one new migration file, and applies it, preserving existing data.
- **Q16** A Prisma `enum` becomes a native Postgres `ENUM` type — the DB itself rejects any value outside `MONTHLY`/`YEARLY`, not just app-level validation; a plain `String` would rely on the app never sending a bad value.
- **Q17** `onDelete: Cascade` makes Postgres auto-delete a user's `Subscription` rows when the `User` row is deleted, at the DB level — chosen here since there's no admin/orphan-cleanup flow, so orphaned subscriptions would just be permanent garbage.
- **Q18** JWT sessions, not database sessions, because the Credentials provider only supports JWT — `PrismaAdapter` here is for Google account linking, not session storage.
- **Q19** `authorized({ auth })` returning `false` makes `next-auth`'s own middleware wrapper auto-redirect to `pages.signIn` with a `callbackUrl` param — no manual redirect code in `proxy.ts`.
- **Q20** `authorize()` returns only `{ id, name, email, image }`, never the full Prisma row, because whatever it returns gets embedded in the JWT cookie — returning the bcrypt hash would leak it client-side.
- **Q21** `lib/validation/auth.ts` holds both `SignupSchema` and `LoginSchema` — one validation file per *domain* (auth), not per form, so login's schema doesn't need a new sibling file.
- **Q22** Signup skips the Route Handler/fetch-wrapper/React-Query layers the contact page uses — Server Actions collapse the RPC plumbing into one function, and there's no cache to manage for a one-shot mutation.
- **Q23** `loginAction`'s catch only handles `instanceof AuthError` and rethrows everything else — `signIn()`'s successful redirect works by *throwing* a `NEXT_REDIRECT` internally, and an unconditional catch would swallow that too.
- **Q24** `tsc --incremental`'s `.tsbuildinfo` cache can report a stale "file is not a module" error for a file that's actually fine — delete `tsconfig.tsbuildinfo` and re-run to rule out a phantom cache error before debugging the code itself.
- **Q25** A hook is just a function starting with `use` that taps into React's internal state/lifecycle machinery — the `use` prefix isn't cosmetic, it's how the rules-of-hooks linter recognizes a function needs those call-order rules enforced.
- **Q26** `useUpdateSubscription`'s `mutationFn` takes one object `{ id, data }` instead of two args because `useMutation`/`.mutate()` only ever passes a single "variables" value through.
- **Q27** All three mutation hooks invalidate the same `["subscriptions"]` key as `useSubscriptions`'s query — that shared key is what tells React Query "this cached list is now stale, refetch it," regardless of which mutation changed the data.
- **Q28** These hooks live under `app/(front)/subscriptions/hooks/`, not `app/api/subscriptions/hooks/` — `app/api/` is reserved for server-only Route Handlers (`route.ts`), not client-side React hooks that read from `QueryClientProvider`.
- **Q29** The protected route group is `(protected)`, not `(admin)` — the project has no RBAC; the real distinction is "logged in," not "admin role."
- **Q30** `layout.tsx` can be `async` and `await auth()` directly — layouts are Server Components too, same data-fetching rules as pages.
- **Q31** This project's shadcn install uses `@base-ui/react`, not Radix — `render={<Button/>}` replaces `asChild`, plain `onClick` replaces `onSelect`.
- **Q32** `logoutAction()` is called directly in `onClick` (not wrapped in a `<form>`) so it doesn't fight the Base UI menu item's own click/keyboard handling.
- **Q29** `(protected)` is named after what it *requires* (an authenticated session), not `(admin)` — this project explicitly dropped RBAC/admin, so an "admin" name would misleadingly imply role-gating that doesn't exist.
- **Q30** `app/(protected)/layout.tsx` can be an `async` Server Component and `await auth()` directly — layouts support the same Server Component data-fetching as pages, so the session doesn't need a client-side fetch or a prop drilled from further up.
- **Q31** shadcn's CLI here generated components on `@base-ui/react`, not Radix — `DropdownMenuTrigger` takes a `render={<Button/>}` prop (a real element, merged onto the primitive) instead of Radix's `asChild` boolean, and `DropdownMenuItem` exposes plain `onClick`, not Radix's `onSelect`. Confirmed by reading the installed `.d.ts` files directly rather than assuming from older shadcn/Radix familiarity.
- **Q32** `logoutAction` (a Server Action) is called directly from `UserMenu`'s `onClick={() => logoutAction()}` instead of wrapped in a `<form action={...}>` — Next.js supports invoking Server Actions imperatively from client event handlers, not just via form submission; a `<form>` nested inside a Base UI menu item would also fight the primitive's own click/keyboard handling.

---

## Step 1 — Home page (`app/(front)/page.tsx`)

**Q1: Why is this a Server Component by default, and what would change if you added `'use client'`?**

In the App Router, every component is a Server Component unless it (or a parent boundary) is explicitly marked otherwise. Server Components render entirely on the server — their code (and any imports only they use) never gets shipped to the browser as JS, they can directly `await` data (DB calls, `fetch`, etc.) without an API layer, and they can't use browser-only APIs or React state/effect hooks (`useState`, `useEffect`, `onClick`, etc.) since there's no client-side runtime for them.

If you added `'use client'` to the top of `page.tsx`:
- It becomes a Client Component: it still renders once on the server for the initial HTML (SSR), but its JS bundle is *also* sent to the browser and it hydrates there.
- You'd gain the ability to use hooks, event handlers, and browser APIs.
- You'd lose the ability to be `async` / directly `await` server-only data — you'd need to fetch that in a parent Server Component and pass it down as props, or fetch client-side.
- Bundle size grows — that component's code (and everything it imports) now ships to the client.

For this static home page there's no interactivity, so keeping it a Server Component is strictly better: smaller bundle, faster first paint, no unnecessary hydration cost.

**Q2: Where does `<section>` sit in the component hierarchy relative to `layout.tsx`'s `<main>`?**

The App Router renders nested `layout`/`page` files as a tree: `app/layout.tsx` (root, has `<html>`/`<body>`) → `app/(front)/layout.tsx` (renders `<Navbar />`, then `{children}` inside `<main>`, then `<Footer />`) → `app/(front)/page.tsx`'s default export is what gets slotted in as `{children}`.

So concretely, the DOM nesting ends up:

```
<html><body>
  <div class="wrapper">        ← (front)/layout.tsx
    <Navbar />
    <main>                      ← (front)/layout.tsx's <main>
      <section>...</section>    ← this page.tsx's returned JSX (the {children})
    </main>
    <Footer />
  </div>
</body></html>
```

The `<section>` is not a sibling of `<main>` — it's rendered *inside* `<main>` because that's exactly where `layout.tsx` placed `{children}`. This is also why layouts persist across navigations within the same segment (they don't re-mount), while the `page.tsx` content swaps out.

---

## Step 2 — Route groups and layout structure (`app/(front)`, `app/(admin)`)

**Q3: What does wrapping a folder in parentheses actually do, and does it provide any security/route hiding?**

A route group is created by wrapping a folder name in parentheses — `(front)`, `(admin)`. Its only effect is that the folder name is omitted from the URL: `app/(admin)/dashboard/page.tsx` becomes the route `/dashboard`, not `/admin/dashboard`. It provides **zero access control**. Anyone who knows or guesses `/dashboard` can request it directly — there is no way to "hide" a route through folder naming, since the parentheses are stripped at compile time and never reach the URL at all.

The reason to use route groups here is purely **layout composition**: everything in `(front)` — home, about, contact, login — shares one `layout.tsx` with the Navbar/Footer, while everything in `(admin)` can have a different layout, even though both sit at the same nesting depth under `app/`. The actual protection for `/dashboard` comes from an entirely separate mechanism: `proxy.ts` (optimistic cookie check) plus `verifySession()`/`verifyAdmin()` called inside the page/Route Handler (the authoritative check).

**Q4: What does `proxy.ts` do on a request to a protected route, and why isn't the cookie check there "secure enough" on its own?**

`proxy.ts` (the renamed, Node.js-runtime-by-default successor to `middleware.ts` in this Next.js version) runs before the route renders, on nearly every matching request. For `/dashboard`, it reads the `session` cookie, verifies the JWT's signature and expiry via `decrypt()`, and redirects to `/login` before any page code runs if there's no valid session.

This is an "optimistic" check — it only verifies the cookie cryptographically, never queries the database. It can't know if the user was since deleted, deactivated, or had their role changed. It's also easy to silently lose coverage of a route if the `matcher` isn't kept in sync during a refactor, and Server Functions/Route Handlers are directly callable via raw `fetch`/POST regardless of what a browser-only proxy redirect would suggest. So the real authorization decision is made twice, deliberately (defense in depth): `proxy.ts` gives a fast, good-enough-for-UX redirect so unauthenticated users never see the page shell, while `verifySession()`/`verifyAdmin()` next to the actual data access is what really decides whether Prisma returns any rows.

---

## Step 2.5 — React Query + Zustand provider setup

**Q5: Why does `app/providers.tsx` need `'use client'` even though it wraps the rest of the (mostly Server Component) app?**

React Context — which `QueryClientProvider` is built on — needs client-side subscription machinery and isn't supported in Server Components at all. So any component that *renders* a Context Provider must itself be a Client Component. But thanks to "interleaving," the `{children}` passed into that Client Component from `RootLayout` can still be Server Components — the client boundary only applies to `Providers` itself, not to everything nested inside it. That's why `app/layout.tsx` stays a Server Component while still giving the whole tree access to the query client.

**Q6: Why `useState(() => new QueryClient())` instead of just `const queryClient = new QueryClient()` at module scope?**

Module-scope state in a file that participates in server rendering can be shared across unrelated requests in the same server process — in a Next.js App Router app, that would risk one user's cached query data leaking into another user's SSR pass. Creating the client inside `useState`'s lazy initializer means each component instance gets its own `QueryClient`, created exactly once per mount, scoped correctly per request/session. This is TanStack Query's official recommended pattern for the App Router.

---

## Step 3 — Contact page (Route Handler + React Query mutation)

**Q7: Why split this into four layers (`route.ts`, `lib/api/contact.ts`, `hooks/useSubmitContact.ts`, `page.tsx`) instead of just calling `fetch` inside the component?**

Each layer has exactly one job. The Route Handler is the server boundary — it validates input and is the only place that can be called directly (by anyone, with any client). `lib/api/contact.ts` is a plain, framework-agnostic fetch wrapper — no React, no React Query — so it could be unit tested or reused outside of a component entirely. `hooks/useSubmitContact.ts` wires that fetcher into React Query's mutation state machine, so any component needing "submit the contact form" logic reuses the hook instead of duplicating fetch/error handling. The component only handles UI: form state and rendering. The payoff: swapping React Query for something else later only touches the hook, not every component that submits a form; and the fetcher can be tested with a mocked `fetch`, no component rendering required.

**Q8: In `useMutation`, what do `isPending`/`isSuccess`/`isError`/`error` actually represent, and why not just track a `loading` boolean yourself with `useState`?**

They come from React Query's internal state machine that tracks a mutation's lifecycle automatically: idle → pending → success/error, reset whenever `mutate` is called again. Building this by hand means manually setting `loading = true` before the fetch, catching failures into an error state, resetting state on each new submit, and guarding against a user double-submitting before the first request resolves. `useMutation` already handles all of that — including cancellation/race-condition edge cases — which is exactly the boilerplate it exists to remove.

---

## Step 3.5 — Zod schema + react-hook-form integration

**Q9: Why validate with Zod on the server (`route.ts`) if `react-hook-form` already validates on the client?**

Client-side validation is a UX feature, not a security boundary. A Route Handler is directly reachable via raw `fetch`/`curl`/Postman regardless of what any form does — nothing forces a request to have gone through `ContactPage` at all. So the server-side `ContactSchema.safeParse(body)` in `route.ts` is the actual trust boundary; the client-side check via `zodResolver` in `page.tsx` just gives instant feedback without a round trip. Sharing one `ContactSchema` (in `lib/validation/contact.ts`) between both means the definition of "valid" is written once and can't drift between client and server.

**Q10: What does `zodResolver(ContactSchema)` do inside `useForm`, and what's the difference between `register('name')` and the old controlled-input pattern (`value`/`onChange` + `useState`)?**

`zodResolver` adapts a Zod schema into the validation function shape `react-hook-form` expects: on submit (and on subsequent changes, depending on validation mode), RHF runs the form values through `ContactSchema.safeParse`, and any Zod issues become `formState.errors` keyed by field name, using the same `.min()`/`.email()` messages defined in the schema.

`register('name')` returns `{ name, onChange, onBlur, ref }` spread onto the `<input>`, wiring it to RHF's internal form state via the DOM `ref` — an *uncontrolled* input. The previous version kept a `form` object in React state and re-rendered the whole component on every keystroke (`onChange` → `setForm` → re-render). With `register`, typing doesn't trigger a re-render at all; RHF reads the current value straight from the DOM node when needed (submit, validation). This is why RHF forms stay fast even with many fields — the render cost no longer scales with keystrokes.

**Q11: Where does `ContactFormData`'s type actually come from now, and why is that better than writing the type by hand?**

It's inferred: `export type ContactFormData = z.infer<typeof ContactSchema>` in `lib/validation/contact.ts`. Because the type is derived *from* the runtime schema instead of being hand-written separately, they can never silently drift apart — e.g. adding a `.min(10)` constraint to `phone` can't accidentally leave the TypeScript type saying `phone: string` while validation expects something stricter, since there's only one definition to update. `contact.client.ts`, `useSubmitContact.ts`, and `page.tsx` all import this same inferred type, so the compiler enforces that the form, the fetcher, and the mutation hook agree on shape end-to-end.

---

## Step 4 — Prisma schema (`User`, `Todo`)

**Q12: Why do `User` and `Todo` have to live in the same `schema.prisma` file, and how would this be organized if the project had 30-40 models?**

A Prisma schema is parsed as one whole AST, not a set of independently-imported modules — `Todo.user User @relation(...)` references the `User` model directly, so both must be visible together for Prisma to validate the relation and generate a single consistent `PrismaClient`. There's no cross-file `import` inside `.prisma` files.

At real scale, Prisma supports splitting models across multiple `.prisma` files inside one `prisma/schema/` folder (e.g. `user.prisma`, `todo.prisma`, one shared file for `generator`/`datasource`); every file in that folder gets merged into a single schema at parse time, so it's purely an organizational split — still one `PrismaClient`, one migration history. What actually gets harder at 30-40 models isn't the schema file, it's `prisma/migrations/` being one linear, shared sequence for the whole project — two teams touching unrelated models can still generate conflicting migrations against the same timeline. Mitigations at that point: domain-based file splitting (above) plus strict review via `prisma migrate diff`, `///` doc comments on models/fields (Prisma carries these into the generated client's JSDoc), and — for genuinely independent domains — sometimes giving each bounded context its own schema, migration history, and generated client entirely.

**Q13: Why does `lib/prisma.ts` construct a `PrismaPg` adapter instead of just calling `new PrismaClient()`?**

This project's Prisma version (7.8.0) uses the newer `"prisma-client"` generator, which changes how the client actually connects to the database. Checking the generated client's own internal types (`lib/generated/prisma/internal/prismaNamespace.ts`) shows `adapter` is a **required**, non-optional field on `PrismaClientOptions` — there's no fallback to reading a connection string automatically at runtime. So the app has to construct its own driver adapter (`new PrismaPg({ connectionString: process.env.DATABASE_URL })`, from `@prisma/adapter-pg`, backed by the real `pg` Node Postgres driver) and pass it explicitly: `new PrismaClient({ adapter })`.

This also explains the split of responsibility between `schema.prisma` and `prisma.config.ts`: the schema's `datasource db { provider = "postgresql" }` block only declares *which kind* of database this is (for the query engine/type generation), while `prisma.config.ts`'s `datasource: { url: process.env.DATABASE_URL }` is what the **CLI** (`migrate`, `db seed`, `studio`) uses to reach the real database. Neither of those supplies a connection at runtime for your own application code — that's what the adapter in `lib/prisma.ts`/`prisma/seed.ts` is for. Three different places read the same `DATABASE_URL`, each for a different consumer (CLI vs. app runtime vs. schema type-checking).

---

## Step 5 — Auth.js setup (`auth.ts`, `proxy.ts`, signup, login)

**Q18: Why is the session strategy `"jwt"` here when `PrismaAdapter(prisma)` is also configured — isn't the adapter supposed to manage sessions?**

An `Adapter` in Auth.js has two separate jobs: persisting OAuth account links/verification tokens, and (optionally) persisting sessions in a `Session` table. The Credentials provider has a hard constraint baked into Auth.js itself — it cannot participate in database sessions at all, only JWT — because there's no OAuth `account` row to anchor a database session to for a plain email/password login. Since this app needs both Google (which *could* use database sessions) and Credentials (which can't) side by side, JWT is the only strategy that works for both. `PrismaAdapter` is still doing real work here: it's what persists the Google `Account` row (provider, `providerAccountId`, tokens) and links it to the right `User` row on first Google sign-in — it's just not the thing storing the session itself.

**Q19: Walk through exactly what happens when an unauthenticated user requests `/dashboard`.**

`proxy.ts`'s `matcher` includes `/dashboard/:path*`, so `export { auth as default } from "@/auth"` runs before the page renders. Internally, `auth` (from `next-auth`) reads the request's session cookie, decodes it (no DB hit — JWT), and calls our `callbacks.authorized({ auth })` from `auth.ts`, which returns `!!auth?.user` — `false` here since there's no session. Looking at `next-auth`'s own `lib/index.js`: when `authorized` returns a falsy, non-`Response` value, it builds a redirect to `config.pages.signIn` (`"/login"`, from our config) and appends `?callbackUrl=<the original URL>` before returning that as the proxy's response — all of this is `next-auth` library code, nothing we wrote by hand. That `callbackUrl` is why, after logging in, users can be sent back to the page they originally wanted (not built yet in this project, but the query param is already there for free).

**Q20: Why does `authorize()` return `{ id, name, email, image }` instead of just returning the Prisma `user` object it already fetched?**

Whatever `authorize()` returns becomes the `user` argument to the `jwt` callback, and anything attached to the token there gets signed into the session cookie sent to the browser. The fetched `user` row includes the bcrypt password hash — returning it directly would put that hash inside a cookie the client can read (not decrypt without the secret, but still an unnecessary exposure and a violation of the "only return what the caller needs" rule Next.js's own Server Functions security docs call out). Hand-picking the four safe fields keeps the token's contents intentional.

**Q21: Why does `lib/validation/auth.ts` hold two unrelated-looking schemas (`SignupSchema`, `LoginSchema`) instead of getting its own file per form like `contact.ts` did?**

`contact.ts` only has one form on its page, so "one file per page" and "one file per domain" happen to look identical there. Once a second form (login) exists in the same domain (auth), the pattern has to pick a side: a `loginFieldValidation.ts` sibling next to `signupFieldValidation.ts` would just duplicate the fact that both belong to the same auth flow, whereas `Login`/`Signup` prefixes on exported names already disambiguate inside one file. The rule going forward is **one validation file per domain** (`auth.ts`, `contact.ts`, and eventually maybe `subscription.ts`), not per individual form.

**Q22: Why does the signup flow (`actions.ts` + `SignupForm.tsx`) have fewer layers than the contact flow (`route.ts` + `contact.client.ts` + `useSubmitContact.ts` + `page.tsx`)?**

The contact page's four layers exist because a Route Handler is a separate network endpoint that has to be `fetch`ed from the client — that's what `contact.client.ts` (the fetch wrapper) and `useSubmitContact.ts` (the React Query mutation wrapping that fetch) are for. A `'use server'` Server Function collapses that entirely: `signupAction` is imported directly into `SignupForm.tsx` and called like a normal async function — Next.js handles turning that into a network call under the hood, so there's no fetch wrapper to write. And React Query's core value (caching, shared query keys, background refetching) doesn't apply to a one-shot mutation nothing else in the app reads — RHF's built-in `formState.isSubmitting` already covers the pending state that `useMutation` would otherwise provide.

**Q23: In `loginAction`, why does the `catch` block check `error instanceof AuthError` and rethrow anything that isn't, rather than just catching everything and returning a generic error?**

`signIn()` doesn't return a value on success in this configuration — it redirects, and in Next.js, `redirect()` works by throwing a special error (tagged with a `NEXT_REDIRECT` digest) that a framework boundary above the Server Function is expected to catch and turn into an actual HTTP redirect. If `loginAction`'s `catch` swallowed every error unconditionally, a *successful* login's redirect-throw would get caught right here, turned into `{ error: "Invalid email or password." }`, and the user would see a login failure message despite the login having actually worked. Checking `instanceof AuthError` (Credentials rejections are thrown as `CredentialsSignin`, a subclass of `AuthError`) and rethrowing everything else lets the redirect throw pass through untouched.

**Q24: What actually caused the "File 'actions.ts' is not a module" TypeScript error, if the file was correct the whole time?**

`tsconfig.json` has `"incremental": true`, which makes `tsc` write a `tsconfig.tsbuildinfo` cache file recording each file's last-checked state, so subsequent runs can skip re-parsing unchanged files. That cache was written during an earlier check where `actions.ts` genuinely didn't exist yet or was incomplete; on the next run, `tsc` trusted the stale cache entry instead of re-reading the file from disk, so it kept reporting the old error even after the file was fixed. Deleting `tsconfig.tsbuildinfo` forces a full, cache-free re-check — worth doing as a first troubleshooting step any time a TypeScript error looks inconsistent with what's actually in the file.

---

## Step 6.5 — React Query hooks (`app/(front)/subscriptions/hooks/`)

**Q25: What is a "hook," conceptually, and why does the name have to start with `use`?**

A hook is an ordinary function that lets a component reach into React's internal machinery — remembered state across renders, lifecycle timing, or (as with `useQuery`/`useMutation` here) values read from a Context Provider (`QueryClientProvider`, set up in `app/providers.tsx`). The `use` prefix isn't a style preference — React's "rules of hooks" (no calling hooks inside `if`/loops/nested functions, only at the top level of a component or another hook) exist because React tracks hook calls *by call order* across renders. The `eslint-plugin-react-hooks` linter can only enforce those rules on functions it recognizes as hooks, and the only signal it has for that is the `use` prefix — name a function `getSubscriptions` instead and violations inside it go uncaught.

**Q26: Why does `useUpdateSubscription`'s `mutationFn` take one object argument (`{ id, data }`) instead of `updateSubscription`'s original two arguments (`id`, `data`)?**

`useMutation`'s `mutate()`/`mutateAsync()` only ever forwards a single "variables" value to `mutationFn` — there's no way to pass a second positional argument through React Query's API. Wrapping the two values the underlying fetcher needs into one object (`({ id, data }) => updateSubscription(id, data)`) is the standard way to adapt a two-argument function to that one-argument contract, without changing `updateSubscription` itself.

**Q27: Why do `useCreateSubscription`, `useUpdateSubscription`, and `useDeleteSubscription` all call `invalidateQueries({ queryKey: ["subscriptions"] })` — the exact same key `useSubscriptions` queries with?**

React Query caches query results under their `queryKey` and only refetches when something tells it that key's data is stale. The three mutations don't (and shouldn't) know how to patch the cached list themselves — that's fragile and duplicates server logic in the client. Instead, each one just declares "whatever data lives under `["subscriptions"]` is now out of date" on success; React Query then refetches `useSubscriptions`'s query automatically if it's currently mounted. Using the identical key on both sides is what links "this mutation happened" to "that query needs to update" — a typo in either key (e.g. `"subscription"` singular) would silently break invalidation with no type error, since query keys are just arrays, not a shared enum.

**Q28: Why do these hook files have to live under `app/(front)/subscriptions/hooks/` and not `app/api/subscriptions/hooks/`?**

`app/api/` is a reserved App Router convention for Route Handlers — folders there are matched against incoming HTTP requests looking for a `route.ts` exporting `GET`/`POST`/etc. It has no special meaning for arbitrary files, but placing client-side React hooks there is misleading structurally: these hooks run in the browser and read from `QueryClientProvider`, they have nothing to do with the server request-handling tree `app/api/` represents. Keeping them under the `(front)/subscriptions` route segment (next to the page/components that will actually call them, mirroring `contact/hooks/useSubmitContact.ts`) keeps "server boundary" and "client UI logic" visually separated in the file tree, matching the same client/server split the rest of the project already draws.

---

## Step 6.6–6.9 — Protected route group (`app/(protected)/`), sidebar/topbar, shadcn `UserMenu`

**Q29: Why is the new protected-area route group named `(protected)` instead of `(admin)`?**

The distinction being encoded is "requires a logged-in session," not "requires an admin role" — this project's locked-in scope explicitly has no RBAC and no admin dashboard; every authenticated user only ever manages their own data. Calling the group `(admin)` would misleadingly imply role-based gating that was deliberately never built, and would read as a leftover from the earlier superseded todo/RBAC plan. `(protected)` names the actual mechanism: `proxy.ts`'s matcher and each page/handler's own `auth()` check.

**Q30: Why can `app/(protected)/layout.tsx` be `async` and call `await auth()` directly, instead of needing a separate data-fetching step?**

Server Components support `async`/`await` for direct data access, and `layout.tsx` files are Server Components by default just like `page.tsx` files — there's nothing special about a page that a layout lacks here. Since `auth()` just decodes the JWT session cookie (no DB hit, per Q18), calling it directly in the layout is cheap and runs once per request, with the result (`session.user.name`/`email`) passed down as props to `Topbar`/`UserMenu` rather than each of those needing to fetch the session themselves.

**Q31: The dropdown menu code uses `render={<Button/>}` and `onClick`, not `asChild` and `onSelect` — where did that come from?**

This project's shadcn install (`npx shadcn@latest`, v4.13.0, style `"base-nova"`) is built on `@base-ui/react` rather than Radix UI, which is what most shadcn examples online (and in most training data) still assume. Reading the actual installed type definitions (`node_modules/@base-ui/react/menu/trigger/MenuTrigger.d.ts`, `.../item/MenuItem.d.ts`) confirmed the real API: `MenuTrigger` accepts a `render` prop typed as `React.ReactElement | ComponentRenderFn<...>` — pass the actual element you want rendered, and the primitive merges its own behavior/ARIA/ref onto it — where Radix would use a boolean `asChild` prop plus JSX children. `MenuItem` only exposes `onClick`; Radix's item-selection callback is named `onSelect`. Same underlying idea (both are "headless" primitive libraries with a way to swap the rendered element and a way to react to activation), different concrete API — a good example of why this project's rule is "check the installed package's own types before writing code," not memory of an older/different version.

**Q32: Why does `UserMenu` call `logoutAction()` directly in an `onClick`, instead of the `<form action={logoutAction}>` pattern used for `googleLoginAction`?**

Both are valid ways to invoke a Server Action from a Client Component — Next.js supports calling a `'use server'` function like a normal async function from client-side code, not only via a form's `action` prop. Here, a `<form>` submit button nested inside a Base UI `MenuItem` (which already manages its own click/keyboard/focus handling as part of being a menu item) would create two competing systems reacting to the same click. Calling `logoutAction()` directly in `MenuItem`'s own `onClick` avoids that conflict; the earlier `<form action={googleLoginAction}>` pattern was fine there because that trigger was a plain, unmanaged `<button>` with no surrounding primitive to conflict with.

---

## Step 4 (rework) — Subscription-tracker schema (`User`, `Subscription`, `BillingCycle`)

**Q14: Why is `price` typed as `Decimal` instead of `Float`/a plain JS `number`?**

`Float` in Prisma maps to a native binary floating-point type, the same representation JS numbers use under the hood (IEEE-754 double). That format can't represent many base-10 fractions exactly — `0.1 + 0.2` famously comes out as `0.30000000000000004` — because 0.1 has no exact finite binary expansion. For money, those rounding errors compound across renewals and reports. `Decimal` maps to Postgres's `numeric` type, which stores an exact base-10 value, so `9.99` is really `9.99`, not the nearest representable binary approximation. The tradeoff is that `Decimal` values arrive in JS as a special `Decimal` object (from `decimal.js`), not a plain `number` — you use `.toString()`/`.toNumber()` deliberately at the boundary instead of doing raw arithmetic on it.

**Q15: What's the actual difference between `prisma migrate reset` and `prisma migrate dev`, and why was `reset` the right call here?**

`migrate dev` is the everyday command: it diffs your current schema against the migration history, generates one new migration file for whatever changed, and applies it — existing data is preserved. `migrate reset` is destructive on purpose: it drops the entire dev database, recreates it, and replays *every* migration in `prisma/migrations/` from scratch in order, then runs the seed script if one is configured. It's the tool for when the migration history itself is the problem — here, the old `Todo`/`Role`-based history didn't match the new `Subscription`-based model at all, so diffing forward would have fought the old shape instead of cleanly starting over. Since this is a throwaway dev database with no real user data to preserve, a full reset was strictly simpler than trying to hand-write a migration that transforms one schema into an unrelated one.

**Q16: What does declaring `enum BillingCycle { MONTHLY YEARLY }` in Prisma actually create in Postgres, versus just using a `String` with app-level checks?**

Prisma enums on a PostgreSQL datasource compile to a real native Postgres `ENUM` type (`CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY')`), and the `cycle` column is typed as that enum, not `text`. That means the database itself rejects any row where `cycle` isn't one of those two literal values — an invalid value can't get in even via a raw SQL insert or a bug in some other service that skips the app's validation layer entirely. A plain `String` column would rely on every single write path (this app, a future script, a manual `psql` session) independently remembering to validate the value; the enum makes "only these two values are legal" a guarantee enforced at the lowest level, closest to the data.

**Q17: What does `onDelete: Cascade` do on `Subscription.user`, and why was that the right choice instead of, say, `Restrict` or manual cleanup?**

It's a foreign-key action Postgres enforces at the DB level: when a `User` row is deleted, every `Subscription` row referencing it via `userId` is automatically deleted too, in the same transaction — no orphaned rows, no separate cleanup query needed in application code. The alternative, `Restrict` (or no action), would make the `User` DELETE fail outright if any subscriptions still reference it, forcing the app to manually delete a user's subscriptions first in the right order. Cascade was chosen here because this project has no admin/orphan-management flow at all — nothing in the app is ever going to come back later and clean up subscriptions belonging to a deleted user, so leaving them behind would just be permanent dead data instead of a real feature.
