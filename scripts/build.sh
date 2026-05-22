#!/bin/bash
# Build the production dist/ folder for the Alexela 2024 annual report.
#
# Steps:
#   1. Clean dist/
#   2. Build minified CSS via PostCSS
#   3. rsync everything that's needed at runtime into dist/, excluding sources,
#      tooling, and dotfiles
#   4. Print a short summary
#
# Run via `npm run build` (preferred) or directly: `bash scripts/build.sh`.
# Requires rsync (preinstalled on macOS and most Linux distros).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

DIST="dist"

echo "[build] Cleaning $DIST/..."
rm -rf "$DIST"
mkdir -p "$DIST"

echo "[build] Compiling CSS (minified)..."
npm run css:build > /dev/null

echo "[build] Copying production files into $DIST/..."
# Anchored excludes (leading slash) only match at the repo root, so a hypothetical
# nested directory called e.g. img/src/ would still be copied. Patterns without a
# leading slash (.DS_Store, *.log) match anywhere.
rsync -a \
  --exclude="/dist/" \
  --exclude="/node_modules/" \
  --exclude="/src/" \
  --exclude="/scripts/" \
  --exclude="/.git/" \
  --exclude="/.github/" \
  --exclude="/.vscode/" \
  --exclude="/.claude/" \
  --exclude="/.gitignore" \
  --exclude="/.gitattributes" \
  --exclude="/package.json" \
  --exclude="/package-lock.json" \
  --exclude="/postcss.config.js" \
  --exclude="/bs-config.cjs" \
  --exclude="/CLAUDE.md" \
  --exclude="/README.md" \
  --exclude="/LICENSE" \
  --exclude="/test_accordion.html" \
  --exclude="/raw-material-*" \
  --exclude=".DS_Store" \
  --exclude="*.log" \
  --exclude="main copy.js" \
  ./ "$DIST/"

FILES=$(find "$DIST" -type f | wc -l | tr -d ' ')
SIZE=$(du -sh "$DIST" | cut -f1)

echo ""
echo "[build] Done."
echo "  output: $DIST/"
echo "  files:  $FILES"
echo "  size:   $SIZE"
