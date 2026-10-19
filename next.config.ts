import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain website to /out
// that can be hosted free on Vercel, Netlify or GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
