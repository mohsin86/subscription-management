This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

- **Now**: daily email reminder (via Resend) before a subscription renews — how many days before is configurable per subscription (default 7).
- **Planned**: a free mobile channel via Telegram Bot API (see `AGENTS.md` roadmap, Phase 10).

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Prisma 7 (driver adapter, no query-engine binary) · PostgreSQL (Neon) · Auth.js v5 · TanStack Query · React Hook Form + Zod · Tailwind CSS · Resend · Docker

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
