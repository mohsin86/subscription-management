---
name: server-client-boundary
description: Pre-flight check for whether a new or edited component in subscription-management should be a Server Component or a Client Component ('use client'), and where the data-fetching should happen. Use this BEFORE writing any new page, layout, or component — whenever the user is about to add a component, asks "does this need use client", mentions adding state/hooks/onClick/interactivity to something, or is deciding how a component should load its data. This is a before-the-fact check; the code-reviewer subagent catches these same mistakes after the fact, so use this skill to avoid needing that correction in the first place.
---

# Server/Client boundary check (subscription-management)

This project mixes two legitimate patterns on purpose — the point of this skill isn't "always prefer Server Components," it's picking the right one *before* typing, so you don't have to backtrack after `code-reviewer` flags it.

## Step 1 — Does this component need to be a Client Component?

A component needs `"use client"` at the top only if it does at least one of:
- Uses a hook: `useState`, `useEffect`, `useForm`, `useQuery`, etc.
- Attaches an event handler: `onClick`, `onChange`, `onSubmit`, etc.
- Reads browser-only APIs (`window`, `localStorage`) or context created with `createContext`/consumed with `useContext`

If none of those apply, it's a Server Component by default — **don't add `"use client"` just because a sibling or parent has it.**

## Step 2 — Push the boundary as deep as possible

The real mistake to avoid isn't "used a hook" — it's marking a whole subtree client when only one leaf needs it. This project already does it correctly once you look for it:

- `app/(protected)/layout.tsx` — Server Component (`async function`, calls `auth()` directly server-side)
- `components/protected/Sidebar.tsx`, `Topbar.tsx` — Server Components, receive plain serializable props (`name: string | null`, `email: string | null` — strings, not functions or class instances)
- `components/protected/UserMenu.tsx` — `"use client"`, because it's the one piece with an actual dropdown/interaction

So: layout → Sidebar/Topbar stayed server, and only the interactive leaf (`UserMenu`) paid the client cost. When building something new, ask "which specific piece needs the hook/handler?" and isolate `"use client"` to just that piece, passing it plain data as props from the server parent — not the other way around.

**One structural exception**: a component that exists purely to set up a context provider (`app/providers.tsx`, wrapping the app in `QueryClientProvider`) must be `"use client"` even though it has no handlers itself — `createContext`/providers require the client runtime. That's fine; it's still minimal — it doesn't make its *children* client components, they're just rendered inside it.

## Step 3 — Where should the data come from?

This project has two competing, both-valid data patterns already in use — pick based on what the component actually needs, don't default to one out of habit:

**A. Direct fetch in a Server Component** — e.g. `layout.tsx` calling `auth()` inline.
Use this when: the data is needed once at render time, doesn't need client-side refetching/mutation/optimistic updates, and the component doesn't otherwise need to be a Client Component. Simplest option — no loading state to manage, no extra request waterfall.

**B. TanStack Query hook in a Client Component** — e.g. `useSubscriptions()` (`app/(protected)/subscriptions/hooks/useSubscriptions.ts`) calling an API route, used inside a Client Component that's already interactive.
Use this when: the data needs to be refetched after a mutation (create/update/delete with optimistic UI), or the component is already a Client Component for other reasons (forms, filters, live interaction) so the fetch might as well live alongside that state.

Don't reach for TanStack Query just to read static data once — that's what pattern A is for, and it avoids an unnecessary `"use client"` boundary. Conversely, don't try to force a Server Component fetch into something that needs to refetch after a client-side mutation — that's what pattern B and the API route + hook pair are for.

## Common mistakes this catches (the ones code-reviewer flags after the fact)

- `async function` on a Client Component — not allowed; Client Components can't be `async`. Fetch via `useEffect`/`useQuery` instead, or move the fetch to a Server Component parent.
- A hook or `onClick` inside a component with no `"use client"` — will fail at build/runtime.
- Marking a whole page `"use client"` because one button needs an `onClick`, instead of extracting that button into its own client leaf.
- Passing a function, Date object, or non-plain object as a prop from a Server Component into a Client Component — only serializable values cross that boundary cleanly (this is why `Topbar` takes `name`/`email` as plain strings, not a `session` object with methods).

## What to actually do when this triggers

1. Ask (or infer from context) what the new component needs to do — static display, form, list with mutations, etc.
2. Walk through Step 1 out loud: does it actually need `"use client"`, and if so, which specific piece?
3. If splitting into a server parent + client leaf, sketch the two pieces and how props pass between them, using the Sidebar/Topbar/UserMenu split as the template.
4. Name which data-fetching pattern (A or B) fits, and why — don't just default to whichever was used most recently.
