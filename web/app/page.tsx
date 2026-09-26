import { HeroBanner } from "@/components/home/HeroBanner";
import { StatsStrip } from "@/components/home/StatsStrip";
import { NoticeBoard } from "@/components/home/NoticeBoard";
import { MinisterCard } from "@/components/home/MinisterCard";
import { ParticipationBanner } from "@/components/home/ParticipationBanner";
import { OfficialsColumn } from "@/components/home/OfficialsColumn";
import { ServiceBoxGrid } from "@/components/home/ServiceBoxGrid";
import { VideoGallery } from "@/components/home/VideoGallery";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { SidebarLinks } from "@/components/home/SidebarLinks";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <HeroBanner />
      <StatsStrip />

      {/* One grid for the whole lower page, not three separate ones. Three separate grids meant
          that on mobile (single column) the right-rail content — Minister, Officials, Sidebar —
          got split apart by whatever main-column content (Services, Photo/Video Gallery) happened
          to sit between them in each grid, leaving what looked like a blank gap between e.g. the
          Chairman card and the Internal eServices card. One grid with two flex-col columns keeps
          the rail content contiguous, so it stacks directly on top of itself on mobile. */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <NoticeBoard />
          <ServiceBoxGrid />
          <PhotoGallery />
          <VideoGallery />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <MinisterCard />
          <ParticipationBanner />
          <OfficialsColumn />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
}
