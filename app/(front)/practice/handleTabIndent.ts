import type { KeyboardEvent } from "react";

/**
 * handleTabIndent — makes Tab insert two spaces at the cursor instead of the
 * browser's default of moving focus to the next element, so code snippets
 * can be indented directly in a plain <textarea>. Shift+Tab is left alone.
 * Args: e (textarea keydown event), setValue (state setter for the textarea's value).
 * Returns: void; calls e.preventDefault() and setValue() when Tab is pressed.
 */
export function handleTabIndent(
  e: KeyboardEvent<HTMLTextAreaElement>,
  setValue: (value: string) => void
) {
  if (e.key !== "Tab" || e.shiftKey) return;
  e.preventDefault();

  const target = e.currentTarget;
  const { selectionStart, selectionEnd, value } = target;
  const next = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
  setValue(next);

  requestAnimationFrame(() => {
    target.selectionStart = target.selectionEnd = selectionStart + 2;
  });
}
