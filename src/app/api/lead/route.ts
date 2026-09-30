import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml, validateLead, type LeadPayload } from "@/lib/lead";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.LEAD_TO_EMAIL?.trim() || siteConfig.contactEmail;
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL?.trim() || "ScaleAble Website <onboarding@resend.dev>";

// Small in-memory throttle. Enough to stop naive form spam on a single instance;
// put a WAF or edge rate limiter in front for anything heavier.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

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
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
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

  return NextResponse.json({ ok: true });
}
