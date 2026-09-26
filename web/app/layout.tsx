import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bangladesh Oil, Gas and Mineral Corporation (Petrobangla)",
  description:
    "Bangladesh Oil, Gas and Mineral Corporation (Petrobangla) — Government of the People's Republic of Bangladesh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} h-full antialiased`}
      // A Chrome extension ("crxlauncher") injects attributes onto <html> before React hydrates —
      // visible in the dev overlay's diff as crxlauncher/crxlauncher-bridged appearing only on the
      // client. That's a real, common case React's own hydration-mismatch docs call out explicitly;
      // suppressHydrationWarning here tells React to ignore attribute diffs on this one element
      // rather than trying to "fix" attributes it never rendered in the first place.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-pb-cream">
        <LocaleProvider>
          <SiteHeader />
          <MainNav />
          {/* Decorative mandala-corner texture behind the whole main content area, tiled
              (bg-repeat) since one copy of the artwork is shorter than the page. */}
          <main className="flex-1 bg-[url('/images/section-bg-mobile.webp')] bg-repeat lg:bg-[url('/images/section-bg-desktop.webp')]">
            {children}
          </main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
