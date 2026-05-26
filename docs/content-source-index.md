# Content source index — EPUB v3 ↔ HTML mapping

This document maps every visible HTML section to its source location in the authoritative EPUB v3, so future content refreshes can locate the source text in a single grep.

**Authoritative source path**: `raw-material-no-for-develop/Alexela_aruanne_2025_v3/OEBPS/Alexela_aruanne_2025_v3.xhtml`

**Secondary (verification only)**: `/tmp/aruanne-2025.txt` (regenerate with `pdftotext -layout alexela_aruanne_2025.pdf /tmp/aruanne-2025.txt`)

**Verbatim rule**: never invent, paraphrase, or recombine source sentences. If a paragraph is not in EPUB v3, mark it WEB-ONLY and leave it untouched without explicit user direction. See `feedback_verbatim_content_only.md` in `~/.claude/projects/.../memory/`.

---

## EPUB v3 navigational helpers

EPUB uses InDesign-exported paragraph styles. Search by class to find sections fast:

| EPUB CSS class                       | Meaning                       |
|--------------------------------------|-------------------------------|
| `_1pt-heading-blue--indexed-`        | Top-level chapter heading     |
| `_1pt-heading-blue`                  | Major subsection heading      |
| `body-subtitle-black`                | Sub-subsection / lead-in      |
| `_0pt-body-main`                     | Body paragraph                |
| `_4pt-heading-blue`                  | "LISA N." (notes) heading     |
| `pic-title`                          | Photo caption                 |
| `table-copy`                         | Table cell text               |

Page breaks: `<div id="pageN" role="doc-pagebreak">`.

---

## `index.html` (homepage)

| HTML section           | HTML lines  | EPUB v3 location        | PDF page | Status            |
|------------------------|-------------|--------------------------|----------|-------------------|
| Hero, quicklinks       | 1–142       | —                        | —        | structural        |
| Kogu energiateekond    | 143–209     | EPUB 136–199 (CEO foreword chapter intro paragraphs) | p6 "Alexelast lühidalt" | UPDATED-MATCH |
| Alexela täna (12 KPI cards) | 213–306 | KPI numbers DERIVED from various sections — not a single PDF block | various | **WEB-ONLY structure**. Each card needs separate sourcing (see followups doc). |
| `*VS baasaasta 2020, mõjuala 1-2` footnote | 305 | derived from CO2 calculation | — | WEB-ONLY |
| Üle-eestiline kohalolu (Estonia map) | 307–374 | — | — | WEB-ONLY (interactive map) |
| Juhatuse esimees Marti Hääl | 376–490 | EPUB 136–199 (CEO foreword) | p4–5 | UPDATED-MATCH |
| Koos loome tugeva kogukonna | 491–630 | EPUB 189 + various community paragraphs | p25–26 | UPDATED-MATCH |
| Istutame puid (3 counters + map) | 635–693 | derived | — | **STALE 2024 counters** — see followups |
| Kogukonnaprogramm: korvpall ja puude istutamine | 696–729 | EPUB 4010–4016 | p27 | UPDATED-MATCH (commit 87cc760) |
| Uus suund: panus riigikaitsesse | 731–752 | EPUB 4017–4021 | p27 | UPDATED-MATCH (commit 8e90d9d) |
| Energiateekond Soome ja Lätti | 755–803 | — | — | WEB-ONLY (cards/links) |
| Nutikas energiateekond | 806–820 | — | — | WEB-ONLY |
| Meie lugu | 823–end | — | — | WEB-ONLY (timeline/history) |
| Footer | end | — | — | structural |

---

## `ettevottest.html`

| HTML section | HTML lines | EPUB v3 location | PDF page | Status |
|---|---|---|---|---|
| Hero, quicklinks | 1–142 | — | — | structural |
| Meie teekond 2025 (6 theme tabs) | 143–327 | EPUB 247–614 (6 themed `<ul>` lists) | p7–10 "Aasta 2025 põhisündmused" | UPDATED-MATCH |
| 2026. aasta väljavaade | 329–344 | EPUB 596 (heading) + 606 (paragraph) | p10 | UPDATED-MATCH (commit 5bbb298) |
| Kuidas me muudame maailma paremaks (heading + 4 charts) | 347–571 | EPUB various — charts are derived data | p11–12 | UPDATED-MATCH headings; **chart SVG data hardcoded 2024** (see followups) |
| Hoiame, varustame ja vastutame | 575–586 | EPUB (values block) | p13 | UPDATED-MATCH |
| Investeeringud | 588–607 | EPUB (investments section) | p13 | UPDATED-MATCH (commit f1c3c03) |
| Alexela väärtused | 610–end | EPUB (corporate values) | p14 | UPDATED-MATCH |

---

## `arisuunad.html`

Each business line is its own `<section class="section--content">` with image + intro `<p>` + accordion. Order matches EPUB 2025 PDF table of contents.

| Business line | HTML H2 line | EPUB location | PDF page | Status |
|---|---|---|---|---|
| Vedelkütused | 220 | EPUB ~4790–4830 | p33 | UPDATED-MATCH (cadf30c) |
| Gaasilised kütused | 284 | EPUB ~4830–4870 | p34 | UPDATED-MATCH (cadf30c) |
| Elekter | 347 | EPUB ~4870–4910 | p36 | UPDATED-MATCH (ff3dd9d) |
| E-Mobiilsus | 408 | EPUB ~4910–4940 | p37 | UPDATED-MATCH |
| Kaubandus ja jaeäri | 466 | EPUB ~4940–4965 | p38 | UPDATED-MATCH |
| Alexela Täkupoiss | 571 | EPUB 4971–4987 | p39 | UPDATED-MATCH (commit 01ba406) |
| Digitaliseerimine | 642 | EPUB 4996–5005 | p40 | UPDATED-MATCH |
| VPP/Tark Elekter | 730 | EPUB ~5010–5050 | p41–42 | UPDATED-MATCH (0b48c54) — renamed from "Tark Elekter" |
| AS Alexela Motors | 816 | EPUB ~5055–5075 | p43 | UPDATED-MATCH (176ccc9) |
| Alexela rePower OÜ | 882 | EPUB 5077–5099 | p44 | UPDATED-MATCH |
| Rohe Solutions OY | 1055 | EPUB 5101–5113 | p45 | UPDATED-MATCH |
| SIA Alexela | 1112 | EPUB 5114–5135 | p46 | UPDATED-MATCH |
| Hamina LNG Terminal | 1153 | EPUB ~5135–5160 | p47 | UPDATED-MATCH |
| Eesti Biogaas OÜ | 1211 | EPUB ~5160–5200 | p47–48 | UPDATED-MATCH |
| Zero Terrain OÜ | 1355 | EPUB ~5200–5230 | p48 | UPDATED-MATCH |

---

## `kestlikkus.html`

| HTML section | HTML lines | EPUB v3 location | PDF page | Status |
|---|---|---|---|---|
| Juhtimine intro + accordion | 148–220 | EPUB 4041–4055 | p28 | UPDATED-MATCH (49af106) |
| Juhatus (2 members) | 202–220 | EPUB 4067–4087 | p29 | UPDATED-MATCH |
| Nõukogu (5 members in PDF order) | 223–264 | EPUB 4109–4148 | p30 | UPDATED-MATCH (df8ebe7) — order: Räim, Hääl, Kazarin, Laane, Penjam |
| Jätkusuutlikkus ja ESG Alexelas | 268–331 | — | — | **WEB-ONLY** (existed in 2024 web; no EPUB equivalent); first para visible + accordion (3f4d32c) |
| Kahese olulisuse protsess | 333–387 | — | — | **WEB-ONLY, currently HTML-COMMENTED-OUT** (not visible) |
| Alexela väärtusahel (interactive SVG) | 389–916 | — | — | WEB-ONLY (custom interactive value-chain SVG with bullet annotations) |
| Meie fookusteemad | 919–943 | — | — | WEB-ONLY |
| Jätkusuutlikkuse strateegia | 946–963 | — | — | WEB-ONLY |
| Jätkusuutlikkus Alexelas | 965–982 | — | — | WEB-ONLY |
| Keskkond + accordion | 984–1046 | EPUB 3522–3546 | p20–21 | UPDATED-MATCH (4b87dbd + 7c385f4) |
| AS Alexela ja Motors süsinikujälg + Mõjuala tabel (2020–2024 cols) | 1048–1416 | not in EPUB | — | **HTML-COMMENTED-OUT** (intentionally hidden — 2024-only data) |
| CO2 jälg ja süsinikuintensiivsus (graph) | 1261–1320 | — | — | **WEB-ONLY**, SVG data is 2024 |
| AS Alexela ja Motors CO2 plaan | 1322–1418 | — | — | **WEB-ONLY**, contains 2024 figures |
| Regulatiivse keskkonna mõjud | 1420–1500 | EPUB 3553–3560 | p22 | UPDATED-MATCH (4b87dbd) — 8 paragraphs verbatim |
| Meie inimesed | 1502–end | EPUB 3568+ (page 23+ in PDF) | p23–24 | UPDATED-MATCH (045a0d6 + 15a189f + 468eae3 + 01cf85e) |
| Footer | end | — | — | structural |

**Crucial note about commented-out blocks**: Lines 333–387 and 1048–1416 are wrapped in HTML comments (`<!-- ... -->`). They are NOT rendered. Don't audit them as live content. Don't remove them either — they are preserved in case the user wants to bring them back later.

---

## `finantstulemused.html`

| Table | HTML lines | EPUB v3 location | PDF page | Year columns | Status |
|---|---|---|---|---|---|
| Konsolideeritud bilanss | 152–660 | EPUB 5294–5880 | p51 | 31.12.2025 / 31.12.2024 | UPDATED-MATCH (82f2136) |
| Konsolideeritud kasumiaruanne | 660–920 | EPUB 5880–6153 | p52 top | 2025 / 2024 | UPDATED-MATCH (8ce3d89) |
| Konsolideeritud koondkasumiaruanne | 920–1030 | EPUB 6153–6263 | p52 bottom | 31.12.2025 / 31.12.2024 | UPDATED-MATCH (f91623d) |
| Konsolideeritud rahavoogude aruanne | 1030–1240 | EPUB 6263–6709 | p53 | 2025 / 2024 | UPDATED-MATCH (7bdd11a) |
| Konsolideeritud omakapitali muutuste aruanne | 1240–1345 | EPUB 6709–6965 | p54 | 31.12.2023 / 31.12.2024 / 31.12.2025 rows | UPDATED-MATCH (401fc2f) |
| Notes (2 paragraphs after Omakapitali table) | 1350–1360 | EPUB 6963–6964 | p54 | — | UPDATED-MATCH (d6a3b20) — middle "Muud muutused" para removed (not in 2025) |
| LISA 1–35 (accounting notes) | not in HTML | EPUB 6965–end (~13k lines) | p55+ | — | **PDF-ONLY** — intentional scope: notes live in PDF download only |

---

## How to use this index in future refreshes

1. **Identify what changed in the new EPUB**: diff line ranges in the EPUB index column vs old EPUB. Anything else can stay.
2. **Find the matching HTML range**: grep the HTML lines column.
3. **Read both ranges** (EPUB chunk, HTML chunk).
4. **Edit only the text content**, never the HTML structure or CSS classes.
5. **Mark new sections WEB-ONLY** only if user explicitly says they are not from PDF/EPUB.
6. **NFC-normalize** any pasted text — `.claude/hooks/nfc-normalize.sh` runs automatically after edits, but manual paste can leave NFD chars.
7. **Run `et-en-parity-reviewer`** subagent after Estonian-side edits if English side has been done.
