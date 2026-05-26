# 2025 refresh — session continuity state

Snapshot of where the 2024 → 2025 Estonian content refresh stands, so any future Claude session can pick up cleanly.

**Branch**: `english` (despite the name, this branch is where the Estonian refresh happened — the English mirror is still untouched)

**Last refresh commit**: see `git log --oneline | head -1`

**Refresh tsükli alguskommit**: `d0dd3a6` "swap to 2025 pdf, update year markers, rename Tark Elekter"

---

## What is DONE (Estonian side, fully refreshed and verbatim against EPUB v3)

### `index.html`
- ✅ Page title, H1, year markers swapped to 2025
- ✅ "Kogu energiateekond ühest kohast" — verbatim PDF p6 (commit 9456c5d)
- ✅ CEO foreword (Marti Hääl) — invented H3 subheadings removed (commit e68b9fc)
- ✅ "Koos loome tugeva kogukonna" — restored to PDF p25-26 verbatim (commit 6168bd8)
- ✅ "Kogukonnaprogramm: korvpall ja puude istutamine" — NEW section added (commit 87cc760)
- ✅ "Uus suund: panus riigikaitsesse" — NEW section added (commit 8e90d9d)
- ⚠️ KPI cards "Alexela täna" partly updated (520 töötajat, 621 ml eur, 131,7 GWh, 18% korduvkasutus, 5 GWh laetud) — see followups for remaining

### `ettevottest.html`
- ✅ Hero, year markers
- ✅ "Meie teekond 2025" restructured by 6 themes (commit 0bed864), tab content verbatim EPUB
- ✅ "2026. aasta väljavaade" — NEW section added (commit 5bbb298)
- ✅ Chart x-axes updated to show 2020–2025 (commit 9e0b8c0)
- ✅ 4th chart "Keskkonda vähem koormavate tankimisvõimaluste loomine" added (commit c039bce)
- ✅ Investeeringud + Alexela väärtused refreshed (commit f1c3c03)
- ⚠️ Chart SVG bar/line data still hardcoded 2024 (see followups)

### `arisuunad.html`
- ✅ All 15 business line sections refreshed verbatim (cadf30c, ff3dd9d, 0b48c54, 176ccc9, …)
- ✅ Renamed "Tark Elekter" → "VPP/Tark Elekter"
- ✅ Täkupoiss "Aastal 2024" → "Aastal 2025" + "100-kohalist" hyphen fix (commit 01ba406)

### `kestlikkus.html`
- ✅ Juhtimine + Juhatus + Nõukogu refreshed (commit 49af106)
- ✅ Nõukogu order matches PDF p30: Räim, Hääl, Kazarin, Laane, Penjam (commit df8ebe7)
- ✅ Andreas Laane portrait replaced with new EPUB v3 photo (commit 2175e74)
- ✅ Board portraits resized to 241h consistent (commit 465e599)
- ✅ Jätkusuutlikkus ja ESG Alexelas: first paragraph visible, rest in accordion (commit 3f4d32c)
- ✅ Keskkond refreshed + accordion (commits 4b87dbd, 7c385f4)
- ✅ Regulatiivse keskkonna mõjud — 8 paragraphs verbatim (commit 4b87dbd)
- ✅ Meie inimesed refreshed (commits 045a0d6, 15a189f, 468eae3, 01cf85e)
- ✅ Web-only sections (Väärtusahel, Fookusteemad, Strateegia, Jätkusuutlikkus Alexelas) preserved as-is

### `finantstulemused.html`
- ✅ All 5 financial statement tables refreshed verbatim from EPUB v3 (commits 82f2136, 8ce3d89, f91623d, 7bdd11a, 401fc2f)
- ✅ Column headers updated to 2025/2024 (was 2024/2023)
- ✅ Notes after Omakapitali table cleaned up — non-EPUB "Muud muutused" paragraph removed (commit d6a3b20)
- ✅ Vertical border added to Kokku column header (commit 92f5736)

### Infrastructure
- ✅ PDF renamed from `Alexela_aruanne_2025.pdf` to lowercase `alexela_aruanne_2025.pdf`
- ✅ Old `alexela_aruanne_2024.pdf` removed
- ✅ All `href` updates to point at the new PDF
- ✅ NFC-normalize hook installed (`.claude/hooks/nfc-normalize.sh`)
- ✅ Build script + GitHub Pages workflow updated

---

## What is NOT YET DONE (intentional or pending user input)

See `docs/refresh-2025-followups.md` for the full followups list. Highlights:

1. **English mirror (`en/*.html`)** — fully stale, still on 2024 content. Refresh workflow in `docs/english-translation-workflow.md`. Triggered by client delivering English Word doc.
2. **"Istutame puid" 3 counters on `index.html`** (60 489 liiget / 1 648 771 puud / 992 395,3 t CO2) — values may need updating, user said "info alles selgub"
3. **"Alexela täna" KPI cards** — `178 tuhat`, `20%`, `17%`, `22%`, `5,9 TWh`, `72%` cards: are derived/aggregated marketing numbers. NOT directly in PDF/EPUB. Need user/marketing direction.
4. **Chart SVG data** — `graph-sots.svg`, `graph-kogukond.svg`, `graph-tankimisvoimalused.svg`, etc. still encode 2024-period data points. X-axis labels updated to 2025, data points were not.
5. **CO2 Mõjuala section (kestlikkus.html lines 1048–1416)** — currently HTML-commented-out. If user wants to bring it back with 2025 data, needs new source (EPUB v3 doesn't have a comparable text table for 2025).

---

## How to start a new Claude session and continue this work

1. **Load these documents (in order)**:
   - `CLAUDE.md` (project instructions — auto-loaded)
   - `docs/content-source-index.md` — where every visible HTML section maps to in EPUB v3
   - `docs/refresh-2025-state.md` — this file
   - `docs/refresh-2025-followups.md` — outstanding work
   - `docs/english-translation-workflow.md` — for English refresh

2. **Memory files already loaded** from `~/.claude/projects/-Users-juhokalberg-Documents-twn-alexela-alexelaaastahtml-2026/memory/`:
   - `feedback_verbatim_content_only.md` — NEVER invent text, no paraphrasing
   - `project_epub_v3_authoritative.md` — EPUB v3 is authoritative, not PDF

3. **Authoritative source paths** (memorize):
   - EPUB v3: `raw-material-no-for-develop/Alexela_aruanne_2025_v3/OEBPS/Alexela_aruanne_2025_v3.xhtml`
   - PDF text dump: `/tmp/aruanne-2025.txt` (regenerate with pdftotext if missing)
   - Old PDF for comparison: `/tmp/aruanne-2024.txt`
   - Live 2024 web (for what "looks normal"): `https://aasta.alexela.ee/2024/`

4. **Tools and commands**:
   - Dev: `npm run dev` (PostCSS + BrowserSync at :3000)
   - Build: `npm run build` (rsyncs into `dist/`)
   - Parity check: invoke `et-en-parity-reviewer` subagent
   - WCAG: `wcag-review` skill auto-runs after HTML edits
   - NFC normalize: auto via `.claude/hooks/nfc-normalize.sh`
   - CSS rebuild: auto via `.claude/hooks/build-css.sh`

5. **Common pitfalls (already encountered, do NOT repeat)**:
   - **NEVER invent subheadings or paraphrase** — past mistake (commit 110d6ea) caused user anger. Rule is recorded in memory.
   - **Don't audit commented-out HTML as live**: kestlikkus.html lines 333–387 (Kahese olulisuse) and 1048–1416 (CO2 Mõjuala table) are wrapped in `<!-- -->`. They are hidden.
   - **Don't trust EPUB to have everything PDF has**: EPUB v3 sometimes contains 3 more paragraphs than the PDF (e.g., Juhtimispõhimõtete rakendamine). When EPUB and PDF disagree, EPUB v3 is authoritative.
   - **The `english` branch contains Estonian work**: the branch name is misleading. Don't get confused.
   - **Don't delete or change CO2/web-only sections without explicit user direction**: many sustainability sections are web-only and existed in 2024 web too.

---

## Quick file location map

```
/Users/juhokalberg/Documents/twn/alexela/alexelaaastahtml-2026/
├── index.html              ← homepage (ET)
├── ettevottest.html        ← about (ET)
├── arisuunad.html          ← business lines (ET)
├── kestlikkus.html         ← sustainability (ET)
├── finantstulemused.html   ← financial results (ET)
├── en/
│   ├── index.html
│   ├── about.html
│   ├── business-lines.html
│   ├── sustainability.html
│   └── economic-results.html
├── alexela_aruanne_2025.pdf
├── raw-material-no-for-develop/
│   └── Alexela_aruanne_2025_v3/
│       └── OEBPS/
│           ├── Alexela_aruanne_2025_v3.xhtml   ← AUTHORITATIVE SOURCE
│           └── image/                          ← board portraits etc.
├── docs/
│   ├── content-source-index.md                 ← EPUB↔HTML mapping
│   ├── english-translation-workflow.md         ← Word→en/ guide
│   ├── refresh-2025-state.md                   ← this file
│   ├── refresh-2025-followups.md               ← TODOs
│   └── refresh-2025-plan.md                    ← original plan
├── src/                    ← PostCSS source
├── css/                    ← compiled CSS (don't edit)
├── img/                    ← images
├── .claude/
│   ├── settings.json                           ← hooks config
│   ├── hooks/
│   │   ├── build-css.sh
│   │   └── nfc-normalize.sh
│   ├── skills/
│   │   ├── et-en-parity/SKILL.md
│   │   └── project-conventions/SKILL.md
│   └── agents/
│       └── et-en-parity-reviewer.md            ← read-only parity audit
└── CLAUDE.md
```
