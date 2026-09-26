"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { contentByLocale, type Locale } from "./content";

const STORAGE_KEY = "pb-locale";

/**
 * The whole point of this file: the language switcher used to be a button with no onClick handler
 * at all — purely decorative. This makes it real.
 *
 * Uses useSyncExternalStore (not useState + useEffect) to read the saved preference from
 * localStorage. That's not just style — reading localStorage in an effect and calling setState from
 * it causes an extra render pass after mount (React's own lint rule flags this: "avoid calling
 * setState directly within an effect"), and doing it via plain useState's lazy initializer would
 * hydration-mismatch instead (the server has no localStorage, so it can't render the real value on
 * the first pass). useSyncExternalStore is the built-in solution for exactly this case: render the
 * server-safe default ("en") for the SSR/hydration pass via getServerSnapshot, then let React
 * reconcile it against the real client value from getSnapshot — no manual effect, no mismatch.
 */
const listeners = new Set<() => void>();
let currentLocale: Locale = "en";

function readStoredLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

// Runs once, at module load, on the client only — not inside a React effect, so there's nothing
// for the "no setState in effect" rule to flag, and it's ready before React first calls getSnapshot.
if (typeof window !== "undefined") {
  currentLocale = readStoredLocale();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Locale {
  return currentLocale;
}

function getServerSnapshot(): Locale {
  return "en";
}

function setStoredLocale(next: Locale) {
  currentLocale = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Non-fatal if storage is unavailable (private browsing, blocked, etc.) — the toggle still
    // works for the rest of the session, it just won't be remembered on the next visit.
  }
  listeners.forEach((listener) => listener());
}

type LocaleContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  content: (typeof contentByLocale)["en"];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // This one's fine as an effect — it syncs the DOM's lang attribute (an external system), it
  // doesn't call setState, so it's not the pattern the lint rule above is about.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    setStoredLocale(locale === "en" ? "bn" : "en");
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, content: contentByLocale[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
