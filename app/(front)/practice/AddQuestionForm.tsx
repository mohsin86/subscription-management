"use client";

import { useState } from "react";
import { useInterviewTopics } from "./hooks/useInterviewTopics";
import { useCreateInterviewQuestion } from "./hooks/useCreateInterviewQuestion";
import AnswerEditor from "./AnswerEditor";
import { handleTabIndent } from "./handleTabIndent";

/**
 * AddQuestionForm — owner-only form for adding a new interview question to
 * any topic, with a topic dropdown since it isn't scoped to a single topic page.
 * Args: none. Returns: form JSX.
 */
export default function AddQuestionForm() {
  const { data: topics, isPending: topicsPending } = useInterviewTopics();
  const [topicId, setTopicId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const { mutate: createQuestion, isPending, error } = useCreateInterviewQuestion();

  const selectedTopicId = topicId || topics?.[0]?.id || "";

  function handleSubmit() {
    createQuestion(
      { topicId: selectedTopicId, question, answer, codeSnippet },
      {
        onSuccess: () => {
          setQuestion("");
          setAnswer("");
          setCodeSnippet("");
        },
      }
    );
  }

  return (
    <div className="interview-question">
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-sm">
          <span>Topic</span>
          <select
            value={selectedTopicId}
            onChange={(e) => setTopicId(e.target.value)}
            disabled={topicsPending}
            className="border px-2 py-1 w-full"
          >
            {topics?.map((topic) => (
              <option key={topic.id} value={topic.id}>
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

        <div>
          <button
            type="button"
            disabled={isPending || !selectedTopicId || !question.trim() || !answer.trim()}
            onClick={handleSubmit}
            className="border px-3 py-1 disabled:opacity-40"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
