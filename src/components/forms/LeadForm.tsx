"use client";

import { usePathname } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { ANALYTICS_EVENTS, pushEvent } from "@/lib/analytics";
import { AD_SPEND_BANDS, CHANNEL_OPTIONS } from "@/lib/lead";
import { newConversionId, trackRedditLead } from "@/lib/reddit";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  store: string;
  adSpend: string;
  channels: string[];
  message: string;
  website: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  store: "",
  adSpend: "",
  channels: [],
  message: "",
  website: "",
};

export function LeadForm({
  tone = "light",
  compact = false,
  className,
  location = "contact_page",
}: {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
  location?: string;
}) {
  const pathname = usePathname();
  const uid = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string | null>(null);
  // Ref, not `status`: two submits in the same tick would both read a stale "idle".
  const submitting = useRef(false);

  const isDark = tone === "dark";

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const toggleChannel = (channel: string) => {
    set(
      "channels",
      form.channels.includes(channel)
        ? form.channels.filter((c) => c !== channel)
        : [...form.channels, channel],
    );
  };

  const buildMailto = () =>
    `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
      `Growth enquiry — ${form.store || form.name}`,
    )}&body=${encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Store / Shopify URL: ${form.store}`,
        `Monthly ad spend: ${form.adSpend}`,
        `Channels: ${form.channels.join(", ") || "—"}`,
        "",
        form.message,
      ].join("\n"),
    )}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;

    setStatus("submitting");
    setErrors({});
    setFallback(null);
    pushEvent(ANALYTICS_EVENTS.leadFormSubmit, { location });

    // One ID per attempt: a retry is a new attempt and gets a new ID.
    const conversionId = newConversionId();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourcePath: pathname }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: Record<string, string>;
      };

      if (response.ok && data.ok) {
        setStatus("success");
        pushEvent(ANALYTICS_EVENTS.leadFormSuccess, { location });
        trackRedditLead(conversionId);
        return;
      }

      if (data.errors) setErrors(data.errors);
      if (data.code === "email_not_configured") setFallback(buildMailto());
      setStatus("error");
    } catch {
      setFallback(buildMailto());
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-3xl border p-8 sm:p-10",
          isDark ? "border-white/12 bg-white/[0.04]" : "border-ink-900/10 bg-white shadow-lift",
          className,
        )}
        role="status"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-profit-500/15 text-profit-500">
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4 10.5 4 4 8-9" />
          </svg>
        </span>
        <h3 className={cn("text-2xl", isDark ? "text-white" : "text-ink-900")}>Got it — thank you.</h3>
        <p className={cn("max-w-md text-[0.95rem] leading-relaxed", isDark ? "text-white/60" : "text-ink-900/65")}>
          We read every enquiry personally and reply within one business day. If it is urgent, email{" "}
          <a className="underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldBase = cn(
    "w-full rounded-xl border px-4 text-[0.95rem] outline-none transition-[border-color,background-color,box-shadow] duration-200",
    isDark
      ? "border-white/14 bg-white/[0.05] text-white placeholder:text-white/35 focus:border-brand-400/70 focus:bg-white/[0.08]"
      : "border-ink-900/12 bg-mist-50 text-ink-900 placeholder:text-ink-900/35 focus:border-brand-600/60 focus:bg-white",
  );
  const labelBase = cn(
    "mb-2 block text-[0.78rem] font-medium uppercase tracking-[0.1em]",
    isDark ? "text-white/55" : "text-ink-900/55",
  );

  const errorText = (key: string) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-1.5 text-[0.78rem] text-danger-400">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-analytics-id={ANALYTICS_EVENTS.leadFormSubmit}
      data-analytics-location={location}
      className={cn(
        "rounded-3xl border p-6 sm:p-8",
        isDark ? "border-white/12 bg-white/[0.035]" : "border-ink-900/10 bg-white shadow-lift",
        className,
      )}
    >
      <div className={cn("grid gap-5", compact ? "" : "sm:grid-cols-2")}>
        <div>
          <label className={labelBase} htmlFor={`${uid}-name`}>
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={cn(fieldBase, "h-12")}
            placeholder="Alex Mercer"
          />
          {errorText("name")}
        </div>

        <div>
          <label className={labelBase} htmlFor={`${uid}-email`}>
            Work email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={cn(fieldBase, "h-12")}
            placeholder="alex@yourbrand.com"
          />
          {errorText("email")}
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelBase} htmlFor={`${uid}-store`}>
            Store / Shopify URL
          </label>
          <input
            id={`${uid}-store`}
            name="store"
            autoComplete="organization"
            required
            value={form.store}
            onChange={(e) => set("store", e.target.value)}
            aria-invalid={Boolean(errors.store)}
            aria-describedby={errors.store ? `${uid}-store-error` : undefined}
            className={cn(fieldBase, "h-12")}
            placeholder="yourbrand.com"
          />
          {errorText("store")}
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelBase} htmlFor={`${uid}-spend`}>
            Current monthly ad spend
          </label>
          <div className="relative">
            <select
              id={`${uid}-spend`}
              name="adSpend"
              required
              value={form.adSpend}
              onChange={(e) => set("adSpend", e.target.value)}
              aria-invalid={Boolean(errors.adSpend)}
              aria-describedby={errors.adSpend ? `${uid}-adSpend-error` : undefined}
              className={cn(fieldBase, "h-12 appearance-none pr-10", form.adSpend === "" && (isDark ? "text-white/40" : "text-ink-900/40"))}
            >
              <option value="" disabled>
                Select a range
              </option>
              {AD_SPEND_BANDS.map((band) => (
                <option key={band} value={band} className="text-ink-900">
                  {band}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className={cn(
                "pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2",
                isDark ? "text-white/45" : "text-ink-900/40",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </div>
          {errorText("adSpend")}
        </div>

        <fieldset className={compact ? "" : "sm:col-span-2"}>
          <legend className={labelBase}>Currently running</legend>
          <div className="flex flex-wrap gap-2">
            {CHANNEL_OPTIONS.map((channel) => {
              const active = form.channels.includes(channel);
              return (
                <label
                  key={channel}
                  className={cn(
                    "cursor-pointer select-none rounded-full border px-4 py-2 text-[0.85rem] transition-colors duration-200",
                    active
                      ? "border-brand-600 bg-brand-700 text-white"
                      : isDark
                        ? "border-white/14 bg-white/[0.04] text-white/70 hover:border-white/30"
                        : "border-ink-900/12 bg-mist-50 text-ink-900/70 hover:border-brand-600/40",
                  )}
                >
                  <input
                    type="checkbox"
                    name="channels"
                    value={channel}
                    checked={active}
                    onChange={() => toggleChannel(channel)}
                    className="sr-only"
                  />
                  {channel}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelBase} htmlFor={`${uid}-message`}>
            What are you trying to fix?
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            className={cn(fieldBase, "resize-y py-3")}
            placeholder="Spend is growing but profit isn't. We're running Shopping and Meta, and we can't tell which products are actually worth pushing."
          />
          {errorText("message")}
        </div>
      </div>

      {/* Honeypot — hidden from users, attractive to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-700 px-7 text-[0.95rem] font-medium text-white shadow-[0_12px_34px_-14px_rgba(7,75,191,0.9)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:translate-y-0 disabled:opacity-65"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </button>

        <p className={cn("text-[0.78rem] leading-relaxed", isDark ? "text-white/45" : "text-ink-900/50")}>
          Goes straight to {siteConfig.contactEmail}. No sequences, no sales floor.
        </p>
      </div>

      <div aria-live="polite">
        {status === "error" ? (
          <div
            className={cn(
              "mt-5 rounded-xl border px-4 py-3 text-[0.85rem] leading-relaxed",
              isDark
                ? "border-danger-400/30 bg-danger-400/10 text-white/80"
                : "border-danger-400/30 bg-danger-400/8 text-ink-900/80",
            )}
          >
            {Object.keys(errors).length > 0 ? (
              <span>Please check the highlighted fields and try again.</span>
            ) : (
              <span>
                We couldn&apos;t send that automatically.{" "}
                <a className="font-medium underline underline-offset-4" href={fallback ?? `mailto:${siteConfig.contactEmail}`}>
                  Email it to us instead
                </a>{" "}
                — your answers are already filled in.
              </span>
            )}
          </div>
        ) : null}
      </div>
    </form>
  );
}
