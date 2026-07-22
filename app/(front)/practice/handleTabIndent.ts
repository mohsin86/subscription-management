import type { KeyboardEvent } from "react";

const INDENT = "  ";

/**
 * handleTabIndent — code-editor-style Tab/Shift+Tab for a plain <textarea>,
 * instead of the browser's default of moving focus to the next element.
 * Tab with no selection inserts two spaces at the cursor. Tab with a
 * selection (or Shift+Tab, selection or not) indents/dedents every full
 * line the selection touches, matching standard code-editor behavior.
 * Args: e (textarea keydown event), setValue (state setter for the textarea's value).
 * Returns: void; calls e.preventDefault() and setValue() when Tab is pressed.
 */
export function handleTabIndent(
  e: KeyboardEvent<HTMLTextAreaElement>,
  setValue: (value: string) => void
) {
  if (e.key !== "Tab") return;
  e.preventDefault();

  const target = e.currentTarget;
  const { selectionStart, selectionEnd, value } = target;
  const hasSelection = selectionStart !== selectionEnd;

  if (!e.shiftKey && !hasSelection) {
    const next = value.slice(0, selectionStart) + INDENT + value.slice(selectionEnd);
    setValue(next);
    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = selectionStart + INDENT.length;
    });
    return;
  }

  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const nextNewline = value.indexOf("\n", selectionEnd);
  const lineEnd = nextNewline === -1 ? value.length : nextNewline;

  const lines = value.slice(lineStart, lineEnd).split("\n");
  let startDelta = 0;
  let endDelta = 0;

  const newLines = lines.map((line, i) => {
    if (e.shiftKey) {
      const removed = line.match(/^ {1,2}/)?.[0].length ?? 0;
      if (i === 0) startDelta = -removed;
      endDelta -= removed;
      return line.slice(removed);
    }
    if (i === 0) startDelta = INDENT.length;
    endDelta += INDENT.length;
    return INDENT + line;
  });

  const next = value.slice(0, lineStart) + newLines.join("\n") + value.slice(lineEnd);
  setValue(next);

  requestAnimationFrame(() => {
    target.selectionStart = Math.max(lineStart, selectionStart + startDelta);
    target.selectionEnd = selectionEnd + endDelta;
  });
}
