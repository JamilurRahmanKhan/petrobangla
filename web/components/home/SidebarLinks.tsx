"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

function LinkCard({
  title,
  icon,
  items,
  showAllHref,
  showAllLabel,
  external,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; href: string }[];
  showAllHref?: string;
  showAllLabel?: string;
  external?: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-pb-line bg-white shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
      <div className="flex items-center gap-2 bg-gradient-to-r from-pb-green-deep to-pb-green px-4 py-3 text-[0.9375rem] font-bold text-white">
        {icon}
        {title}
      </div>
      <ul className="divide-y divide-pb-line/60 px-2 py-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-3 px-2 py-2.5 text-sm font-medium text-pb-ink transition-colors hover:text-pb-green-deep"
            >
              <span className="min-w-0 flex-1">{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-[#8aa093] transition-transform group-hover:translate-x-1 group-hover:text-pb-green">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      {showAllHref && (
        <div className="p-3 pt-1">
          <Link
            href={showAllHref}
            className="flex items-center justify-center gap-2 rounded-full bg-pb-tint py-2.5 text-sm font-bold text-pb-green-deep transition-colors hover:bg-pb-tint/70"
          >
            {showAllLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

const MailIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const LinkIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" />
    <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5" />
  </svg>
);
const CompassIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="m16 8-2 6-6 2 2-6 6-2Z" />
  </svg>
);
const PhoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export function SidebarLinks() {
  const { content } = useLocale();
  const { ui, eServices, importantLinks, nationalAnthem, emergencyContacts, facebookUrl, imageBanners, innovationCorner, newWebsiteApplication } = content;

  return (
    <div className="flex flex-col gap-5">
      <LinkCard
        title={ui.internalEServices}
        icon={MailIcon}
        items={eServices}
        showAllHref="/pages/internal-eservices"
        showAllLabel={ui.showAll}
      />

      <div className="grid grid-cols-2 gap-3">
        {imageBanners.map((banner) => (
          <Link
            key={banner.src}
            href={banner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-xl border border-pb-line bg-white shadow-[0_10px_24px_-14px_rgba(0,60,30,0.22)] transition-transform hover:-translate-y-px"
          >
            <Image src={banner.src} alt={banner.alt} width={200} height={40} className="h-10 w-full object-contain p-1.5" unoptimized />
          </Link>
        ))}
      </div>

      <LinkCard
        title={ui.importantLinks}
        icon={LinkIcon}
        items={importantLinks}
        showAllHref="/pages/external-links"
        showAllLabel={ui.showAll}
        external
      />

      <LinkCard
        title={ui.innovationCorner}
        icon={CompassIcon}
        items={[{ label: innovationCorner.item, href: innovationCorner.itemHref }]}
        showAllHref={innovationCorner.showAllHref}
        showAllLabel={ui.showAll}
      />

      <section className="min-w-0 overflow-hidden rounded-2xl border border-pb-line bg-white p-4 shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
        <p className="mb-2 text-sm font-bold text-pb-green-deep">{nationalAnthem.label}</p>
        <audio controls src={nationalAnthem.src} className="block w-full min-w-0" />
      </section>

      <Link
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-2xl border border-pb-line bg-white px-4 py-3.5 shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)] transition-transform hover:-translate-y-px"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-pb-green-deep">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
          </svg>
          {ui.followUs}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pb-green">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>

      <section className="overflow-hidden rounded-2xl border border-pb-line bg-white shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)]">
        <div className="flex items-center gap-2 bg-gradient-to-r from-pb-green-deep to-pb-green px-4 py-3 text-[0.9375rem] font-bold text-white">
          {PhoneIcon}
          {ui.emergencyContact}
        </div>
        <ul className="divide-y divide-pb-line/60 px-2 py-1">
          {emergencyContacts.map((contact) => (
            <li key={contact.label}>
              <Link
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-2 py-2.5 text-sm font-medium text-pb-ink transition-colors hover:text-pb-green-deep"
              >
                <span className="min-w-0 flex-1">{contact.label}</span>
                <strong className="flex-none text-pb-green-deep">{contact.number}</strong>
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-3 pt-1">
          <Link
            href="https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-pb-tint py-2.5 text-sm font-bold text-pb-green-deep transition-colors hover:bg-pb-tint/70"
          >
            {ui.showAllEmergency}
          </Link>
        </div>
      </section>

      <Link
        href={newWebsiteApplication.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-pb-line bg-white px-4 py-3.5 text-center text-sm font-bold text-pb-green-deep shadow-[0_16px_36px_-16px_rgba(0,60,30,0.26)] transition-transform hover:-translate-y-px"
      >
        {newWebsiteApplication.label}
      </Link>

      <div className="rounded-2xl bg-gradient-to-br from-pb-green-deep to-[#00341c] p-5 text-center text-[0.9375rem] font-bold leading-snug text-white">
        {content.orgIdentity.subtitle}
      </div>
    </div>
  );
}
