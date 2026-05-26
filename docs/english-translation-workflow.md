# English translation workflow

Guide for refreshing `en/*.html` pages when the client provides an English Word document (`.docx`).

**Scope assumption**: the Estonian root pages are already up to date (current 2025 refresh complete). The English mirror in `en/` is stale (last touched 2024) and needs to be brought in line.

**Page pairs** (memorize):

| Estonian (root)         | English (`en/`)             |
|-------------------------|-----------------------------|
| `index.html`            | `en/index.html`             |
| `arisuunad.html`        | `en/business-lines.html`    |
| `ettevottest.html`      | `en/about.html`             |
| `finantstulemused.html` | `en/economic-results.html`  |
| `kestlikkus.html`       | `en/sustainability.html`    |

---

## Phase 1 — Receive and convert the Word file

When the client delivers `Alexela_annual_report_2025_EN.docx` (or similar):

1. **Place the file** under `raw-material-no-for-develop/` (gitignored / not shipped).
2. **Convert to plain text** with layout preserved:
   ```bash
   pandoc raw-material-no-for-develop/Alexela_annual_report_2025_EN.docx -t plain -o /tmp/aruanne-2025-en.txt
   ```
   Fallback if pandoc unavailable: `textutil -convert txt raw-material-no-for-develop/Alexela_annual_report_2025_EN.docx -output /tmp/aruanne-2025-en.txt`.
3. **Inspect the structure**:
   ```bash
   wc -l /tmp/aruanne-2025-en.txt
   grep -nE "^[A-Z][A-Za-z ]{4,}$" /tmp/aruanne-2025-en.txt | head -40   # likely chapter headings
   ```
4. **Identify chapter boundaries** by comparing to Estonian EPUB v3 chapter order (see `content-source-index.md`).

**If the Word doc also has tracked changes / comments**: do NOT accept changes blindly. Open in Word (or `pandoc --extract-media=...` to see embedded content), confirm with the client which version is final.

---

## Phase 2 — Map English source to HTML pages

Each English HTML page mirrors its Estonian sibling. The CSS classes, structure, IDs, image refs, and link targets must remain IDENTICAL across the pair — only visible text changes.

For each `en/*.html` page:

1. **Read the Estonian sibling first** to confirm current section structure.
2. **Find the English equivalent** in `/tmp/aruanne-2025-en.txt`.
3. **Replace text only** — never restructure classes, never add/remove `<section>` blocks. Section count must match between ET and EN versions.
4. **Watch out for**:
   - Numeric formatting: Estonian uses `,` for decimals (`5,9 TWh`), English uses `.` (`5.9 TWh`). EPUB v3 follows Estonian convention; Word file likely follows English.
   - Thousand separators: Estonian uses non-breaking space (` `), English uses comma (`,`) or non-breaking space.
   - Quotes: Estonian uses `„text"` (low-9 + right-double); English uses `"text"` (left + right double).
   - Section labels: `Ettevõttest` → `About us`, `Ärisuunad` → `Business lines`, `Kestlikkus (ESG)` → `Sustainability (ESG)`, `Finantstulemused` → `Financial results`, `Laadi alla PDF` → `Download PDF`.
   - Currency: keep `€` not `EUR` unless source says EUR.

---

## Phase 3 — Per-page checklist

Work in this order (smallest to largest):

### 3.1 `en/index.html`

- Hero H1: "Alexela in 2025" (or whatever Word file uses)
- Nav labels
- CEO foreword H2: probably "Marti Hääl, Chairman of the Management Board"
- KPI cards: numbers stay identical to Estonian; labels translate
- Estonia map legend / region tooltips
- "Koos loome tugeva kogukonna" → English equivalent
- "Kogukonnaprogramm: korvpall ja puude istutamine" → new for 2025
- "Uus suund: panus riigikaitsesse" → new for 2025
- Footer

### 3.2 `en/about.html` (mirrors `ettevottest.html`)

- "Meie teekond 2025" → "Our 2025 journey" (use Word file's exact phrasing)
- 6 theme-tabs translate exactly
- "2026. aasta väljavaade" → "2026 outlook" — NEW SECTION (added in commit 5bbb298 on Estonian side)
- 4 charts: labels translate, SVGs unchanged

### 3.3 `en/business-lines.html` (mirrors `arisuunad.html`)

- 15 business line sections
- **"VPP/Tark Elekter" → likely "VPP/Smart Electricity"** — confirm with Word file
- AS Alexela Motors, Alexela rePower, Rohe Solutions Oy, SIA Alexela, Hamina LNG, Eesti Biogaas, Zero Terrain — company names stay verbatim

### 3.4 `en/sustainability.html` (mirrors `kestlikkus.html`)

- 14 governance + sustainability + environment + people sections
- Web-only sections (Value chain, Focus topics, Sustainability strategy, etc.) — these need new English text from the marketing/sustainability team, NOT from Word file (since they don't appear in the report).
- Employee tables in "Meie inimesed" — numbers same, headers translate
- Nõukogu order: Räim, Hääl, Kazarin, Laane, Penjam (PDF order; same as Estonian)

### 3.5 `en/economic-results.html` (mirrors `finantstulemused.html`)

- 5 financial tables
- Numbers IDENTICAL to Estonian
- Row labels and column headers translate (`Müügitulu` → `Revenue`, `Aruandeaasta kasum` → `Profit for the reporting period`, etc.)
- 2 notes paragraphs after Omakapitali table translate

---

## Phase 4 — Parity verification

After ALL English pages are updated:

1. **Run the parity reviewer subagent**:
   ```
   Use the et-en-parity-reviewer agent on each page pair.
   ```
   It is read-only and returns a structured punch list.

2. **Manual sanity check**:
   ```bash
   # Compare section counts
   for f in index ettevottest arisuunad kestlikkus finantstulemused; do
     et_cnt=$(grep -c "<section " "$f.html")
     case "$f" in
       index) en_f="en/index.html" ;;
       ettevottest) en_f="en/about.html" ;;
       arisuunad) en_f="en/business-lines.html" ;;
       kestlikkus) en_f="en/sustainability.html" ;;
       finantstulemused) en_f="en/economic-results.html" ;;
     esac
     en_cnt=$(grep -c "<section " "$en_f")
     echo "$f: ET=$et_cnt EN=$en_cnt"
   done
   ```
   ET and EN counts must match.

3. **NFC-normalize any pasted text**: the `.claude/hooks/nfc-normalize.sh` hook auto-runs after every edit. But if Word doc was pasted via clipboard with NFD chars, run manually:
   ```bash
   python3 -c "import unicodedata; print(unicodedata.normalize('NFC', open('en/about.html').read()), end='')" > /tmp/x && mv /tmp/x en/about.html
   ```

4. **Test in browser**:
   ```bash
   npm run dev
   ```
   Open both http://localhost:3000/index.html and http://localhost:3000/en/index.html — confirm language switcher works on every page.

5. **Run W3C validator** (already invoked by IDE diagnostics). Fix any new errors introduced by the English edits.

---

## Phase 5 — Commits

One commit per page:

- `refresh en/index.html for 2025 content`
- `refresh en/about.html for 2025 content`
- `refresh en/business-lines.html for 2025 content`
- `refresh en/sustainability.html for 2025 content`
- `refresh en/economic-results.html for 2025 content`

If multiple sections per page are very different, split per page-section.

After all five: a final `verify ET/EN parity for 2025 refresh` if cleanup is needed.

---

## Known gotchas

- **English Word doc may be a different draft version** than the Estonian EPUB v3. If a paragraph exists in ET but not in EN (or vice versa), STOP and ask the user. Don't translate ad-hoc.
- **"Tark Elekter"**: Estonian PDF/EPUB renamed to "VPP/Tark Elekter" for 2025. Confirm English equivalent.
- **Karmo Piikmann note**: Estonian says "Juhatuse liige (kuni august 2025)" — English likely "Member of the Management Board (until August 2025)". Numbers and dates stay identical.
- **The verbatim rule applies to English too**: do NOT invent paragraphs. If Word file is missing a section the Estonian site has, ask the client.
- **No paraphrasing across languages**: the English text is the client's English copy, NOT a translation invented by Claude. If you don't have the exact English source for a paragraph, ask.
- **Don't auto-translate** with any LLM — every English sentence must come from the client's Word file or from a paragraph that has been signed off.
