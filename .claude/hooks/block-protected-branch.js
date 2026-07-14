#!/usr/bin/env node
// PreToolUse hook (Bash) — blocks Claude from merging PRs or pushing
// directly to master/main. Wired up in .claude/settings.json under
// hooks.PreToolUse. See README.md in this folder for details.

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input);
    const command = (payload.tool_input && payload.tool_input.command) || "";

    const isPrMerge = /(^|[;&|])\s*gh\s+pr\s+merge\b/i.test(command);
    const isPushToProtectedBranch =
      /(^|[;&|])\s*git\s+push\b/i.test(command) &&
      /\b(origin\/)?(master|main)\b/i.test(command);

    if (isPrMerge || isPushToProtectedBranch) {
      const reason = isPrMerge
        ? "Blocked: gh pr merge requires the user to run it themselves, not Claude."
        : "Blocked: pushing directly to master or main requires the user to run it themselves, not Claude.";

      console.log(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: reason,
          },
        })
      );
    }
  } catch {
    // Malformed input — fail open, don't block.
  }
});
