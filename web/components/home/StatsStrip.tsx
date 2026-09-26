"use client";

import { useLocale } from "@/lib/locale-context";
import type { StatIcon } from "@/lib/content";

const ICON_STYLES: Record<StatIcon, string> = {
  flame: "bg-[#fdece3] text-[#e8622c]",
  drop: "bg-[#fdece3] text-[#d99a1f]",
  drill: "bg-[#fdf1de] text-pb-green-deep",
  factory: "bg-[#fdf1de] text-[#b98a3a]",
};

function StatIconGlyph({ icon }: { icon: StatIcon }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "flame":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c1 1 2 2.5 2 4.5A5 5 0 0 1 7 19c0-3 1.5-4 1.5-4S7 12.5 7 10c0-3 3-4 5-8Z" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2s6 7.2 6 12a6 6 0 1 1-12 0c0-4.8 6-12 6-12Z" />
        </svg>
      );
    case "drill":
      return (
        <svg {...common}>
          <path d="M6 21V9m0 0 3-5 3 5m-6 0h6m0 12V9m6 12v-7a3 3 0 0 0-3-3h-1" />
        </svg>
      );
    case "factory":
      return (
        <svg {...common}>
          <path d="M3 21V10l5 3v-3l5 3V8l5 3v10H3Z" />
          <path d="M8 21v-4h3v4" />
        </svg>
      );
  }
}

export function StatsStrip() {
  const { content } = useLocale();
  const { stats } = content;

  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-2xl border border-pb-line bg-white p-4 shadow-[0_10px_24px_-14px_rgba(0,60,30,0.22)]"
        >
          <span className={`grid h-12 w-12 flex-none place-items-center rounded-full ${ICON_STYLES[stat.icon]}`}>
            <StatIconGlyph icon={stat.icon} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-pb-green-deep">{stat.label}</p>
            {stat.sublabel && <p className="truncate text-xs text-[#8a9187]">{stat.sublabel}</p>}
            <p className="mt-0.5 text-xl font-extrabold text-pb-ink">{stat.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
