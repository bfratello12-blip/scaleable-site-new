"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isBareRoute } from "@/lib/site";

/**
 * Suppresses the shared header and footer on standalone landing routes.
 * Done here rather than with multiple root layouts so the rest of the site
 * keeps a single `<html>`/`<body>` and one analytics mount.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isBareRoute(pathname)) return null;
  return <>{children}</>;
}
