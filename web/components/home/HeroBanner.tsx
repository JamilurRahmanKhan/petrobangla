"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

export function HeroBanner() {
  const [active, setActive] = useState(0);
  const { content } = useLocale();
  const { heroSlides, orgIdentity, heroTagline } = content;

  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  const goTo = (i: number) => setActive((i + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative isolate min-h-[300px] overflow-hidden rounded-2xl shadow-[0_12px_32px_rgba(0,20,10,0.35)] sm:min-h-[340px]">
      {heroSlides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark green wash bleeding in from the left, carrying the brand block and copy. Spans the
          FULL width (not just the text column) with a long, gradual fade — the previous version
          capped the gradient's own box at the text column's width, so it hit "transparent" right
          at that edge and cut the photo in with a hard vertical seam instead of blending into it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            // Brand green tokens (--pb-green-ink/--pb-green-deep/--pb-green), not desaturated
            // grays — the previous stops drifted toward sage/khaki as alpha dropped because the
            // underlying hex wasn't saturated enough to read as green once blended with the
            // sunset photo. The later stops (45-60%) were also too transparent (as low as ~25%
            // alpha), so a bright sun/sky patch in some of the 3 rotating photos punched straight
            // through as a visible dull/washed-out blotch instead of reading as solid green —
            // raised those stops' opacity so the green stays dominant regardless of which photo
            // is underneath.
            "linear-gradient(100deg, #001008 0%, #002d15fa 18%, #00431ff2 32%, #005a29e6 45%, #005a29b8 58%, transparent 70%)",
        }}
      />
      {/* Same fade-to-transparent idea as the wash above: the pattern image itself is an opaque
          cream rectangle, so a flat box of it (even at partial opacity) still has a hard edge
          where the box ends. A mask fades that edge out instead of cutting it off. */}
      <div
        className="absolute inset-y-0 left-0 w-[55%] bg-no-repeat bg-left-bottom opacity-40"
        style={{
          backgroundImage: "url(/images/hero-pattern.webp)",
          backgroundSize: "620px auto",
          WebkitMaskImage: "linear-gradient(100deg, black 0%, black 40%, transparent 82%)",
          maskImage: "linear-gradient(100deg, black 0%, black 40%, transparent 82%)",
        }}
      />

      <div className="relative flex min-h-[300px] max-w-[600px] flex-col justify-center gap-3.5 px-6 py-10 sm:min-h-[340px] sm:px-10">
        <div className="flex items-center gap-3.5">
          <Image src={orgIdentity.logo} alt="" width={52} height={52} className="rounded-full bg-white/95 p-1 drop-shadow-lg" />
          <span className="max-w-[380px] text-[15px] font-bold leading-snug text-white drop-shadow">
            {orgIdentity.name}
          </span>
        </div>

        <h1 className="text-[26px] font-extrabold leading-[1.3] text-white drop-shadow-lg sm:text-[32px]">
          {heroTagline.headline}
        </h1>

        <span className="h-[3px] w-16 rounded bg-gradient-to-r from-[#e11d1d] via-pb-gold to-[#1a8f3e]" />

        <p className="max-w-[440px] text-[15px] font-medium leading-relaxed text-white/90 drop-shadow">
          {heroTagline.subtext}
        </p>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(active - 1)}
        className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 sm:left-5 sm:grid"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(active + 1)}
        className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 sm:right-5 sm:grid"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full border border-white/70 transition-all ${
              i === active ? "bg-[#e11d1d]" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
