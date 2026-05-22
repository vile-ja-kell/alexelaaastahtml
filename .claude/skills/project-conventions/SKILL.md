---
name: project-conventions
description: Load the Alexela annual-report site's CSS class taxonomy and file conventions whenever editing HTML, CSS, or JS in this project. Use this whenever creating new sections, blocks, or components, or when an existing class name is uncertain.
user-invocable: false
---

# Alexela Annual Report — Project Conventions

This is a static multi-page HTML site (Estonian + English). No framework. Build pipeline is PostCSS only. Stick to the conventions below — they are how the existing pages were authored and they keep new work visually consistent with the rest of the report.

## File layout

- Root `*.html` — Estonian pages. Top-level entry is `index.html`.
- `en/*.html` — English mirrors. See the `et-en-parity` skill for mapping.
- `main.js` — single vanilla-JS entry, attached on `DOMContentLoaded`. Initializes tabs, parallax, smooth scrolling, nav wave, accordion, mobile menu, explanations. Keep new behavior in this file unless it's truly isolated.
- `src/style.css` — main CSS entry. Imports all partials.
- `src/partials/` — modular CSS (one concern per file: `colors.css`, `type.css`, `tables.css`, `menu.css`, `waves.css`, `animations.css`, `graphs.css`, `quicklinks.css`, `tabs.css`, `utils.css`, `variables.css`, `reset.css`).
- `css/style.css` — compiled output. **Never edit by hand.** Run `npm run css:build` (or rely on the auto-rebuild hook) after editing `src/`.
- `img/`, `video/`, `fonts/` — shared assets across both languages.

## Build commands

- `npm run css:dev` — watch mode, non-minified, sourcemaps.
- `npm run css:build` — one-shot minified build. The PostToolUse hook in `.claude/settings.json` runs this automatically when any `src/**/*.css` file is edited.

## CSS naming conventions (BEM-flavored)

### Section types — applied to `<section>`
- `section--content` — typical content section
- `section--top` — page top / hero section
- `section--dark` — dark-background section
- `section--horizontal` — horizontal-scroll section
- Add `waves-animation` to any section that uses the wave decoration

### Article / block types — used inside sections
- `image-text-content-block` — image left, text right (default)
- `image-text-content-block block--image-right` — text left, image right
- `content-block` — text only
- `cards` — card grid

### Interactive components
- `.accordion__button` + sibling `.accordion__content` — toggle via `aria-expanded` and an `is-open` class on the content (`main.js` wires this up).
- `.menu-toggle` + `.menu__container` + `.menu__button` — mobile menu; toggled with `is-open` class.
- Tabs are initialized by `initTabs()` in `main.js` — follow existing markup.

## PostCSS pipeline notes

`postcss.config.js` runs (in order): `postcss-import` → `postcss-nested` → `autoprefixer` → `postcss-sorting` (SMACSS property order) → `cssnano` (only when `MINIFY_CSS=true`) → `postcss-custom-media`. New CSS should use nesting and custom media queries — they're supported.

## JS conventions

- Plain ES2020+, no bundler, no modules — everything attaches to `document`.
- Use `document.addEventListener('DOMContentLoaded', …)` for new init code, or extend `main.js`'s existing init function.
- Prefer querySelector / classList over libraries.

## What to avoid

- Don't edit `css/style.css` directly. It's compiled output.
- Don't introduce a framework, bundler, or TypeScript — this project intentionally stays static-HTML simple.
- Don't add new top-level HTML files without also creating the EN counterpart in `en/` (see `et-en-parity` skill).
- Don't inline styles in HTML when an existing partial in `src/partials/` is the right place.
