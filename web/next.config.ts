import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Silences "ignored package-lock.json outside the current Git repository" — this app lives in a
  // subfolder (web/) of the petrobangla repo, which also has its own lockfile-less static mirror
  // (site/) at the root; telling Turbopack this folder is the real root avoids it scanning upward.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // YouTube thumbnails for the video gallery — the only remote images this rebuild uses;
    // everything else (logo, hero photos, service icons, minister photo) is copied into public/.
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },
};

export default nextConfig;
