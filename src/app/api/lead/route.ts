import { NextResponse } from "next/server";
import { after } from "next/server";
import { Resend } from "resend";
import { escapeHtml, validateLead, type LeadPayload } from "@/lib/lead";
import { clientIpFromHeaders, createRateLimiter } from "@/lib/rate-limit";
import { clickIdFromCookieHeader, isValidClickId, isValidConversionId, parseScreenDimensions } from "@/lib/reddit";
import { hashRedditEmail, sendRedditCapiEvent } from "@/lib/reddit-capi";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.LEAD_TO_EMAIL?.trim() || siteConfig.contactEmail;
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL?.trim() || "ScaleAble Website <onboarding@resend.dev>";

// Small in-memory throttle. Enough to stop naive form spam on a single instance;
// put a WAF or edge rate limiter in front for anything heavier.
const rateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

function buildEmail(data: LeadPayload) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Store / Shopify URL", data.store],
    ["Monthly ad spend", data.adSpend],
    ["Channels running", data.channels.length ? data.channels.join(", ") : "—"],
    ["Submitted from", `${siteConfig.url}${data.sourcePath}`],
  ];

  const html = `<!doctype html><html><body style="margin:0;background:#f1f5fb;padding:28px;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;color:#0b1120">
<div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5ecf7;border-radius:14px;overflow:hidden">
<div style="background:#0b1120;padding:22px 26px">
  <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#68b4ff">New website lead</p>
  <h1 style="margin:6px 0 0;font-size:21px;color:#ffffff;font-weight:600">${escapeHtml(data.name)} — ${escapeHtml(data.store)}</h1>
</div>
<table role="presentation" style="width:100%;border-collapse:collapse">
${rows
  .map(
    ([label, value], i) => `<tr style="background:${i % 2 ? "#f7f9fd" : "#ffffff"}">
  <td style="padding:12px 26px;font-size:12px;color:#4d4d4d;width:180px;vertical-align:top">${escapeHtml(label)}</td>
  <td style="padding:12px 26px;font-size:14px;color:#0b1120">${escapeHtml(value)}</td>
</tr>`,
  )
  .join("")}
</table>
<div style="padding:20px 26px;border-top:1px solid #e5ecf7">
  <p style="margin:0 0 8px;font-size:12px;color:#4d4d4d">Message</p>
  <p style="margin:0;font-size:14px;line-height:1.65;white-space:pre-wrap">${escapeHtml(data.message)}</p>
</div>
</div></body></html>`;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  return { html, text };
}

export async function POST(request: Request) {
  const ip =
    clientIpFromHeaders(request) ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Too many submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, code: "invalid", errors: result.errors }, { status: 422 });
  }

  // Honeypot: accept silently so bots do not learn anything.
  if (result.data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY is not set — lead was not delivered by email.");
    return NextResponse.json(
      {
        ok: false,
        code: "email_not_configured",
        message: "Email delivery isn't configured yet.",
      },
      { status: 503 },
    );
  }

  const { html, text } = buildEmail(result.data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: result.data.email,
      subject: `New lead — ${result.data.name} (${result.data.adSpend})`,
      html,
      text,
    });

    if (error) {
      console.error("[lead] Resend rejected the message:", error);
      return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Unexpected error sending lead:", err);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  // Only reached once the lead itself succeeded. The conversion ID comes from
  // the browser so this event deduplicates against its pixel counterpart; if the
  // browser withheld it, no server copy is sent.
  const rawBody = body as Record<string, unknown>;
  if (isValidConversionId(rawBody.conversionId)) {
    const conversionId = rawBody.conversionId;
    const clickId = isValidClickId(rawBody.clickId)
      ? rawBody.clickId
      : clickIdFromCookieHeader(request.headers.get("cookie"));
    const eventAt = Date.now();
    const eventSourceUrl = `${siteConfig.url}${result.data.sourcePath}`;
    const userAgent = request.headers.get("user-agent");
    const ipAddress = clientIpFromHeaders(request);
    const screenDimensions = parseScreenDimensions(rawBody.screenWidth, rawBody.screenHeight);
    // The visitor's own address, hashed here and never logged. Lead events only.
    const hashedEmail = hashRedditEmail(result.data.email);

    after(async () => {
      await sendRedditCapiEvent({
        trackingType: "LEAD",
        conversionId,
        eventAt,
        eventSourceUrl,
        clickId,
        userAgent,
        ipAddress,
        screenDimensions,
        hashedEmail,
      });
    });
  }

  return NextResponse.json({ ok: true });
}
