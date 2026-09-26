"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function MinisterCard() {
  const { content } = useLocale();
  const { minister, orgIdentity } = content;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-pb-line bg-white shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
      <div className="flex items-center gap-2 bg-gradient-to-r from-pb-green-deep to-pb-green px-4 py-3 text-[0.9375rem] font-bold text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
        {minister.role}
      </div>

      <div className="relative flex gap-4 p-4">
        <Image
          src={minister.photo}
          alt={minister.name}
          width={110}
          height={140}
          className="h-[140px] w-[110px] flex-none rounded-xl object-cover"
        />
        <div className="min-w-0 pt-1">
          <p className="text-[1.0625rem] font-extrabold leading-snug text-pb-green-deep">{minister.name}</p>
          <p className="mt-1.5 text-sm text-pb-ink">{minister.role}</p>
          <p className="text-sm text-pb-ink">{minister.ministry}</p>
          <p className="text-sm text-pb-ink">{orgIdentity.subtitle}</p>
          <Link href={minister.href} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-pb-green-deep hover:underline">
            {minister.detailsLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <svg className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 opacity-90" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M100 100 30 100 C55 95 75 75 80 50 C85 25 95 15 100 10Z" fill="#e8622c" opacity="0.9" />
          <path d="M100 100 45 100 C65 92 82 78 88 58 C92 42 98 30 100 22Z" fill="#00602a" opacity="0.85" />
          <path d="M100 100 60 100 C75 95 88 85 93 68 C96 55 99 45 100 38Z" fill="#f2b135" opacity="0.9" />
        </svg>
      </div>
    </section>
  );
}
