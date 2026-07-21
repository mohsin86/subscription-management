"use client";

import { useState } from "react";
import { marked } from "marked";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { useInterviewQuestions } from "../hooks/useInterviewQuestions";
import { useUpdateInterviewQuestion } from "../hooks/useUpdateInterviewQuestion";
import { useDeleteInterviewQuestion } from "../hooks/useDeleteInterviewQuestion";
import AnswerEditor from "../AnswerEditor";
import type { InterviewQuestion } from "../interviewQuestions.client";

/**
 * InterviewQuestionsList — fetches and renders a category's questions, grouped
 * by section, each numbered by its position in the overall list. Editing
 * (raw markdown) and deleting are only available when isOwner is true.
 * Args: categoryTitle (string) — the category to fetch/display.
 * Args: isOwner (boolean) — whether to show Edit/Delete controls.
 * Returns: grouped, numbered question list JSX.
 */
export default function InterviewQuestionsList({
  categoryTitle,
  isOwner,
}: {
  categoryTitle: string;
  isOwner: boolean;
}) {
  const { data: questions, isPending, isError, error } = useInterviewQuestions(categoryTitle);
  const { mutate: updateQuestion, isPending: isSaving } = useUpdateInterviewQuestion(categoryTitle);
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteInterviewQuestion(categoryTitle);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

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
                isOwner={isOwner}
                isEditing={editingId === q.id}
                isSaving={isSaving}
                isDeleting={isDeleting}
                isExpanded={expandedIds.has(q.id)}
                onToggleExpand={() => toggleExpanded(q.id)}
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
 * Args: number (running index), question, isOwner (shows Edit/Delete when true),
 * isEditing/isSaving/isDeleting flags, and edit/save/cancel/delete callbacks.
 * Returns: card JSX.
 */
function QuestionCard({
  number,
  question,
  isOwner,
  isEditing,
  isSaving,
  isDeleting,
  isExpanded,
  onToggleExpand,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: {
  number: number;
  question: InterviewQuestion;
  isOwner: boolean;
  isEditing: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (data: { question: string; answer: string; codeSnippet?: string }) => void;
  onDelete: () => void;
}) {
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const [codeText, setCodeText] = useState(question.codeSnippet ?? "");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(question.question);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (isEditing) {
    return (
      <div className="interview-question">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 text-sm">
            <span>Question</span>
            <input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="border px-2 py-1 w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Answer</span>
            <AnswerEditor content={answerText} onChange={setAnswerText} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Code (optional)</span>
            <textarea
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
              rows={4}
              className="border px-2 py-1 w-full font-mono text-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2">
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

  const questionHtml = marked.parseInline(`${number}. ${question.question}`) as string;
  const answerHtml = question.answer ?? "";
  const codeHtml = question.codeSnippet
    ? (marked.parse("```\n" + question.codeSnippet + "\n```") as string)
    : null;

  return (
    <div className="interview-question">
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex-1">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={`answer-${question.id}`}
            onClick={onToggleExpand}
            className="flex w-full items-start gap-2 text-left"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 shrink-0 mt-1" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 mt-1" />
            )}
            <span dangerouslySetInnerHTML={{ __html: questionHtml }} />
          </button>
        </h3>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy question text"
            title="Copy question text"
            className="border px-2 py-1 text-sm"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          {isOwner && (
            <>
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
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div id={`answer-${question.id}`} className="mt-2">
          {answerHtml && <div dangerouslySetInnerHTML={{ __html: answerHtml }} />}
          {codeHtml && <div dangerouslySetInnerHTML={{ __html: codeHtml }} />}
        </div>
      )}
    </div>
  );
}
