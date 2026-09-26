# Petrobangla

Two things live in this repo, for two different purposes — read this before touching either.

## `site/` — the static mirror (original clone + design polish)

Self-hosted clone of https://petrobangla.org.bd/ — original markup, CSS, JS, fonts and images saved locally
(no hotlinks, analytics tag removed), so styling, animation and widget behavior match the source.

    python3 serve.py 4173      # then open http://localhost:4173

**Use `serve.py`, not a plain static server** (`python -m http.server` etc.) — it resolves the
office-finder widget's cascading dropdown data from pre-captured JSON in `site/ajax/`. A plain
server can't resolve those requests, which makes the office-finder retry/fail continuously and the
page feel like it's hanging — that's not a bug in the site, it's the wrong server.

- `site/` — the clone (index.en.html / index.bn.html + assets/, plus ajax/ JSON for the office-finder dropdowns)
- `serve.py` — static server that also resolves the office-finder `?query` data files and the bn/en cookie routing
- `tools/` — mirror + verification scripts (run with pwc's Python for Playwright)
- `evidence/` — screenshots at 375/768/1280/1440/1920 and three 1440 score runs
- `.pwc/run.json` — gate ledger and residuals

Interactive content (notice board, service boxes) is static as of capture (2026-09-21).
Live-only features (search, real backends) are not connected.

`site/assets/polish.css` and `polish.js` are a design layer loaded after the original styles
(linked at the end of `<head>`/`<body>` in `site/index.en.html` / `index.bn.html`). Remove those
two tags to get the untouched 1:1 clone back.

## `web/` — Next.js rebuild (homepage only)

A real Next.js + TypeScript + Tailwind app, built from the same real content as the mirror above,
replacing the CSS-overlay approach with proper typed components. **Homepage only** — see
`web/README.md` for exactly what's covered and what real scope (the office-finder's live data,
other pages, auth) is intentionally not ported yet.

    cd web && npm install && npm run dev

## Which one do I use?

- Need the full site (every page, every widget, the real office-finder) → `site/`
- Working on the homepage's design/structure, want a real component codebase to extend → `web/`
