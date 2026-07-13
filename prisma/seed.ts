// STALE — written for the old Role/username RBAC schema (Role.ADMIN, username field),
// both removed when the project pivoted to the subscription-tracker MVP.
// No seeding is needed for Core v1 (self-serve signup, no admin user).
//
// Revisit this when we want dev-fixture data — e.g. a test User + a few Subscription rows
// to make the dashboard/list pages easy to eyeball without signing up manually each time.
// At that point: rewrite main() to create a User via email (not username), then
// prisma.subscription.createMany(...) with some sample rows, and re-enable the
// `seed: "tsx prisma/seed.ts"` line in prisma.config.ts.

/*


import { PrismaClient, Role } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {


  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
  where: { username },
  update: { password: hashedPassword },
  create: {
    username,
    password: hashedPassword,
    role: Role.ADMIN,
  },
});


  console.log(`Admin user "${username}" seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  */