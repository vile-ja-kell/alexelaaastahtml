# 2025 content refresh — follow-ups and known gaps

Items found during the 2024 → 2025 Estonian content refresh that need human verification, marketing input, or deferred work. Everything here is intentional — flagged so nothing is forgotten.

Last updated: see git log for `docs/refresh-2025-followups.md`.

---

## 0a. Community section intro (`index.html` "Koos loome tugeva kogukonna")

After the verbatim-only rule was set, I reverted my synthesized text and restored the original 2024 prose. The restored text still references 2024-specific events that the user may want to update later — but only with verbatim 2025 PDF excerpts, not synthesized prose:

- "Aasta 2024 sügisel uuendasime oma sponsorluspõhimõtteid…" — historical fact, still accurate from 2025 vantage point
- "Alexela pälvis 2024. aastal kultuuriministeeriumi aasta kultuurisõbra tiitli ning sai aasta muusikasõbralikuima ettevõtte tunnustuse" — these are 2024 awards. The 2025 PDF mentions the company has *been* awarded these titles plus the Kaitseministeerium riigikaitsjate toetaja tunnustus from 2025. If the user wants the section to reflect 2025, the verbatim PDF passage to use is in the CEO foreword (p4-5) and "Alexelast lühidalt" chapter (p6).

**Action**: User to provide direction. Either keep the restored 2024 text (factually correct as history), or copy-paste a specific 2025 PDF excerpt to swap in.

---

## 0. Tree-planting program stats on `index.html` (Istutame puid section)

The community / tree-planting widget shows three counters (currently 2024 end-of-year values):

| Stat | Current value | Needs |
|---|---|---|
| `liiget` | 60 489 | 2025 community member count |
| `puud` | 1 648 771 | 2025 total trees planted |
| `tonni vähem CO2` | 992 395.3 | 2025 cumulative CO2 saved |

Plus the Estonia map shows per-region tree-planting density via a 3-bucket color legend. If region distribution shifted, the SVG `img/estonia.svg` may need re-coloring. Source: marketing/sponsorship team's internal counter.

**Location**: `index.html` lines ~676, 685, 694.

---

## 1. Unverified KPI cards on `index.html` (Alexela täna section)

These six KPI cards still show 2024 values. They were curated marketing-summary numbers that don't appear directly in the 2025 PDF text dump, so they need to be sourced from elsewhere (marketing team, internal data, or a different source document).

| Card | Current (2024) value | Needs |
|---|---|---|
| `era- ja äriklienti` | 178 tuhat | 2025 customer count |
| `elektrituru turuosa` | 20% | 2025 electricity market share |
| `maagaasi turuosa` | 17% | 2025 natural gas market share |
| `kütuse turuosa` | 22% | 2025 fuel market share |
| `tarbijatele müüdud energiat 2025.a` | 5,9 TWh | 2025 total energy sold (year label was already updated) |
| `väiksem süsinikujälg*` | 72% | 2025 carbon footprint reduction vs 2020 baseline |

**Location**: `index.html` lines ~245, 266, 273, 280, 287, 296.

**Action**: Marketing team or sustainability lead to provide 2025 values; replace each card title.

---

## 2. Inline SVG charts — status

**ettevottest.html `Muudame maailma paremaks` — UPDATED to 2020-2025**

Three SVGs regenerated from PDF p11-12 chart readings:
- `img/graph-sots.svg` — SOTSIAALNE – TOETUSPROJEKTID (Toetusprojekte count + € value)
- `img/graph-kogukond.svg` — KOGUKONNAPROGRAMM (puid + CO₂ + liikmed)
- `img/graph-keskkond.svg` — KESKKONDA SÄÄSTVATE TANKIMISLAHENDUSTE ARENDAMINE (biometaan MWh + laetud elekter MWh)

X-axis extended to include 2025 (20-25). Y-axis ranges updated:
- Kogukonnaprogramm: left 0-1 400 000 → 0-2 500 000; right 0-60 000 → 0-70 000
- Keskkonda säästvate: left 0-900 000 → 0-90 000 (MWh); right 0-3 500 → 0-6 000 (MWh)

**Values are visual estimates from screenshots of the PDF** — please spot-check against the PDF when reviewing. Off by a few percent on any individual data point is likely.

**Other pages still have charts that show 2024-period data**:
- `index.html` `Istutame puid` widget (separate effort, see item #0)
- Likely `kestlikkus.html` (CO₂ trend, market share charts — not yet inspected)
- Likely `arisuunad.html` (per-business-line trend charts — not yet inspected)

---

## 3. English pages (`en/*.html`) are stale

All English mirror pages still describe the 2024 report. Per scope decision, only the Estonian side was refreshed.

**Action**: A separate translation + content refresh pass once Estonian copy is finalized. The `et-en-parity-reviewer` subagent in `.claude/agents/` can produce a per-page drift report when needed.

---

## 4. Photos may depict 2024-specific events

The site keeps all 2024 photos. Some images may show specific 2024 events (e.g. a particular tankla opening, a specific community event) that don't make sense alongside 2025 copy.

**Action**: Content reviewer walks every page in the browser and flags any photo that is now misleading. New replacement images need to be provided by the marketing/design team.

---

## 5. Board / Nõukogu composition

The 2025 PDF employee table shows **Juhatuse liikmed: 6** (down from 10 in 2024) and **Nõukogu ja juhatus: 13** (down from 14 in 2024). The HTML `kestlikkus.html` lists board members by name.

**Action**: When refreshing `kestlikkus.html`, cross-check member names + bios against PDF p28-30 (Juhtimine chapter). Member names will update but no new headshot images are provided — flag those for follow-up.

---

## 6. Financial statement notes (lisad)

The five financial statement blocks in `finantstulemused.html` may include lisad (notes) sections. Scope is full refresh of every cell — recommend a final accountant-style review before publishing because numeric typos are the dominant risk.

**Action**: After my pass, an accountant or finance team member should reconcile every published table against the 2025 PDF audited statements.

---

## 7. Known build noise

`npm run build` prints `postcss-sorting: properties-order: Should be an array` warnings. Pre-existing config drift in `postcss.config.js` (uses string `'smacss'` where current `postcss-sorting` expects an array). Harmless — output CSS is correct. Worth fixing separately when next touching the CSS toolchain.
