#!/bin/bash
# Auto-rebuild CSS when any file under src/ ending in .css is edited.
# Reads the Claude Code tool-event JSON from stdin and extracts file_path.
# Runs `npm run css:build` silently. Exit 0 either way — never block the edit.

set -u

FILE=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [[ "$FILE" == *"/src/"*".css" ]] || [[ "$FILE" == "src/"*".css" ]]; then
  # Run from project root (one level up from .claude/hooks/)
  cd "$(dirname "$0")/../.." || exit 0
  npm run css:build >/dev/null 2>&1 || true
fi

exit 0
