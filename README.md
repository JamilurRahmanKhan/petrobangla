# Petrobangla front-end clone

Self-hosted mirror of https://petrobangla.org.bd/ — original markup, CSS, JS, fonts and images saved locally
(no hotlinks, analytics tag removed), so styling, animation and widget behavior match the source.

    python3 serve.py 4173      # then open http://localhost:4173

- `site/` — the clone (index.html + assets/, plus ajax/ JSON for the office-finder dropdowns)
- `serve.py` — static server that also resolves the office-finder `?query` data files
- `tools/` — mirror + verification scripts (run with pwc's Python for Playwright)
- `evidence/` — screenshots at 375/768/1280/1440/1920 and three 1440 score runs
- `.pwc/run.json` — gate ledger and residuals

Interactive content (notice board, service boxes) is static as of capture (2026-09-21).
Live-only features (search, real backends) are not connected.

## Design polish layer
`site/assets/polish.css` and `polish.js` are loaded after the original styles (linked at the end of `<head>`/`<body>` in `site/index.html`).
Remove those two tags to get the untouched 1:1 clone back. Adds: legible banner title clear of the logo, gradient header/nav with hover states,
rounded elevated cards, refined section headings, scroll-reveal (disabled for reduced-motion), gold focus rings.
