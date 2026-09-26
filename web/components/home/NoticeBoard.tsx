"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

// Reference design color-codes the category pill per notice type. Our real notices carry the CMS
// export's generic "Common" tag, so content.ts overrides that second tag with the more specific
// category each title itself states — Tender for the LNG notice, Promotion and Posting for the
// two office orders (they're different actions, so they get different tags/colors, not one
// shared "Office Order" bucket) — real categorization, not an invented one.
const TAG_STYLES: Record<string, string> = {
  Tender: "bg-[#fdece9] text-[#c23b2b]",
  টেন্ডার: "bg-[#fdece9] text-[#c23b2b]",
  Report: "bg-[#e8f1fd] text-[#2361b8]",
  প্রতিবেদন: "bg-[#e8f1fd] text-[#2361b8]",
  Promotion: "bg-[#e9f7ee] text-[#1f8a4c]",
  পদোন্নতি: "bg-[#e9f7ee] text-[#1f8a4c]",
  Recruitment: "bg-[#e9f7ee] text-[#1f8a4c]",
  নিয়োগ: "bg-[#e9f7ee] text-[#1f8a4c]",
  Posting: "bg-[#f2ecfb] text-[#6b3fb8]",
  পদায়ন: "bg-[#f2ecfb] text-[#6b3fb8]",
  Event: "bg-[#f2ecfb] text-[#6b3fb8]",
  অনুষ্ঠান: "bg-[#f2ecfb] text-[#6b3fb8]",
};
const DEFAULT_TAG_STYLE = "bg-[#eef1ef] text-[#5f6b64]";

export function NoticeBoard() {
  const { content } = useLocale();
  const { notices, ui } = content;

  return (
    <section className="overflow-hidden rounded-2xl border border-pb-line bg-white shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
      <div className="flex items-center justify-between bg-white py-1 pr-4">
        {/* Ribbon-shaped title badge: a diagonal-cut green tag with a thin gold sliver along the
            cut edge, instead of a plain full-width bar — the gold sliver is a wider, identically
            clipped shape sitting behind the green one so only its extra width peeks out. */}
        <div className="relative inline-flex">
          <span
            aria-hidden
            className="absolute inset-y-0 -right-2.5 left-0 bg-pb-gold [clip-path:polygon(0_0,100%_0,calc(100%-22px)_100%,0_100%)]"
          />
          <span className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-pb-green-deep to-pb-green py-3 pl-4 pr-9 text-[0.9375rem] font-bold text-white [clip-path:polygon(0_0,100%_0,calc(100%-22px)_100%,0_100%)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 11 18-5v12L3 14v-3Z" />
              <path d="M7 14v5a2 2 0 0 0 2 2h1v-6" />
            </svg>
            {ui.noticeBoard}
          </span>
        </div>
        <Link href="/pages/notices" className="flex items-center gap-1 text-sm font-semibold text-pb-green-deep hover:underline">
          {ui.showAllNotices}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <ul className="divide-y divide-pb-line/60 px-2">
        {notices.map((notice) => {
          const [day, month] = notice.date.split("-");
          return (
            <li key={notice.href}>
              <Link
                href={notice.href}
                className="group flex items-start gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-pb-tint/50"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[#fbe1db] text-center">
                  <span className="flex flex-col items-center leading-none">
                    <span className="text-[1rem] font-extrabold text-[#d1372a]">{day}</span>
                    <span className="mt-0.5 text-[0.59375rem] font-bold uppercase text-[#d1372a]">{month}</span>
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-bold text-pb-green-deep">
                    {notice.title}
                  </span>
                  <span className="mt-1 block truncate text-[0.8125rem] text-[#7a857e]">{notice.description}</span>
                </span>
                {notice.tags[1] && (
                  <span className={`mt-1 flex-none rounded-full px-3 py-1.5 text-[0.75rem] font-semibold ${TAG_STYLES[notice.tags[1]] ?? DEFAULT_TAG_STYLE}`}>
                    {notice.tags[1]}
                  </span>
                )}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1.5 flex-none text-[#8aa093] transition-transform group-hover:translate-x-1 group-hover:text-pb-green">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
