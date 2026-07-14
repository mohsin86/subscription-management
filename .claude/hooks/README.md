# hooks/

Scripts wired up in `.claude/settings.json` under `hooks.*`, run by Claude Code at specific
points in its lifecycle (e.g. before a tool executes).

## block-protected-branch.js

A `PreToolUse` hook on the `Bash` tool. Stops Claude from merging pull requests or pushing
straight to `master`/`main` without you doing it yourself.

**Blocked:**
- `gh pr merge` — any PR, any flags
- `git push` when the command targets `master` or `main`

**Still allowed:**
- `gh pr create`, `gh pr view`, `gh pr list`
- `git push` to any other branch (feature branches work as normal)

**Why:** added after a scare where it looked like Claude had merged a PR without asking. The hook
blocks the action outright (it runs before the tool executes, and overrides permission
allow-lists), so it doesn't depend on Claude remembering an instruction.

**To change or remove it:** edit `block-protected-branch.js`, or the `hooks.PreToolUse` entry in
`.claude/settings.json`, or ask Claude to update it.
