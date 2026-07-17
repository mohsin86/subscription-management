import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_EMAIL = "demo@subscription-tracker.dev";
const DEMO_PASSWORD = "Demo@1234";

async function main() {
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { password: hashedPassword },
    create: {
      name: "Demo User",
      email: DEMO_EMAIL,
      password: hashedPassword,
    },
  });

  await prisma.subscription.deleteMany({ where: { userId: user.id } });

  await prisma.subscription.createMany({
    data: [
      {
        userId: user.id,
        name: "Netflix",
        category: "Streaming",
        price: 15.49,
        currency: "USD",
        billingCycleMonths: 1,
        renewalDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        autoRenew: true,
        notes: "Premium plan, shared with family",
      },
      {
        userId: user.id,
        name: "Spotify",
        category: "Music",
        price: 11.99,
        currency: "USD",
        billingCycleMonths: 1,
        renewalDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        autoRenew: true,
        notes: null,
      },
      {
        userId: user.id,
        name: "AWS",
        category: "Cloud Hosting",
        price: 240,
        currency: "USD",
        billingCycleMonths: 12,
        renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        autoRenew: false,
        notes: "Reserved instance for side projects",
      },
      {
        userId: user.id,
        name: "Notion",
        category: "Productivity",
        price: 96,
        currency: "USD",
        billingCycleMonths: 12,
        renewalDate: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000),
        autoRenew: true,
        notes: null,
      },
    ],
  });

  console.log(`Demo user "${DEMO_EMAIL}" seeded with 4 sample subscriptions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
