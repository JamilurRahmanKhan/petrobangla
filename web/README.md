# Petrobangla — Next.js rebuild

A proper Next.js + TypeScript + Tailwind CSS v4 rebuild of the Petrobangla homepage, built from the
real content in the static mirror at `../site/`. This replaces the CSS-overlay approach
(`site/assets/polish.css` / `polish.js`) with real, organized, typed React components — the
`site/` mirror is untouched and still works on its own.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. `npm run build && npm start` runs the production build; both are
verified clean (no TypeScript errors, no ESLint warnings, no React hydration warnings) as of this
commit.

## What this covers — and what it honestly doesn't

This is the **homepage only**, built from a one-time content extraction out of
`site/index.en.html` (captured 2026-09-21). It is **not** a 1:1 port of every widget the original
CMS platform supports. Specifically:

**Included, with real content (not placeholder copy):**
- Header: brand lockup, search box, language switcher, login button
- Main nav: all 12 top-level items, dropdown children with real hrefs
- Hero banner (3 real photos, auto-rotating)
- Daily gas production stat
- Notice Board (3 real notices, date-stamp badges, live "N new" count)
- Minister card
- All 10 service box sections, each with its real 4 links
- Video gallery (2 real videos, real YouTube thumbnails)
- **Bilingual (English/Bengali)** — every piece of text above has a real Bengali counterpart
  extracted from `site/index.bn.html`, not a machine translation. The language switcher in the
  header actually works (see below) — it used to be a decorative button with no click handler.

**Not included — real scope still on the static mirror (`../site/`), not this app:**
- The office-finder's live cascading dropdowns (Corporation → Head Office → Division…). The
  static mirror resolves these against pre-captured JSON in `site/ajax/` via `site/serve.py` —
  that data hasn't been wired into this app. Don't rebuild this without it; see
  `../site/README.md` for why `serve.py` matters (using a plain static server here breaks it the
  same way it broke the mirror early on).
- Any page other than the homepage (About Us, notices list, reports, etc.) — the nav links to
  real CMS paths that don't exist as routes in this app yet.
- Authentication — "Login" is a real, styled button linking to `/login`, which doesn't exist yet.
  There's no auth backend anywhere in this project.
- The full mega-menu widget's original multi-column/image layout — `MainNav.tsx` implements a
  simpler single-column dropdown with the same real links, not a pixel port of the CMS widget.
- Bilingual **routing** — locale here is client-side state (`lib/locale-context.tsx`), persisted to
  `localStorage`, not separate `/en` / `/bn` URLs or the mirror's cookie mechanism (see
  `serve.py`). Fine for a single homepage; if this grows into a multi-page app, that's the point to
  switch to real locale routes (e.g. `app/[locale]/...`) so pages are shareable/crawlable per
  language — the content in `lib/content.ts` is already structured to make that migration additive,
  not a rewrite.

## Structure

```
web/
├── app/
│   ├── layout.tsx        # SiteHeader + MainNav + SiteFooter wrapper, fonts, metadata
│   ├── page.tsx           # homepage — just composes the section components below
│   └── globals.css        # design tokens (ported 1:1 from site/assets/polish.css), Tailwind import
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx # cream utility bar
│   │   ├── MainNav.tsx    # white nav bar + dropdowns (client component — needs hover/click state)
│   │   └── SiteFooter.tsx
│   └── home/               # one component per homepage section, named for what it shows
│       ├── HeroBanner.tsx
│       ├── StatsStrip.tsx
│       ├── NoticeBoard.tsx
│       ├── MinisterCard.tsx
│       ├── ServiceBoxGrid.tsx
│       └── VideoGallery.tsx
├── lib/
│   ├── content.ts           # ALL real content lives here, bilingual — nav items, notices, service
│   │                        # links, hero slides, stats, minister info, in en/ and bn/ side by side.
│   │                        # Components import from this file rather than hardcoding strings, so
│   │                        # updating content (or adding a language) means editing one file.
│   └── locale-context.tsx  # useLocale() hook + the client-side language switch itself
└── public/images/          # copied real assets (logo, hero photos, service icons, minister photo)
```

**The rule this structure follows:** one file per visible section, named for what it shows, and
all real content centralized in `lib/content.ts` instead of scattered through JSX. If you're
looking for "what renders the notice list," it's `components/home/NoticeBoard.tsx` — no
`WidgetContainer3000` indirection to trace through.

## Design tokens

`app/globals.css` carries over the exact `--pb-*` custom properties from
`site/assets/polish.css` (green/gold/ink/line/tint palette, radii, shadows, easing curve) via
Tailwind v4's `@theme inline` block, exposed as `bg-pb-green`, `text-pb-green-deep`, etc. This
keeps the visual language consistent between the static mirror and this rebuild rather than
introducing a second, drifting palette.

## Extending this

To add a new homepage section: add its content shape + real data to `lib/content.ts`, add a
component in `components/home/`, import it in `app/page.tsx`. To add a new page: create
`app/<route>/page.tsx`; it'll automatically get the shared header/nav/footer from `app/layout.tsx`.
