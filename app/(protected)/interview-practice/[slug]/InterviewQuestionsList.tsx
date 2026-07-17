"use client";

import { useState } from "react";
import { marked } from "marked";
import { useInterviewQuestions } from "./hooks/useInterviewQuestions";
import { useUpdateInterviewQuestion } from "./hooks/useUpdateInterviewQuestion";
import { useDeleteInterviewQuestion } from "./hooks/useDeleteInterviewQuestion";
import type { InterviewQuestion } from "./interviewQuestions.client";

/**
 * InterviewQuestionsList — fetches and renders a category's questions, grouped
 * by section, each numbered by its position in the overall list. Supports
 * editing (raw markdown) and deleting a question in place.
 * Args: categoryTitle (string) — the category to fetch/display.
 * Returns: grouped, numbered, editable question list JSX.
 */
export default function InterviewQuestionsList({ categoryTitle }: { categoryTitle: string }) {
  const { data: questions, isPending, isError, error } = useInterviewQuestions(categoryTitle);
  const { mutate: updateQuestion, isPending: isSaving } = useUpdateInterviewQuestion(categoryTitle);
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteInterviewQuestion(categoryTitle);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (isPending) return <p className="text-gray-500 mt-4">Loading...</p>;
  if (isError) return <p className="text-red-500 mt-4">{(error as Error).message}</p>;

  const sections: { name: string | null; entries: InterviewQuestion[] }[] = [];
  for (const q of questions) {
    const last = sections[sections.length - 1];
    if (last && last.name === q.section) {
      last.entries.push(q);
    } else {
      sections.push({ name: q.section, entries: [q] });
    }
  }

  let runningNumber = 0;

  function handleDelete(id: string) {
    if (window.confirm("Delete this question? This can't be undone.")) {
      deleteQuestion(id);
    }
  }

  return (
    <div className="interview-content mt-4">
      <h1>{categoryTitle}</h1>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.name && <h2>{section.name}</h2>}

          {section.entries.map((q) => {
            runningNumber += 1;
            return (
              <QuestionCard
                key={q.id}
                number={runningNumber}
                question={q}
                isEditing={editingId === q.id}
                isSaving={isSaving}
                isDeleting={isDeleting}
                onEdit={() => setEditingId(q.id)}
                onCancel={() => setEditingId(null)}
                onSave={(data) =>
                  updateQuestion({ id: q.id, data }, { onSuccess: () => setEditingId(null) })
                }
                onDelete={() => handleDelete(q.id)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/**
 * QuestionCard — one question, either rendered as HTML or as an edit form.
 * Args: number (running index), question, isEditing/isSaving/isDeleting flags, and edit/save/cancel/delete callbacks.
 * Returns: card JSX.
 */
function QuestionCard({
  number,
  question,
  isEditing,
  isSaving,
  isDeleting,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: {
  number: number;
  question: InterviewQuestion;
  isEditing: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (data: { question: string; answer: string; codeSnippet?: string }) => void;
  onDelete: () => void;
}) {
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const [codeText, setCodeText] = useState(question.codeSnippet ?? "");

  if (isEditing) {
    return (
      <div className="interview-question">
        <div className="flex flex-col gap-2">
          <label>
            Question
            <input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="border px-2 py-1 w-full"
            />
          </label>
          <label>
            Answer
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              rows={6}
              className="border px-2 py-1 w-full font-mono text-sm"
            />
          </label>
          <label>
            Code (optional)
            <textarea
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
              rows={4}
              className="border px-2 py-1 w-full font-mono text-sm"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={() =>
                onSave({ question: questionText, answer: answerText, codeSnippet: codeText })
              }
              className="border px-3 py-1"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onCancel} className="border px-3 py-1">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questionHtml = marked.parse(`${number}. ${question.question}`) as string;
  const answerHtml = question.answer ? (marked.parse(question.answer) as string) : "";
  const codeHtml = question.codeSnippet
    ? (marked.parse("```\n" + question.codeSnippet + "\n```") as string)
    : null;

  return (
    <div className="interview-question">
      <h3 dangerouslySetInnerHTML={{ __html: questionHtml }} />
      {answerHtml && <div dangerouslySetInnerHTML={{ __html: answerHtml }} />}
      {codeHtml && <div dangerouslySetInnerHTML={{ __html: codeHtml }} />}

      <div className="flex gap-2 mt-2">
        <button type="button" onClick={onEdit} className="border px-2 py-1 text-sm">
          Edit
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={onDelete}
          className="border px-2 py-1 text-sm disabled:opacity-40"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
