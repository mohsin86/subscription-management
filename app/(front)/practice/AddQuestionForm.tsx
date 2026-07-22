"use client";

import { useState } from "react";
import { INTERVIEW_PRACTICE_TOPICS } from "@/lib/interview-practice";
import { useCreateInterviewQuestion } from "./hooks/useCreateInterviewQuestion";
import AnswerEditor from "./AnswerEditor";
import { handleTabIndent } from "./handleTabIndent";

/**
 * AddQuestionForm — owner-only form for adding a new interview question to
 * any topic, with a topic dropdown since this lives on the un-scoped menu page.
 * Args: none. Returns: a toggle button that expands into the form.
 */
export default function AddQuestionForm() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(INTERVIEW_PRACTICE_TOPICS[0].title);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const { mutate: createQuestion, isPending, error } = useCreateInterviewQuestion();

  function handleSubmit() {
    createQuestion(
      { category, question, answer, codeSnippet },
      {
        onSuccess: () => {
          setQuestion("");
          setAnswer("");
          setCodeSnippet("");
          setOpen(false);
        },
      }
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-6 border px-3 py-1 text-sm">
        + Add question
      </button>
    );
  }

  return (
    <div className="interview-question mt-6">
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-sm">
          <span>Topic</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-2 py-1 w-full"
          >
            {INTERVIEW_PRACTICE_TOPICS.map((topic) => (
              <option key={topic.slug} value={topic.title}>
                {topic.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>Question</span>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>Answer</span>
          <AnswerEditor content={answer} onChange={setAnswer} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>Code (optional)</span>
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            onKeyDown={(e) => handleTabIndent(e, setCodeSnippet)}
            rows={4}
            className="border px-2 py-1 w-full font-mono text-sm"
          />
        </label>

        {error && <p className="text-red-500 text-sm">{(error as Error).message}</p>}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isPending || !question.trim() || !answer.trim()}
            onClick={handleSubmit}
            className="border px-3 py-1 disabled:opacity-40"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="border px-3 py-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
