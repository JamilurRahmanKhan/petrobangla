"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/lib/locale-context";

/**
 * Port of the live petrobangla.org.bd Accessibility widget: floating button + panel with font
 * size, monochrome, invert, big cursor, link/heading highlight, reading guide and reset, plus the
 * "skip to content / go to accessibility menu" keyboard links. Effects are CSS classes on <html>
 * (rules in globals.css); preferences persist in localStorage under the same keys the live site
 * uses, and survive reloads.
 */

type Settings = {
  monochrome: boolean;
  inverted: boolean;
  bigCursor: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  readingGuideCheckbox: boolean;
  fontSize: string | null;
};

const DEFAULTS: Settings = {
  monochrome: false,
  inverted: false,
  bigCursor: false,
  highlightLinks: false,
  highlightHeadings: false,
  readingGuideCheckbox: false,
  fontSize: null,
};

type BoolKey = Exclude<keyof Settings, "fontSize">;
const BOOL_KEYS: BoolKey[] = ["monochrome", "inverted", "bigCursor", "highlightLinks", "highlightHeadings", "readingGuideCheckbox"];

function readStored(): Settings {
  try {
    const next = { ...DEFAULTS };
    for (const k of BOOL_KEYS) next[k] = window.localStorage.getItem(k) === "true";
    next.fontSize = window.localStorage.getItem("fontSize");
    return next;
  } catch {
    return DEFAULTS;
  }
}

// Module-level store (same pattern as locale-context): read once on the client at load, so the
// panel's checkboxes reflect saved preferences without a setState-in-effect.
const listeners = new Set<() => void>();
let current: Settings = typeof window !== "undefined" ? readStored() : DEFAULTS;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function update(patch: Partial<Settings>) {
  current = { ...current, ...patch };
  try {
    for (const [k, v] of Object.entries(patch)) {
      if (v === null) window.localStorage.removeItem(k);
      else window.localStorage.setItem(k, String(v));
    }
  } catch {
    // Preferences just won't persist if storage is blocked.
  }
  listeners.forEach((l) => l());
}
function reset() {
  current = DEFAULTS;
  try {
    for (const k of BOOL_KEYS) window.localStorage.removeItem(k);
    window.localStorage.removeItem("fontSize");
  } catch {}
  listeners.forEach((l) => l());
}

export function AccessibilityWidget() {
  const { content } = useLocale();
  const t = content.accessibility;
  const settings = useSyncExternalStore(subscribe, () => current, () => DEFAULTS);
  const [open, setOpen] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Apply the effect classes and root font size to <html>.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("monochrome", settings.monochrome);
    root.classList.toggle("inverted", settings.inverted);
    root.classList.toggle("bigCursor", settings.bigCursor);
    root.classList.toggle("highlightLinks", settings.highlightLinks);
    root.classList.toggle("highlightHeadings", settings.highlightHeadings);
    root.style.fontSize = settings.fontSize ?? "";
  }, [settings]);

  // Reading guide: a thin highlighter line that follows the pointer.
  useEffect(() => {
    if (!settings.readingGuideCheckbox) return;
    const move = (e: MouseEvent) => {
      if (guideRef.current) guideRef.current.style.top = `${e.clientY}px`;
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [settings.readingGuideCheckbox]);

  // Esc closes the panel and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        fabRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const changeFont = (delta: number) => {
    const size = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (delta > 0 ? size < 32 : size > 8) update({ fontSize: `${size + delta}px` });
  };

  // Monochrome and invert are both whole-page filters, so they're mutually exclusive.
  const toggle = (key: BoolKey, checked: boolean) => {
    if (key === "monochrome" && checked) update({ monochrome: true, inverted: false });
    else if (key === "inverted" && checked) update({ inverted: true, monochrome: false });
    else update({ [key]: checked });
  };

  const openMenu = () => {
    setOpen(true);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("h3")?.focus());
  };

  const options: { key: BoolKey; label: string }[] = [
    { key: "monochrome", label: t.monochrome },
    { key: "inverted", label: t.invert },
    { key: "bigCursor", label: t.bigCursor },
    { key: "highlightLinks", label: t.highlightLinks },
    { key: "highlightHeadings", label: t.highlightHeadings },
    { key: "readingGuideCheckbox", label: t.readingGuide },
  ];

  return (
    <>
      <div className="fixed left-1/2 top-2.5 z-[99999] flex -translate-x-1/2 -translate-y-[150%] gap-3 transition-transform focus-within:translate-y-0">
        <a href="#main-content" className="rounded-full bg-pb-green px-5 py-2.5 text-sm text-white focus:bg-pb-green-deep">
          {t.skipToContent}
        </a>
        <a
          href="#accessibility-card-title"
          onClick={openMenu}
          className="rounded-full bg-pb-green px-5 py-2.5 text-sm text-white focus:bg-pb-green-deep"
        >
          {t.skipToMenu}
        </a>
      </div>

      <div className="fixed right-2 top-1/2 z-[1000] -translate-y-1/2">
        {open && (
          <div
            ref={panelRef}
            id="accessibility-card"
            role="dialog"
            aria-labelledby="accessibility-card-title"
            className="fixed right-16 top-1/2 max-h-[calc(100vh-2rem)] w-[250px] -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
          >
            <button
              type="button"
              aria-label={t.close}
              title={t.close}
              onClick={() => {
                setOpen(false);
                fabRef.current?.focus();
              }}
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-pb-ink"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6M9 9l6 6" />
              </svg>
            </button>
            <h3 id="accessibility-card-title" tabIndex={0} className="mb-2 pr-8 text-lg font-bold text-pb-ink">
              {t.title}
            </h3>

            <div className="flex gap-2 py-2.5">
              <button type="button" onClick={() => changeFont(2)} className="rounded px-2.5 py-1 text-sm text-pb-ink shadow-[0_1px_3px_rgba(0,0,0,0.02),0_0_0_1px_rgba(27,31,35,0.15)]">
                {t.fontIncrease}
              </button>
              <button type="button" onClick={() => changeFont(-2)} className="rounded px-2.5 py-1 text-sm text-pb-ink shadow-[0_1px_3px_rgba(0,0,0,0.02),0_0_0_1px_rgba(27,31,35,0.15)]">
                {t.fontDecrease}
              </button>
            </div>

            {options.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2 py-2.5">
                <input
                  id={`a11y-${key}`}
                  type="checkbox"
                  title={label}
                  checked={settings[key]}
                  onChange={(e) => toggle(key, e.target.checked)}
                  className="h-4 w-4 accent-pb-green"
                />
                <label htmlFor={`a11y-${key}`} className="cursor-pointer text-sm text-pb-ink">
                  {label}
                </label>
              </div>
            ))}

            <div className="py-2.5">
              <button type="button" onClick={reset} className="rounded px-2.5 py-1 text-sm text-pb-ink shadow-[0_1px_3px_rgba(0,0,0,0.02),0_0_0_1px_rgba(27,31,35,0.15)]">
                {t.reset}
              </button>
            </div>
            <a
              href="https://www.nvaccess.org/files/nvda/releases/2020.4/nvda_2020.4.exe"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-pb-ink underline"
            >
              {t.screenReader}
            </a>
          </div>
        )}

        <button
          ref={fabRef}
          type="button"
          aria-label={t.open}
          aria-expanded={open}
          title={t.open}
          onClick={() => (open ? setOpen(false) : openMenu())}
          className="grid h-11 w-11 place-items-center rounded-full bg-pb-green text-white shadow-[2px_2px_3px_#999] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pb-green"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="4" r="1.6" />
            <path d="M15.5 8.5v5h4l2 4.5" />
            <path d="M14 10.5H9.5M8.5 12.5a4.5 4.5 0 1 0 6 6" />
          </svg>
        </button>
      </div>

      {settings.readingGuideCheckbox && (
        <div
          ref={guideRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[999999] h-1 w-screen translate-y-2 bg-[rgb(209,223,14)]"
        />
      )}
    </>
  );
}
