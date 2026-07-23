"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";
import { useInterviewTopics } from "../hooks/useInterviewTopics";
import { useCreateTopic } from "../hooks/useCreateTopic";
import { useUpdateTopic } from "../hooks/useUpdateTopic";
import { useDeleteTopic } from "../hooks/useDeleteTopic";
import type { Topic } from "../interviewTopics.client";

/**
 * TopicsManager — lists all topics with inline edit/delete, plus a form to
 * add a new one. Deleting a topic cascades to delete its questions too.
 * Args: none. Returns: add-topic form + topic list JSX.
 */
export default function TopicsManager() {
  const { data: topics, isPending, isError, error } = useInterviewTopics();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { mutate: createTopic, isPending: isCreating, error: createError } = useCreateTopic();
  const { mutate: updateTopic, isPending: isSaving } = useUpdateTopic();
  const { mutate: deleteTopic, isPending: isDeleting } = useDeleteTopic();

  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  function handleTitleChange(value: string) {
    setNewTitle(value);
    if (!slugTouched) {
      setNewSlug(slugify(value));
    }
  }

  function handleCreate() {
    createTopic(
      { title: newTitle, slug: newSlug },
      {
        onSuccess: () => {
          setNewTitle("");
          setNewSlug("");
          setSlugTouched(false);
        },
      }
    );
  }

  function handleDelete(topic: Topic) {
    const questionCount = topic._count?.questions ?? 0;
    const warning =
      questionCount > 0
        ? `Delete "${topic.title}"? This will also delete its ${questionCount} question(s). This can't be undone.`
        : `Delete "${topic.title}"? This can't be undone.`;
    if (window.confirm(warning)) {
      deleteTopic(topic.id);
    }
  }

  if (isPending) return <p className="text-gray-500 mt-4">Loading...</p>;
  if (isError) return <p className="text-red-500 mt-4">{(error as Error).message}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="interview-question">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 text-sm">
            <span>Title</span>
            <input
              value={newTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="border px-2 py-1 w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Slug</span>
            <input
              value={newSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setNewSlug(e.target.value);
              }}
              className="border px-2 py-1 w-full font-mono text-sm"
            />
          </label>

          {createError && <p className="text-red-500 text-sm">{(createError as Error).message}</p>}

          <div>
            <button
              type="button"
              disabled={isCreating || !newTitle.trim() || !newSlug.trim()}
              onClick={handleCreate}
              className="border px-3 py-1 disabled:opacity-40"
            >
              {isCreating ? "Adding..." : "Add topic"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {topics.map((topic) => (
          <TopicRow
            key={topic.id}
            topic={topic}
            isEditing={editingId === topic.id}
            isSaving={isSaving}
            isDeleting={isDeleting}
            onEdit={() => setEditingId(topic.id)}
            onCancel={() => setEditingId(null)}
            onSave={(data) =>
              updateTopic({ id: topic.id, data }, { onSuccess: () => setEditingId(null) })
            }
            onDelete={() => handleDelete(topic)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * TopicRow — one topic, either rendered read-only or as an edit form.
 * Args: topic, isEditing/isSaving/isDeleting flags, and edit/save/cancel/delete callbacks.
 * Returns: row JSX.
 */
function TopicRow({
  topic,
  isEditing,
  isSaving,
  isDeleting,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: {
  topic: Topic;
  isEditing: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (data: { title: string; slug: string }) => void;
  onDelete: () => void;
}) {
  const [title, setTitle] = useState(topic.title);
  const [slug, setSlug] = useState(topic.slug);

  if (isEditing) {
    return (
      <div className="interview-question">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 text-sm">
            <span>Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-2 py-1 w-full"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Slug</span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border px-2 py-1 w-full font-mono text-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => onSave({ title, slug })}
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

  return (
    <div className="interview-question">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-medium">{topic.title}</p>
          <p className="text-sm text-gray-500">
            /practice/{topic.slug} &middot; {topic._count?.questions ?? 0} question(s)
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
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
    </div>
  );
}
