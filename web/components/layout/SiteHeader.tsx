"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

/**
 * Cream utility bar: brand lockup, search, language switcher, login.
 * This is the redesign built iteratively on the static mirror (site/assets/polish.css) — ported
 * here as the "real" version instead of a CSS overlay hack.
 */
export function SiteHeader() {
  const { content } = useLocale();
  const { orgIdentity, natPortal } = content;

  return (
    <header className="border-b border-pb-cream-line bg-pb-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* was a single <Link> wrapping the natportal <a> — invalid HTML (nested <a>), which Next
            flagged as a hydration error in dev. The logo+name link and the natportal link are now
            siblings instead of parent/child. */}
        <div className="flex items-center gap-3.5">
          <Link href="/" className="flex-none">
            <Image
              src={orgIdentity.logo}
              alt="Petrobangla emblem"
              width={68}
              height={68}
              className="h-[68px] w-[68px] object-contain"
              priority
            />
          </Link>
          <span className="flex flex-col gap-0.5">
            <Link
              href="/"
              className="max-w-[520px] text-[1.125rem] font-extrabold leading-[1.32] text-pb-green-deep"
            >
              {orgIdentity.name}
            </Link>
            <a href={natPortal.href} className="text-[0.8125rem] font-medium text-[#7a8a7e] hover:underline">
              {orgIdentity.badge}
            </a>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <SearchBox />
          <LanguageSwitch />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}

function SearchBox() {
  const { content } = useLocale();
  return (
    <form
      role="search"
      className="flex h-9 w-56 items-center rounded-full border border-pb-cream-line bg-white pl-4 pr-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-pb-green/20 sm:w-64"
    >
      <input
        type="search"
        placeholder={content.ui.searchPlaceholder}
        aria-label="Search the site"
        className="w-full bg-transparent text-sm text-pb-ink placeholder:text-[#9a9478] focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid h-7 w-7 flex-none place-items-center text-pb-green-deep"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}

function LanguageSwitch() {
  const { content, locale, toggleLocale } = useLocale();
  // The reference design shows this with no pill/border — just icon + text, the plainest element
  // in the row (search and Login are the only two actual "buttons"). It used to have no onClick at
  // all — purely decorative — which is what "not working" meant. toggleLocale actually swaps every
  // piece of text on the page to the other language's real content.
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
      className="flex items-center gap-1.5 rounded-lg px-1 py-1 text-sm font-semibold text-pb-green-deep transition-colors hover:bg-pb-green-deep/[0.06]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.5" />
        <ellipse cx="12" cy="12" rx="4" ry="9.5" />
        <path d="M2.5 12h19M4 7h16M4 17h16" />
      </svg>
      {content.ui.langSwitchLabel}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

function LoginButton() {
  // No auth backend exists in this rebuild yet — styled real element, honest placeholder href.
  const { content } = useLocale();
  return (
    <Link
      href="/login"
      className="flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-b from-pb-green to-pb-green-deep px-4 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,96,42,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_6px_14px_rgba(0,96,42,0.4)]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      {content.ui.login}
    </Link>
  );
}
