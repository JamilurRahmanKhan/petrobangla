"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function VideoGallery() {
  const { content } = useLocale();
  const { videos, ui } = content;

  return (
    <section className="overflow-hidden rounded-2xl border border-pb-line bg-white shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
      <div className="flex items-center justify-between bg-gradient-to-r from-pb-green-deep to-pb-green px-4 py-3">
        <span className="flex items-center gap-2 text-[15px] font-bold text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M8 5v14l11-7z" />
          </svg>
          {ui.videoGallery}
        </span>
        <Link href="/pages/video-galleries" className="flex items-center gap-1 text-sm font-semibold text-white/95 hover:underline">
          {ui.showAllVideos}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
        {videos.map((video) => (
          <article
            key={video.title}
            className="overflow-hidden rounded-xl border border-pb-line bg-white shadow-[0_16px_32px_-12px_rgba(0,20,10,0.18)] transition-transform hover:-translate-y-1"
          >
            <div className="relative h-[205px] w-full border-t-[3px] border-pb-gold bg-[#e3ece6]">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, 380px"
                className="object-cover"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-[58px] w-[58px] place-items-center rounded-full border-2 border-white bg-black/55">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </div>
            <p className="px-3 py-3 text-[16.5px] font-bold text-pb-ink">{video.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
