import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { marked } from "marked";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { INTERVIEW_PRACTICE_TOPICS } from "../lib/interview-practice";
import { parseMarkdownFile } from "../lib/interview-practice-parser";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/**
 * main — parses content/interview-practice/*.md into structured rows and
 * (re)seeds the InterviewQuestion table from them. Safe to re-run: clears
 * each topic's rows before re-inserting so edits to the source files stay
 * in sync.
 */
async function main() {
  let total = 0;

  for (const topic of INTERVIEW_PRACTICE_TOPICS) {
    const filePath = path.join("content", "interview-practice", `${topic.slug}.md`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = parseMarkdownFile(raw);

    await prisma.interviewQuestion.deleteMany({ where: { category: topic.title } });

    await prisma.interviewQuestion.createMany({
      data: parsed.map((entry, index) => ({
        category: topic.title,
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

  console.log(`Done. ${total} questions seeded across ${INTERVIEW_PRACTICE_TOPICS.length} topics.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
