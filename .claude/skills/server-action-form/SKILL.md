---
name: server-action-form
description: Walks through building a data-mutating form the way this project (memory-next) has already locked in — zod schema, a 'use server' action, and a 'use client' react-hook-form component wired together with zodResolver. Use this whenever the user wants to add, mention, or plan a new form that creates/updates/deletes data (signup-style forms, settings forms, CRUD forms for any model), or asks "how do I add a form like login/signup" — even if they don't say "server action" explicitly. Do NOT use for read-only display components, forms with client-side-only state, or forms this project already routes through TanStack Query + API routes (e.g. the subscriptions forms) unless the user is explicitly converting one of those to the Server Action pattern.
---

# Server Action form pattern (memory-next)

This project is a hand-typed Next.js 16 / interview-prep learning project (see `AGENTS.md`, `brief.md`). **Do not write the files yourself.** Walk the user through each piece, explain *why* it's shaped that way, and let them type it. This mirrors the project's `code-reviewer` subagent workflow — you're the guide, not the author.

The canonical example already in the repo is the login/signup flow. Point back to these files when explaining a step rather than inventing a new example:

- `lib/validation/auth.ts` — zod schemas
- `app/(front)/signup/actions.ts` and `app/(front)/login/actions.ts` — the `'use server'` actions
- `app/(front)/signup/SignupForm.tsx` and `app/(front)/login/LoginForm.tsx` — the client form components

## The three pieces, in order

Always build in this order — each piece depends on the type from the previous one.

### 1. Zod schema (`lib/validation/<domain>.ts`)

```ts
import { z } from "zod";

export const ThingSchema = z.object({
  field: z.string().min(1, "Field is required"),
  // .refine(...) here for cross-field checks (see SignupSchema's
  // password/confirmPassword refine as the reference for that)
});

export type ThingFormData = z.infer<typeof ThingSchema>;
```

This is the single source of truth for both client-side validation (via `zodResolver`) and server-side validation (via `safeParse` in the action) — one schema, two enforcement points. That's *why* it lives in its own file instead of inline in the action or the form.

### 2. Server Action (`app/<route>/actions.ts`)

```ts
"use server";

import { ThingSchema, type ThingFormData } from "@/lib/validation/<domain>";

export async function thingAction(
  data: ThingFormData
): Promise<{ error: string } | void> {
  const parsed = ThingSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input." };
  }

  // mutation goes here (prisma call, signIn, etc.)

  // then either:
  //   redirect("/somewhere");        // signup does this
  // or just return, letting the client component handle success
}
```

Return shape is always `{ error: string } | void` — never throw for expected validation/business-logic failures (bad password, duplicate email, etc.). Only let unexpected errors throw. This keeps the client component's error handling uniform.

**If this form lives under `app/(protected)/`**: the reference examples (login/signup) are public routes and don't show this, so call it out explicitly — the action must verify the session before doing the mutation. Per this project's locked architecture (`.claude/agents/code-reviewer.md`), that means checking the session via the DAL helpers before touching the database, and scoping any query by the authenticated user's id (e.g. a todo mutation must filter by `userId` so one user can't touch another's row by guessing an id). Flag this as a required step, don't let the user skip it silently.

### 3. Client form component (`<Name>Form.tsx`, `"use client"`)

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ThingSchema, type ThingFormData } from "@/lib/validation/<domain>";
import { thingAction } from "./actions";

export default function ThingForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ThingFormData>({ resolver: zodResolver(ThingSchema) });

  const onSubmit = async (data: ThingFormData) => {
    setServerError(null);
    const result = await thingAction(data);
    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label htmlFor="field">Field</label>
        <input id="field" {...register("field")} className="border px-2 py-1 w-full" />
        {errors.field && <p className="text-red-500 text-sm">{errors.field.message}</p>}
      </div>
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="border px-4 py-2">
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
```

The pieces worth explaining as you go (these are the interview-relevant bits — flag for `interview-notes.md`):

- `register("field")` wires the input to RHF without controlled-component re-renders on every keystroke.
- `zodResolver` runs the same schema client-side before the action is even called, so `errors.field` is populated instantly — the action's `safeParse` is the second, non-skippable line of defense (client validation is UX, server validation is security).
- `isSubmitting` comes from RHF's form state, not a manually-managed `useState` — one less thing to keep in sync.
- `serverError` is separate from RHF's field errors because it's not tied to a specific field — it's the action's `{ error }` response (wrong password, duplicate email, failed auth check, etc.).

## What to actually do when this triggers

1. Ask what the form is for and what fields it needs, if not already clear from context.
2. Check whether it lives under `app/(protected)/` — if so, flag the session-check requirement from step 2 above before moving on.
3. Walk through the three pieces **in order** (schema → action → component), one at a time, showing the shape but leaving the field-specific details for the user to fill in and type themselves.
4. After they've typed each piece, this is a natural moment to suggest running the `code-reviewer` subagent on it.
