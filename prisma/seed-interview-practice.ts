import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { marked } from "marked";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { parseMarkdownFile } from "../lib/interview-practice-parser";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/**
 * main — parses content/interview-practice/*.md into structured rows and
 * (re)seeds the InterviewQuestion table from them, for topics that already
 * exist in the database (create topics via the Manage Topics page first).
 * Safe to re-run: clears each topic's rows before re-inserting so edits to
 * the source files stay in sync. Topics with no matching content file (e.g.
 * added purely through the app) are skipped.
 */
async function main() {
  const onlySlug = process.argv[2];
  const topics = await prisma.topic.findMany({
    where: onlySlug ? { slug: onlySlug } : undefined,
    orderBy: { order: "asc" },
  });

  if (onlySlug && topics.length === 0) {
    throw new Error(`No topic with slug "${onlySlug}" found in the database`);
  }

  let total = 0;

  for (const topic of topics) {
    const filePath = path.join("content", "interview-practice", `${topic.slug}.md`);
    if (!fs.existsSync(filePath)) {
      console.log(`${topic.title}: no content/interview-practice/${topic.slug}.md, skipping`);
      continue;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = parseMarkdownFile(raw);

    await prisma.interviewQuestion.deleteMany({ where: { topicId: topic.id } });

    await prisma.interviewQuestion.createMany({
      data: parsed.map((entry, index) => ({
        topicId: topic.id,
        section: entry.section,
        question: entry.question,
        answer: marked.parse(entry.answer) as string,
        codeSnippet: entry.codeSnippet,
        order: index,
      })),
    });

    console.log(`${topic.title}: seeded ${parsed.length} questions`);
    total += parsed.length;
  }

  console.log(`Done. ${total} questions seeded across ${topics.length} topic(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
