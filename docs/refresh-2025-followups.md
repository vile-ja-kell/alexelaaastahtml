# 2025 content refresh — follow-ups and known gaps

Items found during the 2024 → 2025 Estonian content refresh that need human verification, marketing input, or deferred work. Everything here is intentional — flagged so nothing is forgotten.

Last updated: see git log for `docs/refresh-2025-followups.md`.

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

## 2. Inline SVG charts show 2024-period data

The site has several inline SVG charts with hard-coded time-series labels (2020-2024 range) and bar values. They were intentionally NOT touched in this content refresh (per scope decision).

Examples:
- Fuel volumes 2020-2024 chart
- CO₂ trend chart
- Market share evolution charts

**Action**: Separate effort to update SVG data + axis labels to a 2021-2025 window. Files likely in `src/partials/graphs.css` and inline in `index.html` / `kestlikkus.html` / `arisuunad.html`.

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
