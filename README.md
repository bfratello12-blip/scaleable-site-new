# ScaleAble — marketing site

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript. Built for Vercel.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | production | Canonical origin for metadata, sitemap and OG tags. |
| `NEXT_PUBLIC_BOOK_CALL_URL` | no | Scheduling link override. **Set this once** and every "Book a Call" CTA on the site updates. Defaults to `https://calendar.app.google/DipKGPYwU4EP6HK97`. |
| `RESEND_API_KEY` | yes, for the lead form | Server-side only. Without it `/api/lead` returns `503 email_not_configured` and the form falls back to a pre-filled `mailto:` link. |
| `LEAD_FROM_EMAIL` | no | Verified Resend sender. Defaults to the Resend onboarding sender. |
| `LEAD_TO_EMAIL` | no | Lead destination. Defaults to `hello@scaleableapp.com`. |
| `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_REDDIT_PIXEL_ID` | no | Tag scripts load only when an ID is present. No JS ships while they are empty. |

## Where to change things

| What | File |
| --- | --- |
| Email, pricing, Shopify app URL, booking URL, navigation, footer links | `src/lib/site.ts` |
| Managed service capabilities, pillars, onboarding steps | `src/content/services.ts` |
| Software modules and screenshot slots | `src/content/software.ts` |
| Case studies (currently placeholders) | `src/content/caseStudies.ts` |
| FAQs | `src/content/faqs.ts` |
| Brand colours, type scale, motion | `src/app/globals.css` (`@theme` block) |
| Lead email template and delivery | `src/app/api/lead/route.ts` |

## Replacing the placeholder content

**Case studies.** Everything in `src/content/caseStudies.ts` is illustrative. Replace the
metrics, chart series and narrative, then set `isPlaceholder: false` — the amber
"placeholder data" badges disappear automatically across the index and detail pages. Add a
`quote` object only once you have written client approval. Each study already has its own
detail page at `/results/[slug]` and is included in the sitemap.

**Imagery.** Every image slot renders an `<ImagePlaceholder />` that states what belongs
there, the recommended pixel size and the aspect ratio. Search for `ImagePlaceholder` to
find them all and swap each for a `next/image`.

**Logo.** `public/brand/scaleable-logo.svg` is the supplied master asset. The dark-surface
variant and the icon-only marks are derived from it — if the master is ever updated, re-run:

```bash
node tools/generate-logo-variants.mjs
```

## Analytics

CTAs carry `data-analytics-id` (stable event name) and `data-analytics-location`, so GTM or a
single delegated listener can capture conversions without editing components. Event names
live in `src/lib/analytics.ts`: `book_call_click`, `lead_form_submit`, `lead_generated`,
`pricing_cta_click`, `shopify_install_click`, `contact_cta_click`, `case_study_open`.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```
