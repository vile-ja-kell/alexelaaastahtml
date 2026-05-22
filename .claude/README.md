# `.claude/` — What's in here and why

This directory configures how Claude Code behaves in this repository. None of it is required to build or run the site — it's purely about making Claude (the AI assistant) more useful and less error-prone when working on the Alexela annual report.

If you're a human reading this, here's the inventory.

---

## `CLAUDE.md` (at the repo root, not here)

The top-level instructions Claude reads at the start of every session. Short, points at the skills below, lists the ET/EN page mapping, and reminds Claude not to edit compiled CSS by hand.

**Why**: without this, Claude relearns the project conventions every conversation and sometimes guesses wrong.

---

## `.claude/settings.json` — Project settings & hooks

Currently configures one **PostToolUse hook**: after any `Edit`, `Write`, or `MultiEdit` tool call, Claude runs `.claude/hooks/build-css.sh`.

**Why**: I kept editing CSS in `src/partials/*.css` and forgetting to run `npm run css:build`, then wondered why the browser showed nothing. The hook script checks whether the edited file was under `src/` and ends in `.css`; if yes, it silently runs the build. Otherwise it's a no-op.

The hook is hands-off — you don't need to remember it.

---

## `.claude/settings.local.json` — Local permission overrides

Pre-existing. Allows `grep`, `rg`, `pdftotext`, `find`, `sed` without asking. Personal to this machine; gitignored. Leave it alone.

---

## `.claude/hooks/build-css.sh`

The shell script that backs the hook above. Reads the JSON Claude sends on stdin, extracts the `file_path` field with `jq`, checks if it's a `src/**/*.css` file, and if so runs `npm run css:build`. Silent on success, never blocks the edit.

**Why a script and not an inline command**: easier to read, doesn't break the JSON in `settings.json`, and can be debugged on its own (`echo '{"tool_input":{"file_path":"src/style.css"}}' | .claude/hooks/build-css.sh`).

---

## `.claude/skills/et-en-parity/SKILL.md`

A "skill" — a chunk of expertise Claude loads automatically based on the trigger phrases in the skill's `description:` field. This one loads whenever Claude touches a root `.html` file or anything in `en/`.

**Why**: the five most recent commits before this setup were *all* bilingual parity fixes — language switcher, map legends, etc. Estonian root pages and their English counterparts in `en/` have *different filenames* (e.g. `arisuunad.html` ↔ `en/business-lines.html`), so without an explicit mapping Claude either ignores the parity requirement or pairs the wrong files.

The skill contains:
- The full ET ↔ EN page mapping table
- What must be mirrored (structure, classes, IDs, assets)
- What must differ (visible text, `<html lang>`, link hrefs)
- A short workflow for editing one side
- Common drift sources from history (SVG `<text>` nodes, language switcher hrefs)

---

## `.claude/skills/project-conventions/SKILL.md`

Same format as above, but marked `user-invocable: false` — meaning *I* can't trigger it manually with `/project-conventions`; it just loads in the background whenever Claude is working in this repo.

**Why**: the existing `README.md` documents the BEM-style section/block class taxonomy (`section--content`, `image-text-content-block block--image-right`, etc.), but Claude only reads `README.md` if it happens to. The skill formalizes this into something Claude reliably consults: which CSS partials exist, what the PostCSS pipeline does, how `main.js` is structured, and what *not* to do (no framework, no bundler, no editing `css/style.css` directly).

---

## `.claude/agents/et-en-parity-reviewer.md`

A "subagent" — a specialist Claude instance with a tight system prompt. When the main Claude is told "audit parity on index.html" (or after a big bilingual edit), it can spawn this subagent in parallel. The subagent reads both files in a pair, checks 11 specific things (section counts, IDs, asset paths, language switcher hrefs, untranslated leftovers on the EN side, SVG `<text>` nodes…), and returns a structured punch list.

**Why a subagent rather than just asking the main Claude**: the parity audit is repetitive and long, and the subagent runs in its own context so it doesn't pollute the main conversation with hundreds of lines of HTML quotes. The main Claude gets back a clean report and decides what to fix.

It's read-only — it never edits files.

---

## What was *deleted* in the same setup pass

- **`main copy.js`** (at the repo root). A stale older copy of `main.js`, 35 lines shorter, that had been sitting there since July. Removed so nobody (human or Claude) edits it by mistake.

---

## What was *not* set up, and why

- **Playwright MCP server**: recommended but not installed. Would let Claude drive a real browser to verify ET/EN interactive elements (accordion, tabs, mobile menu). Adds an external dependency and an MCP setup step — left for you to decide. Install with `claude mcp add playwright -- npx -y @playwright/mcp@latest` if you want it.
- **context7 MCP**: recommended for live PostCSS docs. Same reason as above — opt-in.
- **A "block edit" hook for `main copy.js`**: since the file is now deleted, this is unnecessary.

---

## Dev server (BrowserSync)

Added in a follow-up to the initial setup. The previous workflow relied on VS Code's Live Server extension (port 5502), which serves files but doesn't watch the PostCSS rebuild step, so CSS edits sometimes appeared not to apply.

**New commands:**
- `npm run dev` — starts PostCSS in watch mode AND BrowserSync at `http://localhost:3000`, in parallel. CSS changes are injected without a page reload; HTML/JS changes trigger a full reload.
- `npm run serve` — BrowserSync only, no PostCSS watcher.

**Files involved:**
- `bs-config.cjs` (repo root) — BrowserSync configuration. Watches `*.html`, `en/*.html`, `css/style.css`, and `main.js`. Ignores `src/`, `node_modules/`, `.claude/`, `video/`, `fonts/`, `img/` (no reason to reload on large-asset changes).
- `package.json` — added `browser-sync` and `concurrently` to `devDependencies`; added `dev` and `serve` scripts.

**Why BrowserSync and not Vite / something fancier**: this project is intentionally framework-free static HTML. BrowserSync drops in without changing the file structure or build pipeline — it just serves the existing files and reloads on change. Vite would require treating HTML files as entry points and migrating the PostCSS pipeline, which isn't worth it here.

**About VS Code Live Server**: it still works (port 5502, configured in `.vscode/settings.json`). Use whichever you prefer — but only `npm run dev` runs the PostCSS watcher, so if you edit anything in `src/`, you need either `npm run dev` or to run `npm run css:dev` in a separate terminal.

The `cjs` extension on `bs-config.cjs` is deliberate — if the project ever adds `"type": "module"` to `package.json`, the `.cjs` extension keeps BrowserSync's CommonJS config working without changes.

---

## Production build (`npm run build` → `dist/`)

Added in a follow-up to scaffold a clean deploy artifact and tie the GitHub Pages workflow to it.

**Command:**
```
npm run build
```
Produces `dist/` (~163 MB, 217 files) containing exactly what a static host needs: HTML pages, compiled minified CSS, `main.js`, assets (`img/`, `video/`, `fonts/`), favicons, `site.webmanifest`, the PDF reports.

**Files involved:**
- `scripts/build.sh` — the actual build. Clean → CSS build → `rsync` with anchored excludes. Uses `set -euo pipefail` so any failure stops the build.
- `package.json` — `"build"` npm script just calls the shell script.
- `.gitignore` — already had `dist` from the original Nuxt-template gitignore, so no change needed.

**What's intentionally excluded from `dist/`:**

| Excluded | Why |
|---|---|
| `src/` | CSS source — already compiled into `css/style.css` |
| `node_modules/` | Build-time only |
| `scripts/`, `.github/`, `.vscode/`, `.claude/` | Tooling and editor config |
| `package.json`, `package-lock.json`, `postcss.config.js`, `bs-config.cjs` | Build configuration |
| `CLAUDE.md`, `README.md`, `LICENSE` | Documentation, not site content |
| `test_accordion.html` | Dev scratch file from earlier work |
| `raw-material-*` | Convention for working files (e.g. `raw-material-no-for-develop/` was a 16 MB unpublished 2025 PDF) |
| `.DS_Store`, `*.log`, `main copy.js` | Defensive cleanups |

The exclude patterns use leading-slash anchoring (e.g. `/src/`) so they only match at the repo root — a nested directory named `src` somewhere under `img/` would still be copied. This keeps the rules predictable.

**Why a shell script and not a Node script:**
Project philosophy is "no bundler, vanilla everything." `rsync` is preinstalled on macOS/Linux and does the work in one call with clean exclude semantics. A Node equivalent would need a dependency (`cpy`, `globby`, etc.) for the same result.

---

## GitHub Pages workflow

The pre-existing workflow at `.github/workflows/static.yml` was updated to use `npm run build`.

**Before**: uploaded the entire repository (including `src/`, `package.json`, etc.) as the artifact. Worked, but wasteful and meant GitHub Pages served whatever stale `css/style.css` was committed.

**After**: runs `actions/setup-node@v4`, `npm ci`, `npm run build`, and uploads only `./dist`. The Pages artifact is now the same as what `npm run build` produces locally.

If you ever need to deploy somewhere other than GitHub Pages (S3, Cloudflare Pages, Netlify, etc.), just point that host at `dist/` after `npm run build`.

---

## Known noise to ignore

`npm run build` prints a few `postcss-sorting: properties-order: Should be an array` warnings. These come from `postcss.config.js` using `'properties-order': 'smacss'` (a string) where current `postcss-sorting` expects an array of property names. The build still succeeds and the output CSS is fine — the property-order sorting just isn't applied for those rules. Pre-existing issue, not introduced by any of this setup. Worth fixing later by either upgrading `postcss-sorting` config to an explicit array or downgrading the plugin.

---

## How to extend this setup

- Add a new skill: `mkdir .claude/skills/<name> && touch .claude/skills/<name>/SKILL.md` with a frontmatter `name:` and `description:` block, then the body.
- Add a new subagent: drop a markdown file in `.claude/agents/` with frontmatter and a system prompt.
- Add a new hook: extend `.claude/settings.json`. See the build-css.sh script as a template — keep hook commands silent on the happy path and never `exit 1` unless you actually want to block.

When in doubt about Claude Code config syntax, the official docs are at https://docs.claude.com/en/docs/claude-code.
