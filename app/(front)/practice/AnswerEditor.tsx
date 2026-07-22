"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import { Bold, Italic, List, ListOrdered, Code, Link2, Table2, Rows3, Columns3 } from "lucide-react";

const INDENT = "  ";

/**
 * TabIndent — fallback Tab/Shift-Tab handling for plain paragraph text.
 * StarterKit's list extension already binds Tab/Shift-Tab to sink/lift a
 * list item, and the table extension binds them to cell navigation; those
 * run first and return false when not applicable (cursor not in a list or
 * table), which is when this extension's turn comes up. Uses non-breaking
 * spaces instead of regular ones — regular spaces collapse to a single
 * visible space under HTML's default whitespace rules, both live in the
 * editor and later in the saved read-only view, which would make a
 * two-space indent look like it did nothing.
 */
const TabIndent = Extension.create({
  name: "tabIndent",
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.insertContent(INDENT),
      "Shift-Tab": () => {
        const { from } = this.editor.state.selection;
        const doc = this.editor.state.doc;
        if (doc.textBetween(Math.max(0, from - INDENT.length), from) === INDENT) {
          return this.editor.chain().deleteRange({ from: from - INDENT.length, to: from }).run();
        }
        if (doc.textBetween(Math.max(0, from - 1), from) === " ") {
          return this.editor.chain().deleteRange({ from: from - 1, to: from }).run();
        }
        return false;
      },
    };
  },
});

/**
 * AnswerEditor — WYSIWYG editor for a question's answer, backed by Tiptap.
 * Renders its content with the same `interview-content` class used to render
 * the saved answer, so formatting looks identical while editing and after
 * saving. Emits HTML (not Markdown) via onChange.
 * Args: content (initial HTML string), onChange (fires with the latest HTML on every edit).
 * Returns: toolbar + editable area JSX.
 */
export default function AnswerEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      // Tiptap builds each extension's keymap plugin in *reverse* list order,
      // so an extension listed earlier here is tried later at runtime. Listing
      // TabIndent first means StarterKit's list-sink and TableKit's cell-nav
      // Tab bindings get first refusal, and TabIndent only fires as the
      // fallback when neither of those applies.
      TabIndent,
      StarterKit.configure({ heading: false, codeBlock: false }),
      Link.configure({ openOnClick: false }),
      TableKit,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "interview-content answer-editor-content" },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="answer-editor-shell">
      <div className="answer-editor-toolbar">
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

/**
 * Toolbar — formatting buttons for AnswerEditor, wired to Tiptap commands.
 * Args: editor (Tiptap Editor instance). Returns: button row JSX.
 */
function Toolbar({ editor }: { editor: Editor }) {
  const inTable = editor.isActive("table");

  return (
    <div className="flex flex-wrap gap-1">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        onClick={() => {
          const url = window.prompt("URL");
          if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }
        }}
      >
        <Link2 className="h-4 w-4" />
      </ToolbarButton>

      {inTable ? (
        <>
          <ToolbarButton
            label="Add row"
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            <Rows3 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Add column"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            <Columns3 className="h-4 w-4" />
          </ToolbarButton>
        </>
      ) : (
        <ToolbarButton
          label="Insert table"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <Table2 className="h-4 w-4" />
        </ToolbarButton>
      )}
    </div>
  );
}

/**
 * ToolbarButton — single icon button for the AnswerEditor toolbar.
 * Args: label (title/aria-label), active (toggled-on state), onClick, children (icon).
 * Returns: button JSX.
 */
function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`border px-2 py-1 ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}
