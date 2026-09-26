"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

/**
 * White nav bar, dark-green links, "Home" as a solid pill with an underline rail — matches the
 * client-supplied reference design. Dropdowns are simple hover/click mega-menus, not a full port
 * of the original CMS's mega-menu widget (multi-column layout, images per section etc.) — that's
 * real scope the static mirror still has that this rebuild doesn't attempt yet (see README).
 *
 * Below `lg`, the two-row flex-wrap layout has no room for 12 items + Home and just wraps into a
 * cramped, hard-to-tap multi-line block. Below `lg` we swap to a single compact bar (Home + a
 * hamburger toggle) that opens a full-width accordion panel instead.
 */
const PRIMARY_ROW_COUNT = 8;

export function MainNav() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { content } = useLocale();
  const primaryRow = content.primaryNav.slice(0, PRIMARY_ROW_COUNT);
  const secondaryRow = content.primaryNav.slice(PRIMARY_ROW_COUNT);

  return (
    <nav className="relative z-20 border-t border-[#eef1ea] bg-white shadow-[0_2px_6px_rgba(0,30,15,0.05)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:hidden">
        <span className="relative inline-flex items-center pb-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-pb-green to-pb-green-deep px-[18px] py-[9px] text-sm font-bold text-white"
          >
            <HomeIcon />
            {content.homeLabel}
          </Link>
          <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-pb-green-deep" />
        </span>
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-10 w-10 flex-none place-items-center rounded-lg border border-pb-line text-pb-green-deep"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <ul className="max-h-[70vh] overflow-y-auto border-t border-[#f1f3ee] px-2 py-2 lg:hidden">
          {content.primaryNav.map((item, i) => (
            <MobileNavItem key={item.label} item={item} id={`m${i}`} openIndex={openIndex} setOpenIndex={setOpenIndex} onNavigate={() => setMobileOpen(false)} />
          ))}
        </ul>
      )}

      <ul className="mx-auto hidden max-w-7xl items-center gap-1 px-4 pt-2.5 pb-1.5 sm:px-6 lg:flex lg:flex-wrap">
        <li className="relative pb-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-pb-green to-pb-green-deep px-[18px] py-[9px] text-sm font-bold text-white"
          >
            <HomeIcon />
            {content.homeLabel}
          </Link>
          <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-pb-green-deep" />
        </li>

        {primaryRow.map((item, i) => (
          <NavItem
            key={item.label}
            item={item}
            id={`p${i}`}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-pb-green-deep hover:bg-pb-tint"
          />
        ))}
      </ul>

      {secondaryRow.length > 0 && (
        <ul className="mx-auto hidden max-w-7xl items-center gap-1 border-t border-[#f1f3ee] px-4 py-1.5 sm:px-6 lg:flex lg:flex-wrap">
          {secondaryRow.map((item, i) => (
            <NavItem
              key={item.label}
              item={item}
              id={`s${i}`}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              className="rounded-full px-3 py-1.5 text-[0.8125rem] font-medium text-[#5d7060] hover:bg-pb-tint hover:text-pb-green-deep"
            />
          ))}
        </ul>
      )}
    </nav>
  );
}

function NavItem({
  item,
  id,
  openIndex,
  setOpenIndex,
  className,
}: {
  item: { label: string; children: { label: string; href: string }[] };
  id: string;
  openIndex: string | null;
  setOpenIndex: (v: string | null | ((cur: string | null) => string | null)) => void;
  className: string;
}) {
  const isOpen = openIndex === id;
  return (
    <li
      className="relative"
      onMouseEnter={() => item.children.length && setOpenIndex(id)}
      onMouseLeave={() => setOpenIndex((cur) => (cur === id ? null : cur))}
    >
      <button
        type="button"
        className={`flex items-center gap-1.5 transition-colors ${className}`}
        aria-expanded={isOpen}
        onClick={() => item.children.length && setOpenIndex((cur) => (cur === id ? null : id))}
      >
        {item.label}
        {item.children.length > 0 && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? "rotate-180 transition-transform" : "transition-transform"}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>

      {item.children.length > 0 && isOpen && (
        <div className="absolute left-0 top-full z-30 min-w-[280px] rounded-lg border border-pb-line bg-white py-2 shadow-[0_18px_40px_rgba(0,40,20,0.18)]">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-pb-ink transition-colors hover:bg-pb-tint hover:text-pb-green-deep"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

function MobileNavItem({
  item,
  id,
  openIndex,
  setOpenIndex,
  onNavigate,
}: {
  item: { label: string; href?: string; children: { label: string; href: string }[] };
  id: string;
  openIndex: string | null;
  setOpenIndex: (v: string | null | ((cur: string | null) => string | null)) => void;
  onNavigate: () => void;
}) {
  const isOpen = openIndex === id;
  const hasChildren = item.children.length > 0;

  return (
    <li className="border-b border-[#f1f3ee] last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm font-semibold text-pb-green-deep"
        aria-expanded={isOpen}
        onClick={() => (hasChildren ? setOpenIndex((cur) => (cur === id ? null : id)) : onNavigate())}
      >
        {item.label}
        {hasChildren && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? "rotate-180 flex-none transition-transform" : "flex-none transition-transform"}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>
      {hasChildren && isOpen && (
        <ul className="bg-pb-tint/40 pb-1.5">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block px-6 py-2.5 text-sm text-pb-ink transition-colors hover:text-pb-green-deep"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
