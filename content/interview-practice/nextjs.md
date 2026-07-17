Next.js Interview Prep

# Fundamentals

**1\. What is Next.js?**

A React framework that adds the stuff you'd otherwise have to hand-build yourself - routing, server-side rendering, static generation, API routes, image optimization, bundling. You still write React components, Next just handles the plumbing around them.

**2\. Why is Next.js popular?**

Because it solves real pain points: SEO (plain React SPAs render blank HTML first), performance (built-in code splitting, image optimization), and developer experience (file-based routing, zero-config TypeScript/CSS support). It's basically "React, but production-ready out of the box."

**3\. Differences between SSR, SSG, and CSR**

- CSR: browser downloads a mostly empty HTML page + JS bundle, then React renders everything client-side. Fast to build, bad for SEO/first paint.
- SSR: server renders the HTML on every request, sends it fully formed, then React hydrates it. Good for SEO and dynamic per-user data, but slower (server does work every request).
- SSG: HTML is built once at build time and served from a CDN. Fastest possible, but data can go stale until you rebuild (or use ISR).

**4\. What are API Routes, and how do you create them?**

They let you build backend endpoints inside your Next.js app instead of a separate server. In the Pages Router, any file in pages/api/ becomes an endpoint:

// pages/api/hello.js

export default function handler(req, res) {

res.status(200).json({ message: 'Hello' });

}

In the App Router these are called Route Handlers (app/api/hello/route.js), covered later.

**5\. What is \`next.config.js\`, and common configs?**

The central config file for the framework. Common things people set: images.domains (allowed image hosts), env (expose env vars), redirects()/rewrites(), reactStrictMode, and webpack() for custom bundler tweaks.

module.exports = {

reactStrictMode: true,

images: { domains: \['example.com'\] },

};

**6\. How does Next.js handle routing out of the box?**

File-based routing - no react-router setup needed. A file at pages/about.js (or app/about/page.js) automatically becomes /about. Folder structure = URL structure.

**7 & 8. What is Middleware, and what's it for?**

Code that runs before a request completes, at the edge, before hitting a page or API route. Used for auth checks, redirects, A/B testing, geo-based rewrites, header manipulation.

// middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {

if (!req.cookies.get('token')) {

return NextResponse.redirect(new URL('/login', req.url));

}

}

export const config = { matcher: '/dashboard/:path\*' };

**9\. How do you optimize images?**

Use the built-in next/image component instead of &lt;img&gt;. It lazy-loads, serves responsive sizes, auto-converts to WebP/AVIF, and prevents layout shift by requiring width/height.

import Image from 'next/image';

&lt;Image src="/hero.jpg" alt="hero" width={800} height={400} /&gt;

**10\. How do you handle errors and error pages?**

Pages Router: custom pages/404.js and pages/500.js, or a catch-all \_error.js. App Router: error.js (client component, catches render errors in that segment) and not-found.js for 404s.

# Data Fetching & Rendering

**11\. How do you implement analytics?**

Drop the tracking script in with next/script (so it doesn't block rendering), or use Vercel Analytics / Google Analytics via a small client component that fires on route change. Track route changes using the usePathname/useSearchParams hooks in App Router since there's no single global route-change event like Pages Router had.

**12\. How does Next.js handle CSS and styling?**

Built-in support for global CSS, CSS Modules (Component.module.css - scoped automatically), Sass, and CSS-in-JS libraries. No extra webpack config needed.

**13\. Explain SSR.**

The server generates the full HTML for a page on every request (using getServerSideProps in Pages Router, or just fetching data directly in a Server Component in App Router), sends it to the browser already populated, then React hydrates it to make it interactive. Great when data changes per-request or per-user.

**14\. Explain Dynamic Imports.**

Load a component or module only when it's needed instead of bundling it upfront - shrinks your initial JS bundle.

import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('../components/HeavyChart'), { ssr: false });

**15\. Benefits of Next.js over plain React?**

Plain React (via Create React App etc.) gives you a client-only SPA - you'd have to bolt on routing, SSR, code splitting, and SEO handling yourself. Next.js ships all of that built in, plus image/font optimization and a saner production setup.

**16\. Explain SSG.**

Pages are pre-rendered to static HTML at build time. Since there's no per-request server work, it's the fastest and cheapest to host (just static files on a CDN). Best for content that doesn't change per user - blogs, marketing pages, docs.

**17\. What is ISR?**

Incremental Static Regeneration - lets a statically generated page update in the background after a set interval, without a full rebuild. You get SSG speed with content that stays reasonably fresh.

export async function getStaticProps() {

return { props: { data }, revalidate: 60 }; // regenerate at most every 60s

}

**18\. How does \`getStaticProps()\` work?**

Runs at build time (Pages Router), fetches data, and passes it as props to the page - the result gets baked into static HTML. Only runs server-side, never in the browser, so it's safe to use secrets/DB calls in there.

**19\. Purpose of \`getServerSideProps()\`?**

Same idea as getStaticProps, but it runs on every request instead of at build time. Use it when the page needs fresh, per-request data (like something tied to the logged-in user).

**20\. Common data fetching methods?**

Pages Router: getStaticProps, getServerSideProps, getStaticPaths, or client-side fetching with useEffect/SWR/React Query. App Router: just fetch() (or a DB call) directly inside an async Server Component, with caching controlled via fetch options.

# Routing & Navigation

**21\. How would you internationalize (i18n) a Next.js app?**

Pages Router has built-in i18n routing config (next.config.js → i18n: { locales, defaultLocale }), which auto-prefixes URLs like /fr/about. App Router doesn't have that built in anymore - you typically use a library like next-intl and put the locale in the route segment (app/\[locale\]/...).

**22\. What is Preview Mode?**

A way to bypass static generation and view draft/unpublished content (common with headless CMS) before it's actually published. In App Router this is now called Draft Mode (next/headers → draftMode()).

**23\. How do you use TypeScript with Next.js?**

Just add a tsconfig.json (or run next dev once and it'll offer to create one) and rename files to .ts/.tsx. Next auto-installs the needed types and configures everything - no manual webpack/babel setup.

**24\. How do you handle authentication?**

Common approach: a library like Auth.js (NextAuth) or Clerk for session/OAuth handling, store the session in an httpOnly cookie, and check it in Middleware to protect routes, or in Server Components/Route Handlers for API-level checks.

**25\. How do you manage environment variables?**

.env.local for local secrets. Anything prefixed NEXT*PUBLIC* gets exposed to the browser bundle; anything without that prefix stays server-only. Never put real secrets in a NEXT*PUBLIC* var.

**26\. How do custom \`\_app.js\` and \`\_document.js\` work?**

\_app.js wraps every page - good spot for global layout, global CSS imports, context providers. \_document.js controls the actual HTML/&lt;head&gt;/&lt;body&gt; shell (server-only, no state/effects) - used for things like setting lang on &lt;html&gt; or adding a custom font link.

**27\. What's the role of the \`Link\` component?**

Client-side navigation between pages without a full page reload - it also prefetches the linked page's code in the background when it scrolls into view, making nav feel instant.

import Link from 'next/link';

&lt;Link href="/about"&gt;About&lt;/Link&gt;

**28\. How does automatic code splitting work?**

Each page only ships the JS it actually needs - Next splits the bundle per route automatically, so visiting /about doesn't download the code for /dashboard too.

**29\. What's the \`Head\` component used for?**

(Pages Router) Lets you inject stuff into the page's &lt;head&gt; - title, meta tags, favicon - on a per-page basis.

import Head from 'next/head';

&lt;Head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/Head&gt;

App Router replaces this with the metadata export / generateMetadata().

**30\. What is Fast Refresh?**

Next's hot-reloading - edit a component and see the change in the browser instantly, without losing component state, and without a full page reload.

# Performance & Deployment

**31\. How do you manage state?**

Same as any React app - local useState/useReducer for component state, Context or a library (Zustand, Redux, Jotai) for shared state. Next doesn't dictate a state management approach; the extra wrinkle is remembering Server Components can't hold React state at all, since they don't re-render on the client.

**32\. How does Next.js improve SEO?**

Pages are rendered on the server (or pre-built), so crawlers get fully formed HTML instead of an empty div, unlike a pure CSR app. Plus built-in support for meta tags, sitemaps, and fast load times, which all factor into ranking.

**33\. How do you deploy a Next.js app?**

Easiest is Vercel (built by the same team, zero-config). It also runs fine on any Node host, Docker, or as a static export (next export) if you have no server-side features. Just need next build then next start.

**34\. What's the purpose of \`\_app.js\`?**

It's the top-level wrapper for every page in the Pages Router - the one place to add global CSS, a shared layout, or a context provider that every page needs.

**35\. How do you handle static files?**

Drop them in the public/ folder - anything there is served from the root URL. E.g. public/logo.png → /logo.png.

**36\. Best practices for improving performance?**

Use next/image and next/font for images/fonts, dynamic-import heavy client-only components, prefer Server Components for anything that doesn't need interactivity, cache data fetches appropriately, and avoid shipping large client bundles by keeping "use client" boundaries small and low in the tree.

**37\. What is \`fallback\` in \`getStaticPaths()\`?**

Controls what happens for a dynamic route path that wasn't pre-rendered at build time. false → 404 for unknown paths. true → serves a fallback/loading state then generates the page on first request. 'blocking' → waits server-side and generates it before responding, no loading flash.

**38\. Common security considerations?**

Sanitize/validate all inputs in API routes, never expose secrets via NEXT*PUBLIC*, set proper CORS on route handlers, use httpOnly cookies for auth tokens (not localStorage), and keep Middleware auth checks in sync with server-side checks (don't rely on client-only guarding).

**39\. Built-in optimizations Next.js provides?**

Automatic code splitting, image optimization, font optimization (self-hosts Google Fonts, no layout shift), script loading strategies via next/script, and route-level prefetching via Link.

# App Router

**40\. Purpose of \`pages\` vs \`app\` directories?**

pages/ is the older, file-based routing system (Pages Router). app/ is the newer routing system (App Router, default since Next 13+) built on React Server Components, with support for layouts, streaming, and colocated loading/error states. You can technically have both during migration, but new projects should just use app/.

**41\. What is the \`metadata\` export?**

A static object you export from a page.js/layout.js in App Router to set SEO tags (title, description, OG image, etc.) - replaces the old Head component.

export const metadata = {

title: 'My Page',

description: 'A page about things',

};

**42\. What is \`generateStaticParams()\`?**

The App Router equivalent of getStaticPaths - tells Next which dynamic route params to pre-render at build time.

export async function generateStaticParams() {

const posts = await getPosts();

return posts.map((post) => ({ slug: post.slug }));

}

**43\. How do \`fetch()\` cache options work in App Router?**

fetch() is patched by Next to plug into its caching system. fetch(url) defaults to cached ("force-cache", basically static). fetch(url, { cache: 'no-store' }) opts out entirely (always fresh, like SSR). fetch(url, { next: { revalidate: 60 } }) gives you ISR-style periodic revalidation.

**44\. How do you set metadata with \`generateMetadata()\`?**

Same idea as the static metadata export, but dynamic - useful when the title/description depends on fetched data (e.g. a blog post's own title).

export async function generateMetadata({ params }) {

const post = await getPost(params.slug);

return { title: post.title };

}

**45\. What is the \`useRouter()\` hook?**

Gives you programmatic access to routing - current path, query params, and navigation methods (push, replace, back). Note: in App Router it comes from next/navigation, not next/router (different API, fewer properties, since routing state now).

**46\. Difference between \`router.push()\` and \`router.replace()\`?**

push adds a new entry to browser history (back button goes to the previous page). replace swaps the current history entry - no way to go "back" to the page you replaced. Use replace for things like post-login redirects where you don't want the login page in history.

**47\. How do you navigate programmatically?**

'use client';

import { useRouter } from 'next/navigation';

const router = useRouter();

router.push('/dashboard');

**48\. How do you change the default port?**

next dev -p 4000

or set it in the dev/start script in package.json.

**49\. How do you add component-level CSS?**

CSS Modules - name the file Component.module.css and import it; class names get automatically scoped so they don't leak/collide across components.

import styles from './Button.module.css';

&lt;button className={styles.primary}&gt;Click&lt;/button&gt;

# Styling & Assets

**50\. How do you add global CSS?**

Import a plain .css file once, at the root - app/layout.js (App Router) or pages/\_app.js (Pages Router). You can't import global CSS inside a regular component, only at that top level.

**51\. How do you use Tailwind CSS in Next.js?**

npx create-next-app offers Tailwind setup out of the box, or add it manually: install tailwindcss, run npx tailwindcss init, configure the content paths, then add the @tailwind directives to your global CSS.

**52\. What is pre-rendering?**

The general concept behind SSR and SSG - Next generates HTML in advance (either at build time or per request) instead of leaving all the rendering to client-side JS, like a plain SPA would.

**53\. What is the \`Image\` component?**

next/image - an &lt;img&gt; replacement with automatic lazy loading, responsive srcset generation, modern format conversion (WebP/AVIF), and required width/height to prevent layout shift (CLS).

**54\. How do you handle redirects?**

Static ones go in next.config.js:

async redirects() {

return \[{ source: '/old', destination: '/new', permanent: true }\];

}

Dynamic ones happen in Middleware, or with redirect() from next/navigation inside a Server Component/Server Action.

**55\. What is Static Optimization?**

Next automatically detects pages with no blocking data requirements and pre-renders them to static HTML at build time - you don't have to explicitly opt in, it just happens if the page doesn't need server-side data.

**56\. What is \`next/script\`?**

A component for loading third-party scripts (analytics, ads, widgets) with control over loading priority - strategy="beforeInteractive", "afterInteractive", or "lazyOnload" - so they don't block your page's own rendering.

**57\. How do you do client-side data fetching?**

Fetch inside a Client Component using useEffect + fetch, or better, a library like SWR or React Query that adds caching, revalidation, and loading/error states for free.

'use client';

import useSWR from 'swr';

const { data, isLoading } = useSWR('/api/user', fetcher);

**58\. How do you add a sitemap?**

App Router: create app/sitemap.js that returns an array of URLs - Next generates sitemap.xml automatically.

export default function sitemap() {

return \[{ url: '<https://example.com>', lastModified: new Date() }\];

}

**59\. Security best practices in the App Router?**

Remember Server Components' code never ships to the browser, but Client Components' props do - never pass secrets as props into a Client Component. Validate everything in Server Actions/Route Handlers (never trust client input, even from your own form). Keep sensitive checks server-side, not just hidden in the UI.

# Authentication & API

**60\. Difference between \`pages\` and \`components\` directories?**

pages (or app) is reserved, framework-controlled - each file there becomes a route. components is just a convention folder you create yourself for reusable UI pieces that aren't routes.

**61\. How do JWT tokens work in Next.js?**

No different from any other app - server issues a signed JWT on login, client stores it (ideally in an httpOnly cookie, not localStorage, to avoid XSS theft), and it's sent with each request/verified server-side (in Middleware, Route Handlers, or Server Components via cookies()).

**62\. Difference between Pages Router and App Router?**

Pages Router: file = page, data fetching via special exported functions (getStaticProps/getServerSideProps), everything is a Client Component by default. App Router: built on React Server Components, layouts/loading/error states are colocated files, data fetching is just fetch/async functions directly in components, and things are Server Components by default (opt into client with "use client").

**63\. How do you handle auth tokens securely?**

Store in httpOnly, Secure, SameSite cookies - not localStorage/sessionStorage (vulnerable to XSS). Verify server-side on every protected request rather than trusting client state.

**64\. How do you handle file uploads?**

Via a Route Handler (or API route) that reads req.formData() (App Router) or a library like multer/formidable (Pages Router, since it needs raw body parsing). For large files, often better to upload directly to storage like S3 using a pre-signed URL rather than routing the file through your Next server.

**65\. What is the \`"use client"\` directive?**

Marks a component (and everything it imports) as a Client Component - it gets shipped to and hydrated in the browser, so it can use hooks, state, and browser APIs. Without it, App Router components are Server Components by default.

**66\. Limitations of the App Router?**

Steeper learning curve (Server vs Client Component mental model), some libraries still assume a client-only environment and need "use client" wrappers, caching behavior can be non-obvious/surprising, and there's less mature tooling/community content compared to the older Pages Router.

**67\. Difference between \`"use server"\` and \`"use client"\`?**

"use client" marks a component boundary that runs in the browser. "use server" marks a function as a Server Action - callable from a Client Component, but it always executes on the server (e.g. a form submit handler that writes to a database).

**68\. What are Parallel Routes?**

Render multiple independent pages in the same layout at once, using named slots (@folder convention) - like showing a dashboard's @analytics and @team sections side by side, each with its own loading/error state.

**69\. What are Intercepting Routes?**

Let you load a route in the current layout (like a modal) while still preserving the option for the URL to show the full standalone page on refresh - classic example: clicking a photo opens it as a modal over the feed, but visiting that URL directly loads the full photo page.

# Advanced App Router

**70\. What is \`loading.js\`?**

A file you drop next to page.js - Next automatically shows it as a fallback (wrapped in Suspense) while that route segment's data is loading.

**71\. Custom 404 pages using \`not-found.js\`?**

Drop a not-found.js in a route segment (or root app/), and it renders whenever notFound() is called or a route just doesn't match anything.

import { notFound } from 'next/navigation';

if (!post) notFound();

**72\. What is \`template.js\`?**

Like layout.js, but it re-mounts (fresh state, re-run effects) on every navigation instead of persisting - useful when you want enter/exit animations or effects to re-fire per-navigation.

**73\. How do nested layouts work?**

Each folder can have its own layout.js, and they nest automatically - a layout.js in app/dashboard wraps every page under /dashboard, while the root app/layout.js wraps everything. Layouts persist across navigations within their scope (no full remount), so shared UI like a sidebar doesn't re-render on every page change.

**74\. Route Handlers vs API Routes - what's different?**

Route Handlers (app/api/.../route.js) are the App Router version of API routes - same job (build backend endpoints), but use standard Web Request/Response objects instead of the Node-style (req, res) signature, and you export a function per HTTP method (GET, POST, etc.) instead of one default handler.

// app/api/hello/route.js

export async function GET() {

return Response.json({ message: 'Hello' });

}

**75\. How do Streaming and Suspense work?**

Instead of waiting for the whole page's data before sending anything, Next can stream HTML in chunks - wrap a slow component in &lt;Suspense fallback={...}&gt; and the rest of the page renders/ships immediately while that piece streams in when ready.

**76\. What are React Server Components (RSC)?**

Components that render entirely on the server - their code and any dependencies never get sent to the browser, only the resulting HTML/data does. Lets you do things like query a database directly inside a component, and keeps the client JS bundle smaller since server-only logic doesn't ship.

**77\. How do you handle error boundaries using \`error.js\`?**

Drop an error.js next to a page.js - it must be a Client Component and catches rendering errors in that segment, showing a fallback UI instead of crashing the whole app.

'use client';

export default function Error({ error, reset }) {

return &lt;button onClick={() =&gt; reset()}>Try again&lt;/button&gt;;

}

**78\. Server Components vs Client Components - how do you tell them apart?**

Server Component is the default in App Router - no directive needed, can't use hooks/state/browser APIs, runs only on the server. Client Component needs "use client" at the top of the file, gets hydrated in the browser, can use useState/useEffect/event handlers.

**79\. Edge Runtime vs Node.js Runtime - how do you choose?**

Edge Runtime is lighter, starts faster (good for Middleware, simple auth checks, geo-redirects), but has a limited API surface (no full Node APIs, no native modules). Node.js Runtime gives full Node compatibility (DB drivers, file system, heavier npm packages) but has a bigger cold-start cost. Rule of thumb: Edge for small, fast, latency-sensitive logic; Node for anything that needs full Node APIs or heavier processing.

# Bonus Architecture Question

**80\. Complete rendering lifecycle of a request in the App Router**

Request hits the server → Next matches the route and starts rendering from the root layout down, executing Server Components (which can fetch data directly, e.g. straight DB/API calls) → any component wrapped in Suspense that's still loading gets streamed in later, so the server doesn't block on the slowest piece → HTML (plus a serialized description of Client Components) streams to the browser as it's ready → browser paints the HTML immediately (fast first paint since it's real content, not a blank shell) → React hydrates the Client Component parts, attaching event listeners and making them interactive → user can now click/interact, and any Client Component state/effects kick in from there.

**81\. What are Server Actions?**

Functions marked "use server" that let a Client Component call server-side code directly - no need to manually build a Route Handler and fetch it. Commonly used for form submissions (create/update/delete data).

**82\. How do Server Actions work?**

You define an async function with "use server" (either at the top of the function or the file), pass it to a form's action prop or call it from an event handler. Next handles serializing the call over the network, running it on the server, and returning the result - under the hood it's still a POST request, just abstracted away.

async function createPost(formData) {

'use server';

await db.post.create({ title: formData.get('title') });

}

// &lt;form action={createPost}&gt;

**83\. Server Actions vs API Routes**

Server Actions are tighter for form/mutation-style workflows tied to a specific component - less boilerplate, no manual fetch call, works with progressive enhancement (forms still submit without JS). API Routes/Route Handlers are better when you need a stable, reusable HTTP endpoint - e.g. something a mobile app or third party also calls, or anything that needs specific HTTP semantics (custom status codes, webhooks).

**84\. How does caching work in Next.js 15+?**

Next 15 flipped several defaults from earlier App Router versions - fetch() requests and GET Route Handlers are no longer cached by default; you now opt in explicitly (cache: 'force-cache', or export const dynamic = 'force-static') rather than opting out. This was a deliberate move away from the "cached by default" behavior that confused a lot of people in Next 13/14.

**85\. Static vs Dynamic Rendering**

Static: page is rendered once (build time or on first request) and reused for every visitor - fast, cacheable, no per-request server work. Dynamic: page renders fresh on every request, needed when it depends on things like cookies, headers, or search params that differ per user. Using any of those dynamic APIs in a Server Component automatically opts that route out of static rendering.

**86\. What is Partial Prerendering (PPR)?**

An (experimental) approach that lets a single page have both a static shell (rendered at build time) and dynamic, per-request pieces embedded in it - instead of the whole route having to be either fully static or fully dynamic. The static parts serve instantly from cache, then dynamic parts stream in around them via Suspense boundaries.

**87\. React Suspense in Next.js**

Used to declare a loading fallback around any part of the tree that's asynchronous - Next uses it heavily for streaming, both automatically (loading.js) and manually (wrapping a slow data-fetching component with &lt;Suspense&gt; yourself to stream just that piece independently).

**88\. Streaming SSR**

Rendering and sending HTML to the browser in chunks as it becomes ready, instead of waiting for the entire page to finish server-side before sending anything. Improves time-to-first-byte and lets fast parts of the page show up immediately while slower parts (wrapped in Suspense) fill in after.

**89\. Edge Functions vs Middleware**

Middleware always runs on the Edge Runtime and always executes before a request reaches a route (for redirects, rewrites, header checks). Edge Functions is really just "a Route Handler or page configured to run on the Edge Runtime instead of Node" - same idea, different scope: Middleware is one specific, mandatory interception point; Edge Functions is a runtime choice you can apply to actual route logic.

**90\. Revalidation - \`revalidatePath\` vs \`revalidateTag\`**

Both bust cached data on demand (e.g. after a mutation), rather than waiting for a time-based revalidate. revalidatePath('/blog/post-1') clears the cache for that specific route. revalidateTag('posts') clears everything tagged 'posts' across however many different fetches/routes used that tag - more flexible when multiple pages share the same underlying data.

await revalidateTag('posts');

**91\. Authentication with Auth.js**

Auth.js (formerly NextAuth) handles OAuth providers, session management, and JWT/database session storage for you. You configure providers in a central config file, wrap sensitive routes with a session check (via auth() helper or Middleware), and it manages cookies/tokens under the hood.

**92\. Protecting Server Components**

Since Server Components render only on the server, you check auth right inside them (or in a shared layout) before returning any content - e.g. call auth()/read a cookie, and redirect() to /login if there's no valid session, before any UI or data for that page ever gets built.

**93\. Optimistic UI**

Update the UI immediately as if an action already succeeded, then reconcile with the real server response after - makes the app feel instant instead of waiting on a round trip. React's useOptimistic hook pairs naturally with Server Actions for this.

const \[optimisticLikes, addOptimistic\] = useOptimistic(likes, (state, val) => state + val);

**94\. Route Groups**

Folders wrapped in parentheses, like (marketing), that organize routes or apply a shared layout without adding a segment to the actual URL. Useful for grouping (auth)/login and (auth)/signup under one layout while keeping URLs as /login and /signup, not /auth/login.

**95\. Dynamic Segments**

Square-bracket folder names that capture a URL param, e.g. app/blog/\[slug\]/page.js matches /blog/anything and gives you params.slug in the component.

**96\. Catch-all Routes**

\[...slug\] - matches any number of path segments after that point, e.g. app/docs/\[...slug\]/page.js catches /docs/a, /docs/a/b, /docs/a/b/c, all handed to you as an array in params.slug.

**97\. Optional Catch-all Routes**

Same idea but with double brackets, \[\[...slug\]\] - also matches the base route itself with no extra segments (/docs in addition to /docs/a/b), unlike the required version which needs at least one segment.

**98\. Parallel Data Fetching**

Kick off multiple independent fetches at the same time instead of one after another, so total wait time is roughly the slowest one, not the sum of all of them.

const \[user, posts\] = await Promise.all(\[getUser(), getPosts()\]);

**99\. Sequential Data Fetching**

When one fetch depends on the result of another, so they have to run one after the other - e.g. you need a user's ID from one call before you can fetch that user's orders. Slower than parallel by nature, so only do it when there's an actual dependency, not out of habit.

# Core Concepts

**NX1: Server vs Client Components?**
Server Components run only on the server, can hit the database directly, and send no JS to the browser. Client Components (`'use client'`) run in the browser too, needed for `useState`, `onClick`, etc.

**NX2: SSR vs SSG vs ISR?**
SSG: built once at build time (fastest). SSR: rebuilt on every request (always fresh, slower). ISR: static, but auto-rebuilt in the background every N seconds (`revalidate`).

**NX3: App Router vs Pages Router?**
App Router (`app/`) supports Server Components, layouts, and streaming by default. Pages Router (`pages/`) is older — every page is a Client Component, no built-in layouts.

**NX4: What is middleware for?**
Code that runs before a request reaches a page — e.g. redirecting unauthenticated users. This project calls it `proxy.ts`.

**NX5: How does caching/revalidation work?**
Next.js caches data fetches by default; you can opt out per-request or force a re-fetch with `revalidatePath`/`revalidateTag` after a mutation.

**NX6: Server Action vs Route Handler?**
A Server Action is called directly from your own UI without writing a fetch. A Route Handler (`route.ts`) is a real HTTP endpoint any client can call — use it when something outside your UI (a cron job, a webhook) needs to hit it.

**NX7: What does Suspense/streaming do?**
Sends the page shell immediately and streams in slower parts as they finish, shown via a `loading.tsx` fallback, instead of waiting for everything.

**NX8: What causes a hydration mismatch?**
Server-rendered HTML differing from what the client renders — usually from non-deterministic values (current time, random) used during render.

**NX9: How do dynamic routes work?**
A folder like `[id]` matches any URL value (`/subscriptions/123`). `generateStaticParams` tells Next.js which specific values to pre-build at build time.

**NX10: How are env variables handled safely?**
Server-only variables (`DATABASE_URL`) never reach the browser. Only `NEXT_PUBLIC_`-prefixed variables are bundled into client-side JS.

**NX11: What does next/image do?**
Automatically resizes, compresses, lazy-loads images, and serves modern formats — instead of shipping one large file to everyone.

**NX12: How do you handle SEO?**
The Metadata API (`export const metadata = {...}`) sets `<title>`/`<meta>` tags per page; special files generate `sitemap.xml`/`robots.txt`.

**NX13: Edge vs Node runtime?**
Edge is lightweight and starts fast but can't use full Node APIs (like some database drivers). Node runtime supports everything but has a slower cold start.

**NX14: What are route groups?**
A folder in parentheses like `(protected)` groups routes under a shared layout without adding a URL segment.

**NX15: What do error.tsx/not-found.tsx do?**
Special files that automatically catch and display errors or 404s for a route segment, no manual try/catch needed in every page.
