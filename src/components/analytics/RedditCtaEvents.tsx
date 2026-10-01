"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { REDDIT_CUSTOM_EVENTS, trackRedditCustom } from "@/lib/reddit";
import { BOOK_CALL_URL, siteConfig } from "@/lib/site";

/**
 * One delegated listener rather than per-component handlers: it also catches the
 * footer and nav links that carry no data-analytics-id, and a single click can
 * only ever produce one event regardless of nesting.
 */
export function RedditCtaEvents() {
  useEffect(() => {
    const shopifyHost = (() => {
      try {
        return new URL(siteConfig.shopifyAppUrl).host;
      } catch {
        return null;
      }
    })();

    function isShopifyAppLink(href: string) {
      if (!href || !shopifyHost) return false;
      try {
        return new URL(href, window.location.href).host === shopifyHost;
      } catch {
        return false;
      }
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const analyticsId =
        target.closest("[data-analytics-id]")?.getAttribute("data-analytics-id") ?? "";
      const href = target.closest("a[href]")?.getAttribute("href") ?? "";
      if (!analyticsId && !href) return;

      if (analyticsId === ANALYTICS_EVENTS.bookCall || (href && href === BOOK_CALL_URL)) {
        trackRedditCustom(REDDIT_CUSTOM_EVENTS.bookCallClick);
        return;
      }

      if (analyticsId === ANALYTICS_EVENTS.shopifyInstall || isShopifyAppLink(href)) {
        trackRedditCustom(REDDIT_CUSTOM_EVENTS.shopifyInstallClick);
      }
    }

    // Capture phase so the event is still observed if a handler stops propagation.
    // Nothing here calls preventDefault, so navigation and target="_blank" are untouched.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
