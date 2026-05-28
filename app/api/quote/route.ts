import { type NextRequest } from "next/server";
import { validateQuoteForm } from "@/lib/validate";
import { sendQuoteEmail } from "@/lib/mailer";

// Simple in-memory rate limiter — 1 submission per IP per minute.
// Resets on server restart. Sufficient for a small business site.
// Upgrade to Redis/Upstash if you need persistence across deployments.
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

export async function POST(req: NextRequest) {
  // ── Rate limit ──────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const lastAt = rateLimitMap.get(ip) ?? 0;
  if (Date.now() - lastAt < RATE_LIMIT_MS) {
    return Response.json(
      { error: "Please wait a moment before submitting again." },
      { status: 429 }
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Validate ─────────────────────────────────────────────────────────────
  const result = validateQuoteForm(body);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 422 });
  }

  const { name, phone, email, service, message, urgency, budget, smsConsent, photos, honeypot } = result.data;

  // ── Honeypot check ────────────────────────────────────────────────────────
  // Bots fill hidden fields; real users never see it.
  if (honeypot) {
    // Pretend success so bots don't know they were caught.
    return Response.json({ ok: true });
  }

  // ── Send email ────────────────────────────────────────────────────────────
  try {
    await sendQuoteEmail({ name, phone, email, service, message, urgency, budget, smsConsent, photos });
  } catch (err) {
    console.error("[quote route] Email send failed:", err);
    return Response.json(
      { error: "Submission failed. Please try again or call us directly." },
      { status: 500 }
    );
  }

  rateLimitMap.set(ip, Date.now());
  return Response.json({ ok: true });
}
