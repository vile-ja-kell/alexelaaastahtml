#!/bin/bash
# Auto-normalize HTML files to Unicode NFC form after Claude edits them.
#
# Why: paste-from-PDF or paste-via-macOS-clipboard often introduces decomposed
# Unicode (e.g. "u" + U+0308 combining diaeresis instead of precomposed ü).
# W3C Validator flags this as "Text run is not in Unicode Normalization Form C".
#
# Reads the Claude Code tool-event JSON from stdin and extracts file_path via jq.
# Only runs on .html files. Silent on success. Never blocks the edit (exit 0).

set -u

FILE=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [[ "$FILE" == *.html ]] && [[ -f "$FILE" ]]; then
  # Use Python's unicodedata.normalize('NFC', ...). Silent if no change.
  python3 - "$FILE" <<'PY' 2>/dev/null
import sys, unicodedata
path = sys.argv[1]
with open(path, "r", encoding="utf-8") as f:
    s = f.read()
n = unicodedata.normalize("NFC", s)
if s != n:
    with open(path, "w", encoding="utf-8") as f:
        f.write(n)
PY
fi

exit 0
