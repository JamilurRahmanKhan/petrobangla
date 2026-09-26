"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

const UTILITY_ICONS = [
  <svg key="fb" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>,
  <svg key="faq" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.29c-.7.32-1 .9-1 1.71v.5" /><path d="M12 17h.01" /></svg>,
  <svg key="terms" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>,
  <svg key="contact" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" /><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5" /></svg>,
  <svg key="sitemap" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="9" y="15" width="6" height="6" rx="1" /><path d="M6 9v3a2 2 0 0 0 2 2h2m4 0h2a2 2 0 0 0 2-2V9" /></svg>,
  <svg key="privacy" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>,
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
  ),
};

export function SiteFooter() {
  const { content } = useLocale();
  const { orgIdentity, footer } = content;

  return (
    // bg-cover on a mobile-stacked footer (much taller than the wide source panorama) forced the
    // image to zoom in far past its intended size to cover the height, smearing it across the
    // content instead of sitting as a clean band at the bottom. bg-[length:100%_auto] keeps it at
    // its natural aspect ratio (full width, proportional height) — same technique as the page and
    // hero backgrounds — so it stays a fixed-size strip anchored to the bottom regardless of how
    // tall the stacked content grows.
    <footer className="relative overflow-hidden border-t border-pb-cream-line bg-pb-cream bg-[url('/images/footer-bg-mobile.webp')] bg-[length:100%_auto] bg-bottom bg-no-repeat pt-8 lg:bg-[url('/images/footer-bg-desktop.webp')]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Below `lg` this row's two children (the icon grid and the planning-credit block) don't
            both fit on one line, so the credit block wraps onto its own line — but a plain
            `flex justify-between` still treats the icon grid as "one of two items on a row" even
            when it's alone on its line, leaving it pinned left with the rest of the row empty
            instead of centered. Below `lg` we stack + center both blocks (grid place-items-center);
            at `lg` and up we go back to the original side-by-side row. */}
        <div className="grid grid-cols-1 place-items-center gap-8 pb-8 lg:flex lg:flex-wrap lg:items-start lg:justify-between lg:place-items-stretch">
          {/* A plain flex-wrap row let each item's own width (driven by its label length) decide
              wrapping, so the last row landed wherever it happened to fall instead of lining up
              under the columns above it. A fixed-column grid gives every item the same cell width,
              so rows always stay aligned regardless of label length. */}
          <ul className="grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-6">
            {footer.utilityLinks.map((link, i) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="group flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-pb-tint text-pb-green-deep transition-colors group-hover:bg-pb-green group-hover:text-white">
                    {UTILITY_ICONS[i]}
                  </span>
                  <span className="max-w-[80px] text-xs font-semibold leading-tight text-pb-ink">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="max-w-sm text-center text-xs text-[#5a6b61] lg:text-right">
            <p>{footer.planningCredit}</p>
            <p className="mt-2 font-semibold text-pb-green-deep">{footer.technicalSupportLabel}</p>
            <Image src="/images/footer-technical-support.svg" alt="Technical support partners" width={269} height={49} className="mx-auto mt-1 h-auto w-[220px] lg:ml-auto lg:mr-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-pb-cream-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image src={orgIdentity.logo} alt="" width={48} height={48} className="h-12 w-12 flex-none object-contain" />
              <div>
                <p className="text-[15px] font-extrabold leading-snug text-pb-green-deep">{orgIdentity.name}</p>
                <p className="text-xs text-[#5a6b61]">{orgIdentity.badge}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-pb-ink">{footer.tagline}</p>
            <div className="mt-4 flex items-center gap-2">
              <Link href={content.facebookUrl} target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-pb-green-deep text-white transition-transform hover:-translate-y-px">
                {SOCIAL_ICONS.facebook}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-pb-green-deep">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              {footer.quickLinksTitle}
            </h3>
            <ul className="mt-3 space-y-2">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-1.5 text-sm text-pb-ink transition-colors hover:text-pb-green-deep">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-pb-green">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-pb-green-deep">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              {footer.contactTitle}
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-pb-ink">
              <li className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none text-pb-green-deep"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                {footer.address}
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-pb-green-deep"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
                {footer.phone}
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-pb-green-deep"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                {footer.email}
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-pb-green-deep"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z" /></svg>
                {footer.website}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-pb-green-deep">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              {footer.lastUpdatedTitle}
            </h3>
            <LastUpdatedBadge />
          </div>
        </div>

        <p className="border-t border-pb-cream-line py-4 text-center text-xs text-[#5a6b61]">
          Content sourced from a local snapshot mirror captured 2026-09-21 — see the project README for scope.
        </p>
      </div>
    </footer>
  );
}

function LastUpdatedBadge() {
  const { locale } = useLocale();
  const formatted = new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl bg-pb-tint px-3 py-2.5 text-sm font-semibold text-pb-green-deep">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
      {/* The current timestamp is, by definition, never the same value the server rendered a
          moment earlier — suppressHydrationWarning is React's documented way to say "yes, this
          text is expected to differ after hydration," rather than fighting it with extra effects. */}
      <span suppressHydrationWarning>{formatted}</span>
    </div>
  );
}
