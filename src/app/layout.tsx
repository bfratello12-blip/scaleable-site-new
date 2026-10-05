import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ScaleAble — Profit-First Paid Media for Shopify Brands",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "ScaleAble — Profit-First Paid Media for Shopify Brands",
    description: siteConfig.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScaleAble — Profit-First Paid Media for Shopify Brands",
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1120",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-dvh bg-white antialiased">
        <ChromeGate>
          <SiteHeader />
        </ChromeGate>
        <main id="main">{children}</main>
        <ChromeGate>
          <SiteFooter />
        </ChromeGate>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Analytics />
      </body>
    </html>
  );
}
