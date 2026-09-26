"use client";

import { useLocale } from "@/lib/locale-context";

/**
 * Decorative promo card below the minister card — the reference design's illustration is custom
 * artwork we don't have an asset for, so this is built from CSS/SVG shapes in the same brand
 * palette rather than a fabricated stock photo.
 */
export function ParticipationBanner() {
  const { content } = useLocale();
  const { participationBanner } = content;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pb-green-deep to-[#00341c] p-5">
      <p className="relative z-10 max-w-[220px] text-[15px] font-bold leading-snug text-white">
        {participationBanner.headline}
      </p>

      <svg
        className="absolute bottom-0 right-0 h-full w-full opacity-90"
        viewBox="0 0 300 160"
        preserveAspectRatio="xMaxYMax slice"
        aria-hidden="true"
      >
        <path d="M180 160V70l14-14 14 14v90Z" fill="#0a4a28" />
        <path d="M215 160V50l10-10 10 10v110Z" fill="#0a4a28" />
        <circle cx="245" cy="45" r="6" fill="#f2b135" />
        <path d="M245 45v-20" stroke="#f2b135" strokeWidth="2" />
        <path d="M120 160c10-40 20-55 45-70" stroke="#2f7a4a" strokeWidth="3" fill="none" />
        <ellipse cx="150" cy="95" rx="16" ry="9" fill="#2f7a4a" />
        <ellipse cx="170" cy="70" rx="14" ry="8" fill="#37884f" />
        <ellipse cx="130" cy="120" rx="18" ry="10" fill="#2f7a4a" />
      </svg>
    </section>
  );
}
