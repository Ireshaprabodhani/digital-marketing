import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import { site } from "@/lib/site";

const description =
  "Google Maps, Facebook, Instagram and websites for restaurants, salons and local businesses in Sri Lanka. Free audit in Sinhala or English.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.brandName} | Digital marketing for Sri Lankan businesses`,
  description,
  openGraph: {
    title: site.brandName,
    description,
    type: "website",
    locale: "en_LK",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2668",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
