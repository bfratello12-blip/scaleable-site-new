/**
 * In-memory request throttle, per serverless instance.
 * Enough to stop naive abuse; put a WAF or edge rate limiter in front of
 * anything heavier.
 */
export function createRateLimiter({
  windowMs,
  max,
  maxKeys = 5000,
}: {
  windowMs: number;
  max: number;
  maxKeys?: number;
}) {
  const hits = new Map<string, number[]>();

  return function rateLimited(key: string) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > maxKeys) hits.clear();
    return recent.length > max;
  };
}

/** Visitor IP from trusted proxy headers, or null — never the server's own address. */
export function clientIpFromHeaders(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || null;
}
