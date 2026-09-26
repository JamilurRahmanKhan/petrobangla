"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

export function PhotoGallery() {
  const { content } = useLocale();
  const { photoGallery } = content;
  const [active, setActive] = useState(0);

  const goTo = (i: number) => setActive((i + photoGallery.length) % photoGallery.length);
  const current = photoGallery[active];

  return (
    <section className="overflow-hidden rounded-2xl border border-pb-line bg-white shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
      <div className="relative h-[260px] w-full sm:h-[380px]">
        <Image src={current.src} alt={current.caption} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" priority />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-10">
          <p className="text-lg font-bold text-white">{current.caption}</p>
          <p className="mt-1 text-xs font-semibold text-white/80">
            {String(active + 1).padStart(2, "0")} / {String(photoGallery.length).padStart(2, "0")}
          </p>
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(active - 1)}
          className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(active + 1)}
          className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {photoGallery.map((slide, i) => (
            <button
              key={slide.src}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-all ${i === active ? "bg-pb-gold" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 overflow-x-auto p-3">
        {photoGallery.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setActive(i)}
            aria-label={slide.caption}
            className={`relative h-16 w-24 flex-none overflow-hidden rounded-lg border-2 transition-colors ${
              i === active ? "border-pb-green-deep" : "border-transparent"
            }`}
          >
            <Image src={slide.src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
