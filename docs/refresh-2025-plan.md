# Refresh Alexela annual report site from 2024 to 2025 content (Estonian only)

> This is a copy of the planning document for the 2024→2025 content refresh. Original lives at `~/.claude/plans/warm-prancing-sphinx.md`. Kept here so the plan travels with the repo and is visible in PR review.

## Context

The Alexela annual report site (this repo) currently reflects the contents of `alexela_aruanne_2024.pdf`. The 2025 annual report (`Alexela_aruanne_2025.pdf`, now at repo root) is published and the Estonian-language site needs to be updated to match it.

Scope decisions (locked in with the user):
- **Estonian pages only** — `index.html`, `arisuunad.html`, `ettevottest.html`, `finantstulemused.html`, `kestlikkus.html`. The English `en/*.html` pages stay on 2024 content and will be reconciled in a future, separate effort. The `et-en-parity` skill will warn about drift on every edit; those warnings are expected and should be ignored for now.
- **Text and numbers only** — photos, hero images, and inline SVG charts (fuel volumes 2020-2024, CO2 trend, etc.) are NOT touched. SVG chart data will visually show 2024 figures on the new site; this is a known, accepted gap with a follow-up TODO.
- **Full financial statement refresh** — all five financial statement blocks in `finantstulemused.html` get rebuilt cell-by-cell from the 2025 PDF.
- **PDF download** — rename `Alexela_aruanne_2025.pdf` → `alexela_aruanne_2025.pdf` (lowercase URL convention), point all download links at it, remove the 2024 PDF from repo.

Structural good news: the 2024 and 2025 PDF tables of contents are nearly identical (same chapters in the same order). This is a content substitution task, not a structural one. Only one HTML section heading needs renaming: "Tark Elekter" → "VPP/Tark Elekter" (the business line was rebranded in 2025).

Intended outcome: an Estonian-language Alexela 2025 annual report at the same URLs as the 2024 site, served from `dist/` via the existing GitHub Pages workflow.

---

## Working materials already prepared

- `/tmp/aruanne-2024.txt` — `pdftotext -layout` dump of the 2024 PDF (5,770 lines). Use to find what current HTML copy maps to in the old PDF.
- `/tmp/aruanne-2025.txt` — `pdftotext -layout` dump of the 2025 PDF (5,424 lines). Source of truth for new content.

Both dumps preserve column layout via `-layout`. Re-extract with `pdftotext -layout <pdf> <out>` if they go stale.

---

## Phase 1 — Mechanical/preparatory edits

These are deterministic find-and-replace operations across the five Estonian HTML files. Do this first to set the baseline so the dev server reflects the new year before content work begins.

1. **Rename PDF**: `git mv Alexela_aruanne_2025.pdf alexela_aruanne_2025.pdf` (lowercase convention).
2. **Remove 2024 PDF from repo**: `git rm alexela_aruanne_2024.pdf` (per user decision — no on-site archive).
3. **Update all PDF download `href`s** across the five Estonian HTML files: search `alexela_aruanne_2024.pdf` → replace with `alexela_aruanne_2025.pdf`. Use `grep -rl alexela_aruanne_2024.pdf *.html` to confirm five hits before editing.
4. **Update year markers** — convert "2024" → "2025" only where it refers to the report year, not historical data:
   - `<title>Alexela aastaraamat 2024</title>` → `2025` (all 5 ET pages, in `<head>`)
   - `<h1>` and section H2 "Meie teekond 2024" → "Meie teekond 2025" in `ettevottest.html` (line 145)
   - `"müügitulu 2024.a"` → `"müügitulu 2025.a"` in `index.html` (line 260, KPI card description)
   - `"AS Alexela ja tütarettevõtete töötajad 2024"` → `2025` in `kestlikkus.html` (line 1569)
   - Header/footer mentions, `<meta>` descriptions, OG tags if any
   - Leave historical mentions ("2020-2024 võrdluses", "asutati 1993", chart axis labels) alone.
5. **Rename business line**: `arisuunad.html` line 602 — `<h2 class="block__title">Tark Elekter</h2>` → `VPP/Tark Elekter`. Also update the corresponding quicklink and accordion contents if they reference the old name.
6. **Verify in dev server**: `npm run dev` → spot-check every page in browser. CSS-rebuild hook + BrowserSync handle reloads automatically.

**Commit**: `bump pdf, year markers, rename Tark Elekter business line` (one commit, very mechanical, easy to review/revert).

---

## Phase 2 — Per-page content refresh

Work in this order, least to most complex. Commit after each page. Each page follows the same loop:

1. Identify section boundaries in the HTML (use grep output from this session as a starting point).
2. Locate the corresponding chapter in `/tmp/aruanne-2025.txt`.
3. For each section: read the current HTML range, read the 2025 PDF text for the same section, replace prose and numbers with `Edit`.
4. After each section, the BrowserSync dev server auto-reloads — visually compare to PDF.
5. After all sections in a page, `grep -nE "2024" <file>` to find any leftover year references, vet each one (some legitimately refer to history).

### Order of work

#### 2.1 `index.html` — homepage / KPI overview

- Section "Kogu energiateekond ühest kohast" (~line 143-209) — short intro prose. Replace with 2025 equivalent.
- Section "Alexela täna" KPI cards (~line 232-310+) — every numeric card needs to be checked against the 2025 PDF's "Alexelast lühidalt" chapter (PDF pages ~6-7):
  - Employee count (currently 538 → check 2025 value)
  - Revenue (594 ml eur → 2025 value, both numeric AND label "2024.a" → "2025.a")
  - Electricity market share (20%)
  - Gas market share (17%)
  - Fuel market share (22%)
  - Volumes (5,9 TWh)
  - Carbon footprint (72% smaller)
  - Biomethane produced (126,1 GWh)
  - Solar/electric production (2,9 GWh)
- Remaining content blocks lower in the page — refresh prose per PDF chapter "Kuidas me muudame maailma paremaks" (PDF pages ~11-12).
- Quicklink section (line 117-141) — verify all links still work; no changes expected.

**Commit**: `refresh index.html for 2025 content`.

#### 2.2 `ettevottest.html` — about / year journey

- Section "Meie teekond 2024" (line 143-455) — this is the company's year-in-review with 12+ event blocks. Every block needs replacement with 2025 events from PDF chapter "Aasta 2025 põhisündmused" (PDF pages ~7-10). Expect roughly the same number of events but completely different content.
- Section "Muudame maailma paremaks" (line 456-626) — community / CSR. Refresh per PDF "Kuidas me muudame maailma paremaks" + "Meie kogukond" chapters.
- Section "Hoiame, varustame ja vastutame" (line 627-684) — tagline / values block. Likely stable; verify.
- Section "Alexela väärtused" (line 685-710) — corporate values. Verify against 2025 PDF "Strateegia ja suund" chapter.

**Commit**: `refresh ettevottest.html for 2025 content`.

#### 2.3 `arisuunad.html` — business lines

13 business line sections, each with an intro paragraph (~50-100 words) + accordion details. Match each HTML section to its PDF chapter under "MAJANDUSTULEMUSED" (PDF pages ~32-48):

| HTML section | PDF chapter | Notes |
|---|---|---|
| Vedelkütused | Vedelkütused | volumes, station count, market events |
| Gaasilised kütused | Gaasilised kütused | biomethane, LNG volumes |
| Elekter | Elekter | market share, customer count |
| E-Mobiilsus | E-mobiilsus | charger count, sessions |
| Kaubandus ja jaeäri | Kaubandus ja jaeäri | retail KPIs |
| Alexela Täkupoiss | Alexela Täkupoiss | |
| Digitaliseerimine | Digitaliseerimine | |
| **Tark Elekter** (rename to VPP/Tark Elekter) | VPP/Tark Elekter | rename done in Phase 1; refresh body now |
| AS Alexela Motors | Alexela Motors | |
| Alexela rePower OÜ | Alexela rePower | |
| Rohe Solutions OY | Rohe Solutions Oy | |
| SIA Alexela | SIA Alexela | |
| Hamina LNG / Eesti Biogaas / Zero Terrain | same | currently in `arisuunad.html` after line 950+ |

For each: refresh intro prose + accordion body content. Keep all `aria-expanded`, BEM classes, and HTML structure intact — only the visible Estonian text inside changes.

**Commit**: `refresh arisuunad.html business line content for 2025`.

#### 2.4 `kestlikkus.html` — sustainability and governance

Refresh per PDF chapter "JÄTKUSUUTLIKKUS JA JUHTIMINE" (PDF pages ~15-30). Sections in order of appearance:

- **Juhtimine** intro + accordion (line 146-289) — high-level governance
- **Juhatus** (board, line 290-318) — board member names + bios. **Cross-check names against 2025 PDF "Juhtimine" chapter** — board composition may have changed.
- **Nõukogu** (supervisory board, line 319-356) — same: verify names.
- **Jätkusuutlikkus ja ESG Alexelas** (line 357-400)
- **Kahese olulisuse protsess** (line 401-456)
- **Alexela väärtusahel** (line 457-984)
- **Meie fookusteemad** (line 985-1007)
- **Jätkusuutlikkuse strateegia** + **Huvigrupid** (line 1008-1026)
- **Jätkusuutlikkus Alexelas** (line 1027-1049)
- **Keskkond** (line 1050-1077) + sub-blocks
- **CO2 jälg ja süsinikuintensiivsus** (line 1293-1353) — numbers MUST be updated from PDF chapter "Keskkond"
- **AS Alexela ja AS Alexela Motors CO2 jälg ning selle vähendamise plaan** (line 1354-1451) — KPI heavy
- **Regulatiivse keskkonna mõjud** (line 1452-1538)
- **Meie inimesed** (line 1539+) — employee data 2024 → 2025 (counts, gender split, training hours, etc.)

**Commit**: `refresh kestlikkus.html sustainability content for 2025`.

#### 2.5 `finantstulemused.html` — financial statements (most precision-critical)

Five large content blocks corresponding to 5 statements in PDF chapter "KONSOLIDEERITUD RAAMATUPIDAMISE AASTAARUANNE" (PDF pages ~50+):

| HTML block | Lines | PDF source |
|---|---|---|
| Konsolideeritud finantsseisundi aruanne (balance sheet) | 143-664 | PDF p. 51 |
| Konsolideeritud kasumiaruanne (income statement) | 665-947 | PDF p. 52 (top) |
| Konsolideeritud koondkasumiaruanne (comprehensive income) | 948-1059 | PDF p. 52 (bottom) |
| Konsolideeritud rahavoogude aruanne (cash flow) | 1060-1285 | PDF p. 53 |
| Konsolideeritud omakapitali muutuste aruanne (equity changes) | 1286-end | PDF p. 54 |

Plus likely lisad (notes) appended after each statement — confirm scope when reading the file.

Process per statement:
1. Read full HTML block.
2. Read corresponding PDF page(s) via `Read` with `pages` parameter, or `sed -n` on `/tmp/aruanne-2025.txt`.
3. Build a side-by-side correspondence (account name → 2024 value → 2025 value).
4. Edit each row with the 2025 figure. Preserve number formatting (` ` thousands separator, `-` for negatives, decimal commas if Estonian convention).
5. Update the "võrdlusaasta" (comparison year) column: 2023 figures move out, 2024 figures move into the comparison column, 2025 is the new primary.

**Risk**: numeric typos. Recommend a final accountant-style review after this commit before publishing.

**Commit**: `refresh finantstulemused.html with 2025 financial statements`.

---

## Phase 3 — Verification

After all five page commits:

1. **Build**: `npm run build` — confirms PostCSS, rsync, and the workflow all still work; produces fresh `dist/`. Inspect `dist/` for the new PDF (`alexela_aruanne_2025.pdf`) and absence of the old one.
2. **Run dev**: `npm run dev` → walk every Estonian page in browser at `http://localhost:3000`. Compare each section to the 2025 PDF.
3. **Year-marker sweep**: `grep -nE "\b2024\b" *.html | grep -v "/en/"` — list every remaining "2024". Vet each: kill it if it's a leftover, keep it if it's a legitimate historical reference (e.g. "2020-2024 võrdluses", "muutus võrreldes 2024. aastaga", date `01.01.2024` in financial period descriptors that legitimately reference the prior year).
4. **Link sweep**: `grep -nE 'href="[^"]*\.pdf"' *.html` — all PDF hrefs point at `alexela_aruanne_2025.pdf`.
5. **Anchor sweep**: any `id="..."` referenced from quicklinks still exists.
6. **Run the et-en-parity-reviewer subagent** on each page pair — it will report drift (expected and intentional). Snapshot the output as the to-do list for the future EN refresh.
7. **CSS sanity**: confirm `css/style.css` was rebuilt by the auto-hook during the work (`ls -la css/style.css` shows a recent mtime).
8. **Final commit if needed** with any cleanup nits found during verification.

---

## Known acceptable gaps (documented limitations after this work)

To call out in the final commit message or a follow-up issue:

1. **English pages (`en/*.html`) are stale** — they still describe the 2024 report. The language switcher will lead users to old content. Reconcile in a separate effort.
2. **Inline SVG charts show 2024-period data** — the time-series charts (fuel volumes, CO2 trend) have hard-coded 2020-2024 axis labels and bar values. Visible discrepancy with the 2025-labeled site. Follow-up TODO: update SVG data.
3. **Photos are unchanged** — some photos depict specific 2024 events. A human content reviewer should flag any that are now misleading.
4. **Board photos** — if Juhatus/Nõukogu composition changed in 2025, member names will update but headshot images won't (no new image files provided). Flag for follow-up.

---

## Critical files

| File | Role in this work |
|---|---|
| `index.html` | Homepage + KPI cards |
| `arisuunad.html` | 13 business line sections + accordions |
| `ettevottest.html` | Company / year journey / values |
| `finantstulemused.html` | 5 financial statement blocks + lisad |
| `kestlikkus.html` | Sustainability + governance + CO2 + people |
| `alexela_aruanne_2025.pdf` (after rename) | New PDF, in repo root and dist/ |
| `alexela_aruanne_2024.pdf` | Removed via `git rm` in Phase 1 |
| `/tmp/aruanne-2024.txt` | Old PDF as text — context for what current copy maps to |
| `/tmp/aruanne-2025.txt` | New PDF as text — source of truth |
| `.claude/skills/et-en-parity/SKILL.md` | Will warn loudly during edits — ignore for this work |
| `.claude/hooks/build-css.sh` | Continues to rebuild CSS automatically if any partials are touched |
| `scripts/build.sh` | Re-run via `npm run build` after work for Phase 3 verification |

No new files created. No code architecture changes. No CSS partial changes expected (text edits only — the BEM classes already cover all visible elements).

---

## Appendix — Future-cycle workflow (if source is InDesign)

This year's update extracts content from a print-output PDF, which loses semantic structure. For future cycles, three better paths if the original is authored in InDesign:

**Path A — Stricter InDesign paragraph styles + EPUB export** (cheapest)
- Designer uses paragraph styles rigorously: "Heading 1/2/3", "Body", "Caption", etc.
- Export from InDesign as reflowable EPUB. EPUB is zipped semantic HTML.
- Node script splits by chapter heading and outputs HTML fragments per existing `<section>` on this site.
- Setup: ~1 day. Saves ~80% of next cycle's manual work.

**Path B — IDML as source-of-truth + transform pipeline** (middle)
- IDML is InDesign's XML format (rename `.indd` → `.idml`, or export-as).
- Node script (~200 lines, `cheerio` or `xpath`) parses IDML, finds chapters by style name, emits a content manifest the site ingests at build time.
- Setup: ~3-5 days. Near-total automation after that.

**Path C — Single source of truth (Markdown / headless CMS)** (long-term best)
- Estonian copy lives in Markdown files or a CMS (Sanity / Contentful / Strapi).
- Both InDesign (via XML import with style mappings, a.k.a. "InDesign XML rules" or "Tagged Text") and the web consume the same source.
- Translators work in the CMS — fixes ET/EN parity drift permanently.
- Setup: quarter-scale strategic project. Pays back across all future cycles.

**Concrete improvements regardless of path chosen**
- Charts: export from InDesign as **SVG**, not PNG. Vector preserved, CSS-styleable.
- Photos: shared asset folder with versioned filenames (e.g. `hero-2025-q1.jpg`). One-line `cp` step per cycle.
- KPI numbers: keep headline KPIs in a **YAML/JSON file** as single source of truth — both InDesign (via Data Merge) and the web consume it. Eliminates the dominant typo risk.

**Recommended next step**: Path A for the 2026 cycle (almost zero upstream cost, immediate relief), revisit Path C as a separate strategic conversation if the annual report warrants ongoing investment.
