"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isLandingRoute } from "@/lib/site";

/**
 * Hides the shared footer on landing routes so the page ends on the lead form.
 * The header stays on every route, so visitors can always reach the rest of
 * the site. Done here rather than with multiple root layouts so the site keeps
 * a single `<html>`/`<body>` and one analytics mount.
 */
export function FooterGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isLandingRoute(pathname)) return null;
  return <>{children}</>;
}
