import { unescapeMarkdown } from "./interview-practice";

export type ParsedQuestion = {
  section: string | null;
  question: string;
  answer: string;
  codeSnippet: string | null;
};

const PAGE_ARTIFACT = /^\d+\/\d+$/;
const TABLE_SEPARATOR = /^\|(\s*-+\s*\|)+$/;
const TABLE_ROW = /^\|.*\|$/;
const PREFIXED_QUESTION_MARKER = /^\*\*(?:[A-Za-z]*\d+)[:.]\s*(.+?)\*\*$/;
// A bare bold line with no numbered/labeled prefix is only treated as a
// question if it ends in a literal "?" — real questions always do, but an
// incidental standalone bold sub-label mid-answer (e.g. "**Creating a Custom
// Writable Stream:**") usually doesn't, so this keeps false positives low.
const BARE_QUESTION_MARKER = /^\*\*(.+\?)\*\*$/;
// A real Markdown ordered-list item whose text is bold, e.g. "1. **Question?**"
// — distinct from PREFIXED_QUESTION_MARKER because the number sits *outside*
// the bold span here, not inside it. Requires ending in "?" (same reasoning
// as BARE_QUESTION_MARKER) and forbids a nested "**" in the captured text —
// without that, a messy source line containing two separate bold spans
// (e.g. "3. **Custom modules**: ... **7. How do you ...?**") would greedily
// match across both instead of failing to match at all.
const NUMBERED_QUESTION_MARKER = /^\d+\.\s+\*\*([^*]+\?)\*\*\s*$/;

/**
 * matchQuestionMarker — recognizes any of the four question-marker styles
 * seen across source files: "**1. text**", "**JS1: text**", "**text?**",
 * "1. **text**".
 */
function matchQuestionMarker(line: string): string | null {
  const prefixed = line.match(PREFIXED_QUESTION_MARKER);
  if (prefixed) return prefixed[1].trim();
  const numbered = line.match(NUMBERED_QUESTION_MARKER);
  if (numbered) return numbered[1].trim();
  const bare = line.match(BARE_QUESTION_MARKER);
  if (bare) return bare[1].trim();
  return null;
}
const SECTION_HEADING = /^#\s+(.+)$/;
const TITLE_PREFIX = /^(.*? Interview Prep)(.*)$/;
const INTERVIEW_QNA_SUFFIX = /\s*[—-]\s*Interview Q&A\s*$/i;

/**
 * dedentLines — strips up to 4 leading spaces from every line. Some source
 * files write answers as real Markdown ordered-list continuations (indented
 * under "1. **Question**"), with 3 or 4 leading spaces depending on the
 * marker's width. Left alone, that indentation risks `marked` reading a
 * paragraph as an indented code block; stripping it (while leaving any
 * further, relative indentation inside a real code block intact) avoids
 * that. No-op for files that were never indented in the first place.
 */
function dedentLines(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/^ {1,4}/, ""))
    .join("\n");
}

/**
 * decodeHtmlEntities — some source files already had inline HTML examples
 * entity-encoded (e.g. `&lt;div&gt;`) from how they were originally exported.
 * That's harmless when rendered as plain paragraph text (marked leaves
 * already-valid entities alone), but a real bug once such text ends up in
 * `codeSnippet` and gets wrapped in a synthetic ``` fence for rendering —
 * marked's fenced-code escaping is unconditional, so it double-escapes the
 * leading `&`, turning `&lt;` into `&amp;lt;` (shown literally in the browser).
 * Decoding here means the DB stores plain characters either way, so both
 * rendering paths produce the same single, correct escape.
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * stripPageArtifacts — removes stray page-footer lines (e.g. "3/105") left
 * over from a PDF/DOCX-to-markdown export.
 */
function stripPageArtifacts(text: string): string {
  return text
    .split("\n")
    .filter((line) => !PAGE_ARTIFACT.test(line.trim()))
    .join("\n");
}

/**
 * fixBrokenTables — some source files repeat the `| --- |` separator row
 * after every data row instead of once after the header, which isn't valid
 * GFM table syntax. Drops every separator row except the first one per table.
 */
function fixBrokenTables(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const isSeparator = TABLE_SEPARATOR.test(trimmed);
    const isRow = TABLE_ROW.test(trimmed);

    if (isSeparator) {
      if (!inTable) {
        result.push(line);
        inTable = true;
      }
      continue;
    }

    if (!isRow) {
      inTable = false;
    }
    result.push(line);
  }

  return result.join("\n");
}

const CODE_START =
  /^(npm |npx |yarn |pnpm |git |cd |import |export |const |let |var |function|class |interface |type |return |if\(|if \(|for\(|for \(|while\(|@tailwind|@apply|@media|@import|<[a-zA-Z!/]|\{|\}|\/\/|\/\*|\*\/)/;
const CSS_DECL = /^[a-zA-Z-]+\s*:\s*[^:]+;$/;
const JSON_PROP = /^"[\w-]+"\s*:\s*.+,?$/;
// A lone language name on its own line is a stripped-out ```lang fence marker.
const LANGUAGE_TAG = /^(json|js|javascript|jsx|ts|typescript|tsx|html|css|scss|bash|sh|shell|python|php|sql|yaml|yml|graphql)$/i;

/**
 * isCodeLine — heuristic: does this line look like code rather than prose?
 * Used to pull inline code lines (never wrapped in fences in the source
 * files) out of an answer into its own codeSnippet field.
 */
function isCodeLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  // A long line ending in a period, even one that opens with a code-like
  // token (e.g. "npx create-next-app offers Tailwind setup..., or add it
  // manually: ..."), is a run-on sentence describing code, not code itself.
  if (trimmed.length > 100 && /\.$/.test(trimmed)) return false;
  if (LANGUAGE_TAG.test(trimmed)) return true;
  if (CODE_START.test(trimmed) || CSS_DECL.test(trimmed) || JSON_PROP.test(trimmed)) return true;
  if (/[;{}]$/.test(trimmed) && !/[.!?]$/.test(trimmed)) return true;
  return false;
}

/**
 * extractCode — splits an answer's text into prose and code, grouping
 * consecutive bare code-like lines into a codeSnippet block. Lines inside a
 * real ``` fence are never touched by the heuristic — they stay in `text`
 * verbatim so `marked` renders them as a proper code block on its own.
 */
function extractCode(answer: string): { text: string; code: string | null } {
  const lines = answer.split("\n");

  const inFence: boolean[] = [];
  let fenced = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence.push(true);
      fenced = !fenced;
    } else {
      inFence.push(fenced);
    }
  }

  const textLines: string[] = [];
  const codeBlocks: string[] = [];
  let buffer: string[] = [];
  let bufferIsCode = false;

  function flush() {
    if (buffer.length === 0) return;
    if (bufferIsCode) {
      codeBlocks.push(buffer.join("\n"));
    } else {
      textLines.push(...buffer);
    }
    buffer = [];
  }

  lines.forEach((line, i) => {
    const code = inFence[i] ? false : isCodeLine(line);
    if (buffer.length === 0) {
      bufferIsCode = code;
      buffer.push(line);
    } else if (code === bufferIsCode) {
      buffer.push(line);
    } else {
      flush();
      bufferIsCode = code;
      buffer.push(line);
    }
  });
  flush();

  return {
    text: textLines.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
    code: codeBlocks.length ? codeBlocks.join("\n\n").trim() : null,
  };
}

/**
 * splitIntoSections — breaks a file's markdown into (section name, body text)
 * chunks based on `# ` headings. The very first heading usually merges the
 * file's title with its first section name (e.g. "React Interview PrepReact
 * Fundamentals"), so that one gets special-cased. Files with no `# `
 * headings at all come back as a single section with section = null.
 */
function splitIntoSections(markdown: string): { section: string | null; body: string }[] {
  const lines = markdown.split("\n");
  const sections: { section: string | null; body: string }[] = [];
  let currentSection: string | null = null;
  let currentLines: string[] = [];
  let seenFirstHeading = false;

  function flush() {
    if (currentLines.length > 0) {
      sections.push({ section: currentSection, body: currentLines.join("\n") });
    }
    currentLines = [];
  }

  for (const line of lines) {
    const headingMatch = line.match(SECTION_HEADING);
    if (headingMatch) {
      flush();
      const heading = headingMatch[1].trim();
      if (!seenFirstHeading) {
        seenFirstHeading = true;
        const titleMatch = heading.match(TITLE_PREFIX);
        if (titleMatch && titleMatch[2].trim()) {
          currentSection = titleMatch[2].trim();
        } else {
          // Doesn't match the "Title Interview PrepSection" merged-line
          // pattern the original 10 files used — this heading is a real,
          // standalone section name in its own right (e.g. "Jest — Interview
          // Q&A"), so use it directly instead of discarding it as null.
          currentSection = heading.replace(INTERVIEW_QNA_SUFFIX, "").trim() || null;
        }
      } else {
        currentSection = heading.replace(INTERVIEW_QNA_SUFFIX, "").trim() || heading;
      }
      continue;
    }
    currentLines.push(line);
  }
  flush();

  if (sections.length === 0) {
    return [{ section: null, body: markdown }];
  }
  return sections;
}

/**
 * parseQuestionsFromSection — splits one section's body into individual
 * Q&A entries on `**N. question**` markers. Any text before the first
 * marker (e.g. a leftover title line) is discarded.
 */
function parseQuestionsFromSection(body: string): { question: string; answer: string }[] {
  const lines = body.split("\n");
  const entries: { question: string; answer: string }[] = [];
  let currentQuestion: string | null = null;
  let currentLines: string[] = [];

  function flush() {
    if (currentQuestion !== null) {
      entries.push({
        question: currentQuestion,
        answer: currentLines.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
      });
    }
    currentLines = [];
  }

  for (const line of lines) {
    const question = matchQuestionMarker(line.trim());
    if (question !== null) {
      flush();
      currentQuestion = question;
      continue;
    }
    if (currentQuestion !== null) {
      currentLines.push(line);
    }
  }
  flush();

  return entries;
}

/**
 * parseDesignPrinciples — fallback parser for files with no numbered
 * question markers at all (currently just design-principles.md): treats
 * each bold-led paragraph as its own question/answer pair.
 */
function parseBoldLedParagraphs(body: string): { question: string; answer: string }[] {
  const blocks = body.split(/\n\s*\n/);
  const entries: { question: string; answer: string }[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^\*\*(.+?)\*\*:?\s*([\s\S]*)$/);
    if (match) {
      entries.push({ question: match[1].trim(), answer: match[2].trim() || match[1].trim() });
    } else if (entries.length > 0) {
      entries[entries.length - 1].answer += `\n\n${trimmed}`;
    }
  }

  return entries;
}

/**
 * parseMarkdownFile — full pipeline: clean up known source artifacts, split
 * into sections, split each section into Q&A entries, then pull code lines
 * out of each answer into their own field.
 * Args: rawMarkdown (string) — a content/interview-practice/*.md file's contents.
 * Returns: ParsedQuestion[].
 */
export function parseMarkdownFile(rawMarkdown: string): ParsedQuestion[] {
  const cleaned = dedentLines(fixBrokenTables(stripPageArtifacts(decodeHtmlEntities(unescapeMarkdown(rawMarkdown)))));
  const sections = splitIntoSections(cleaned);

  const results: ParsedQuestion[] = [];
  for (const { section, body } of sections) {
    let entries = parseQuestionsFromSection(body);
    if (entries.length === 0) {
      entries = parseBoldLedParagraphs(body);
    }
    for (const entry of entries) {
      const { text, code } = extractCode(entry.answer);
      results.push({ section, question: entry.question, answer: text, codeSnippet: code });
    }
  }
  return results;
}
