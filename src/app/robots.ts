import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Preview and staging deployments must not be indexed. On Vercel, VERCEL_ENV is
 * "production" only for the production deployment; anything else (preview,
 * development) is blocked. Outside Vercel the variable is absent, so local and
 * self-hosted production builds keep the normal rules.
 */
const vercelEnv = process.env.VERCEL_ENV;
const isIndexable = !vercelEnv || vercelEnv === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
