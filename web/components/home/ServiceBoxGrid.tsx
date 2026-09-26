"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

// One themed line-icon per service box, keyed by the box's (locale-stable) image path rather
// than its title — titles change per locale, image paths don't. Kept as inline SVG, matching the
// icon style used everywhere else in this app (StatsStrip, MainNav, etc.) instead of pulling in a
// second icon library.
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "/images/services/about-us.jpg": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="7" r="2.3" /><path d="M15.5 12.2c2.4.4 4.5 2.5 4.5 5.8" />
    </svg>
  ),
  "/images/services/companies-under-petrobangla.jpg": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21V9l3-4 3 4v12" /><path d="M12 21V11l3-3 3 3v10" /><path d="M2 21h20" />
    </svg>
  ),
  "/images/services/model-psc-amp-block-map.jpg": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  "/images/services/official-order.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h2" />
    </svg>
  ),
  "/images/services/national-integrity-strategy.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  "/images/services/citizen-39-s-charter.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15 8.5c1.3 0 2.3 1 2.3 2.3S16.3 13 15 13" /><path d="M21 20c0-2.6-1.7-4.7-4-5.5" />
    </svg>
  ),
  "/images/services/gpms.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M7 16v-4M12 16V8M17 16v-7" />
    </svg>
  ),
  "/images/services/grievance-redress-system-instructions.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 9 9 0 0 1-3.6-.9L3 20l1.1-4a8.3 8.3 0 0 1-.9-3.8A8.4 8.4 0 0 1 12 3.3a8.5 8.5 0 0 1 9 8.2Z" />
      <path d="M12 9v3.5M12 15.5h.01" />
    </svg>
  ),
  "/images/services/rti.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5" /><path d="M12 11v6M12 7.5h.01" />
    </svg>
  ),
  "/images/services/innovation-corner.png": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4" /><path d="M12 2a6.5 6.5 0 0 0-3.6 11.9c.6.4 1 1.1 1 1.9v.2h5.2v-.2c0-.8.4-1.5 1-1.9A6.5 6.5 0 0 0 12 2Z" />
    </svg>
  ),
};
const DEFAULT_ICON = SERVICE_ICONS["/images/services/official-order.png"];

export function ServiceBoxGrid() {
  const { content } = useLocale();
  const { serviceBoxes, ui } = content;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-pb-gold">
          <path d="M12 2c1 3 3 5 6 6-3 1-5 3-6 6-1-3-3-5-6-6 3-1 5-3 6-6Z" />
        </svg>
        <h2 className="border-b-2 border-pb-gold pb-1 text-xl font-extrabold text-pb-green-deep">{ui.services}</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {serviceBoxes.map((box) => {
          const icon = SERVICE_ICONS[box.image] ?? DEFAULT_ICON;
          return (
            <article
              key={box.title}
              className="relative overflow-hidden rounded-2xl border border-pb-line bg-white/90 p-4 shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)] backdrop-blur-[1px] transition-transform hover:-translate-y-1"
            >
              <span className="pointer-events-none absolute -bottom-3 -right-3 h-28 w-28 text-pb-green opacity-[0.09]">
                {icon}
              </span>

              <div className="relative flex items-center gap-3">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#fdf1de] text-pb-green-deep">
                  <span className="h-6 w-6">{icon}</span>
                </span>
                <h3 className="text-[16px] font-bold text-pb-ink">{box.title}</h3>
              </div>

              <ul className="relative mt-3 space-y-2">
                {box.items.map((item) => (
                  <li key={item.href} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-2 w-2 flex-none rotate-45 bg-pb-gold" />
                    <Link
                      href={item.href}
                      className="text-sm leading-relaxed text-pb-ink transition-colors hover:text-pb-green hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={box.items[0]?.href ?? "#"}
                className="relative mt-3 inline-flex items-center gap-1 text-sm font-bold text-pb-green-deep hover:underline"
              >
                {ui.viewDetails}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-pb-gold" />
            </article>
          );
        })}
      </div>

      <Link
        href="/pages/services"
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-pb-green to-pb-green-deep py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(0,96,42,0.25)] transition-transform hover:-translate-y-px"
      >
        {ui.showAllServices}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </section>
  );
}
