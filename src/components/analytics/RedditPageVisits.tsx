"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackRedditPageVisit } from "@/lib/reddit";

/**
 * Module scope, not a ref: Strict Mode remounts effects, and a per-mount guard
 * gets consumed by the first pass and fires a duplicate on the second.
 */
let lastTrackedPath: string | null = null;

/**
 * The inline pixel already fires PageVisit for the initial load, so the first
 * pathname is only recorded here. Search params are deliberately not watched:
 * it would force every page out of static rendering.
 */
export function RedditPageVisits() {
  const pathname = usePathname();

  useEffect(() => {
    if (lastTrackedPath === null) {
      lastTrackedPath = pathname;
      return;
    }
    if (lastTrackedPath === pathname) return;

    lastTrackedPath = pathname;
    trackRedditPageVisit();
  }, [pathname]);

  return null;
}
