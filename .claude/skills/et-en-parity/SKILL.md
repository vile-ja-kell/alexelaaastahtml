---
name: et-en-parity
description: Maintain bilingual ET/EN page parity in the Alexela annual report. Use whenever editing a root *.html (Estonian) or en/*.html (English) page — every structural, content, asset, or class change must be mirrored to the paired file. Also use when the user mentions "language switcher", "EN version", "ET version", "translation", "mirror to English", "bilingual", or "parity".
---

# ET / EN Parity Skill

The Alexela 2024 annual report ships in two languages. Each Estonian page at the project root has a counterpart in `en/`. Any edit to one side that changes structure, classes, assets, IDs, or semantics MUST be mirrored to the other side, or the language switcher and visual parity will silently drift.

## Page mapping (memorize this)

| Estonian (root)         | English (`en/`)             |
|-------------------------|-----------------------------|
| `index.html`            | `en/index.html`             |
| `arisuunad.html`        | `en/business-lines.html`    |
| `ettevottest.html`      | `en/about.html`             |
| `finantstulemused.html` | `en/economic-results.html`  |
| `kestlikkus.html`       | `en/sustainability.html`    |

There is no other ET/EN pairing scheme. Filenames in `en/` are translated, so do NOT assume the slugs match.

## What MUST be mirrored

Always mirror these between the two files:

- Section structure (count and order of `<section>` blocks)
- CSS classes (especially `section--*`, `block--*`, `image-text-content-block`, `content-block`, `cards`)
- Element IDs and `data-*` attributes (the language switcher and in-page anchors rely on these)
- Image / video / SVG paths under `img/` and `video/` (assets are shared between languages)
- Accordion / tab / quicklink keys
- Number formatting where it carries meaning (charts, table data)

## What MUST differ

- Visible text content (Estonian vs English copy)
- `<html lang="et">` vs `<html lang="en">`
- `<title>` and meta descriptions
- Link `href`s pointing between pages — must point at the same-language counterpart (e.g. a link from `ettevottest.html` to `arisuunad.html` becomes, in `en/about.html`, a link to `business-lines.html`)
- Date / unit localization where appropriate

## Workflow when editing one side

1. Identify which page you're editing and look up its counterpart from the mapping above.
2. Read both files before changing anything structural.
3. Make the change on the requested side first.
4. Apply the equivalent change to the counterpart with translated text.
5. For non-trivial parity work, consider running the `et-en-parity-reviewer` subagent against the pair to catch drift.

## Common drift sources (history shows these break repeatedly)

- **Language switcher**: lives in `<nav>`; the `href` and the displayed code (`ET` / `EN`) must point at the correct counterpart on every page.
- **Map legend / chart labels**: SVG `<text>` nodes are easy to forget — search for them explicitly.
- **In-page anchors**: if you add an `id="foo"` on one side, add the matching id on the other side too (anchors in copy may target it).

## When the user asks you to "just edit one side"

Still flag the parity implication: "Done. The matching change in `en/<file>.html` would be …  Want me to apply it?" — do not silently leave the pair out of sync.
