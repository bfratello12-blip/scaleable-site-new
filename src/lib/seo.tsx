import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/managed-growth". Use "/" for home. */
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = "/og.png",
  ogType = "website",
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${siteConfig.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Renders a JSON-LD block. Data is serialised server-side from trusted constants. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/scaleable-logo.svg`,
  description: siteConfig.description,
  email: siteConfig.contactEmail,
  sameAs: [siteConfig.softwareSiteUrl, siteConfig.shopifyAppUrl],
  founder: { "@type": "Person", name: siteConfig.founder },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  author,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  keywords?: string[];
}) {
  const url = `${siteConfig.url}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { "@type": "Person", name: author },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    image: `${siteConfig.url}/og.png`,
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
  };
}
