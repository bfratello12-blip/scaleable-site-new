import Script from "next/script";
import { RedditCtaEvents } from "@/components/analytics/RedditCtaEvents";
import { RedditPageVisits } from "@/components/analytics/RedditPageVisits";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

// Reddit ships with its live ID so the pixel works without extra config; the
// env var still overrides it.
const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID?.trim() || "a2_jgph7mt5j91x";

/**
 * Loads tag scripts only when the matching env var is present, so the site
 * ships zero analytics JavaScript until real IDs are configured.
 * Meta CAPI and Reddit CAPI can be added the same way.
 */
export function Analytics() {
  const gtagId = GA4_ID || GOOGLE_ADS_ID;
  if (!gtagId && !META_PIXEL_ID && !REDDIT_PIXEL_ID) return null;

  return (
    <>
      {gtagId ? (
        <>
          <Script
            id="gtag-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());
${GA4_ID ? `gtag('config','${GA4_ID}');` : ""}${GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}`}
          </Script>
        </>
      ) : null}

      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {REDDIT_PIXEL_ID ? (
        <>
          <Script id="reddit-pixel" strategy="afterInteractive">
            {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=${REDDIT_PIXEL_ID}";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
rdt('init','${REDDIT_PIXEL_ID}');
(function(){function g(){try{if(self.crypto&&self.crypto.randomUUID)return self.crypto.randomUUID()}catch(e){}return 'rdt-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12)}rdt('track','PageVisit',{conversionId:g()})})();`}
          </Script>
          <RedditPageVisits />
          <RedditCtaEvents />
        </>
      ) : null}
    </>
  );
}
