import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

/** Branded Open Graph card, generated at request time and cached by the CDN. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0B1120 0%, #0B1120 45%, #06265E 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(7,75,191,0.85) 0%, rgba(7,75,191,0) 68%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "linear-gradient(135deg,#68B4FF,#074BBF)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#93C2FF",
              display: "flex",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.03,
              letterSpacing: -2.6,
              fontWeight: 700,
              maxWidth: 940,
              display: "flex",
            }}
          >
            Revenue is easy to grow. Profit is harder.
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.66)", maxWidth: 880, display: "flex" }}>
            Google Ads and Meta Ads managed for Shopify brands — measured against real
            profit, not platform ROAS.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>Managed growth</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.25)" }}>/</div>
          <div style={{ display: "flex" }}>Shopify profit analytics</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.25)" }}>/</div>
          <div style={{ display: "flex" }}>scaleableapp.com</div>
        </div>
      </div>
    ),
    size,
  );
}
