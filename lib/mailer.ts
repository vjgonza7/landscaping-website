import { Resend } from "resend";

// Lazy init: Resend throws at construction if the key is missing,
// so we create the instance only when actually sending.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set in environment variables.");
    _resend = new Resend(key);
  }
  return _resend;
}

const SERVICE_LABELS: Record<string, string> = {
  irrigation: "Irrigation Repair",
  landscaping: "Landscaping",
  cleanup: "Yard Cleanup",
  hoa: "HOA Notice Rescue",
  turf: "Artificial Turf / Sod",
  multiple: "Multiple Services",
  other: "Other / Not Sure",
};

const CONTACT_EMAIL = "veilllc0555@gmail.com";
const FROM_EMAIL = "VIRENZA Landscape Solutions <onboarding@resend.dev>";
const CONTACT_PHONE = "602-435-4418";

export type QuotePayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  urgency: string;
  budget: string;
  smsConsent: boolean;
  photos: {
    filename: string;
    content: string;
    contentType: string;
  }[];
};

export async function sendQuoteEmail(data: QuotePayload): Promise<void> {
  const toEmail = process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;

  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service;

  const [leadEmail, confirmationEmail] = await Promise.all([
    getResend().emails.send({
      // While testing: onboarding@resend.dev can only send to verified Resend recipients.
      // After domain verification, set RESEND_FROM_EMAIL to something like quotes@virenzalawn.com.
      from: process.env.RESEND_FROM_EMAIL ?? FROM_EMAIL,
      to: [toEmail],
      replyTo: data.email,
      subject: `New Quote Request: ${serviceLabel} - ${data.name}`,
      html: buildLeadEmailHtml({ ...data, serviceLabel }),
      attachments: data.photos.map((photo) => ({
        filename: photo.filename,
        content: photo.content,
        contentType: photo.contentType,
      })),
    }),
    getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? FROM_EMAIL,
      to: [data.email],
      replyTo: toEmail,
      subject: "We received your VIRENZA quote request",
      html: buildCustomerConfirmationHtml({ ...data, serviceLabel }),
    }),
  ]);

  if (leadEmail.error) throw new Error(leadEmail.error.message);
  if (confirmationEmail.error) throw new Error(confirmationEmail.error.message);

  // ─────────────────────────────────────────────────────────────────────────
  // TWILIO SMS — activate when ready
  //
  // 1. Install: npm install twilio
  // 2. Fill in .env.local:
  //      TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
  //      TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxx
  //      TWILIO_FROM_NUMBER=+14805550100   ← your Twilio number
  //      TWILIO_TO_NUMBER=+14805550199     ← your personal number
  // 3. Uncomment the block below
  // ─────────────────────────────────────────────────────────────────────────
  // import twilio from "twilio";
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({
  //   body: `New Verde Pro lead!\n${data.name}\n${data.phone}\nService: ${serviceLabel}`,
  //   from: process.env.TWILIO_FROM_NUMBER!,
  //   to: process.env.TWILIO_TO_NUMBER!,
  // });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildLeadEmailHtml(d: QuotePayload & { serviceLabel: string }): string {
  const row = (label: string, value: string, isLink = false) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1f1f1f;color:#9ca3af;font-size:13px;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #1f1f1f;color:${isLink ? "#d8b76a" : "#ffffff"};font-size:14px;font-weight:500;">
        ${isLink ? `<a href="mailto:${escapeHtml(value)}" style="color:#d8b76a;text-decoration:none;">${escapeHtml(value)}</a>` : escapeHtml(value)}
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">
    <div style="background:#111111;border:1px solid #222;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#14532d,#166534);padding:28px 32px;">
        <p style="margin:0;color:#f0cf81;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">VIRENZA Landscape Solutions</p>
        <h1 style="margin:10px 0 0;color:#ffffff;font-size:20px;font-weight:700;">New Quote Request</h1>
      </div>
      <div style="padding:28px 32px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", d.name)}
          ${row("Phone", d.phone)}
          ${row("Email", d.email, true)}
          ${row("Service", d.serviceLabel)}
          ${row("Timeline", formatUrgency(d.urgency))}
          ${row("Budget", formatBudget(d.budget))}
          ${row("Text Permission", d.smsConsent ? "Customer says text messages are okay" : "No text permission checked")}
          ${row("Photos", d.photos.length ? `${d.photos.length} attached` : "No photos attached")}
          <tr>
            <td style="padding:12px 0;color:#9ca3af;font-size:13px;vertical-align:top;">Message</td>
            <td style="padding:12px 0;color:#d1d5db;font-size:14px;line-height:1.65;">${d.message ? escapeHtml(d.message) : "<em style='color:#4b5563'>No message provided</em>"}</td>
          </tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#0a0a0a;border-radius:10px;border:1px solid #1f1f1f;">
        <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">Reply to this email to contact the customer directly. Submission received at ${new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" })} MST.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`.trim();
}

function buildCustomerConfirmationHtml(d: QuotePayload & { serviceLabel: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,sans-serif;color:#ffffff;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">
    <div style="background:#111111;border:1px solid #27221a;border-radius:16px;overflow:hidden;">
      <div style="background:#15140d;border-bottom:1px solid #3a3017;padding:30px 32px;">
        <p style="margin:0;color:#f0cf81;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">VIRENZA Landscape Solutions</p>
        <h1 style="margin:12px 0 0;color:#ffffff;font-size:24px;line-height:1.25;">Thank you for reaching out.</h1>
      </div>
      <div style="padding:28px 32px;color:#d1d5db;font-size:15px;line-height:1.7;">
        <p style="margin:0 0 16px;">Hi ${escapeHtml(d.name)},</p>
        <p style="margin:0 0 16px;">We received your request for ${escapeHtml(d.serviceLabel)}. Thank you for reaching out. We will get back to you as soon as possible.</p>
        <div style="margin:24px 0;padding:16px;background:#0a0a0a;border:1px solid #2b2517;border-radius:10px;">
          <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Your request</p>
          <p style="margin:0;color:#ffffff;">${escapeHtml(d.message || "No extra details provided.")}</p>
        </div>
        <p style="margin:0;">Need to reach us sooner? Call <a href="tel:+16024354418" style="color:#f0cf81;text-decoration:none;">${CONTACT_PHONE}</a> or reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>`.trim();
}

function formatUrgency(value: string): string {
  return (
    {
      standard: "Flexible",
      soon: "This week",
      urgent: "Urgent",
      hoa: "HOA notice / deadline",
    }[value] ?? value
  );
}

function formatBudget(value: string): string {
  return (
    {
      "not-sure": "Not sure yet",
      "under-500": "Under $500",
      "500-1500": "$500 - $1,500",
      "1500-5000": "$1,500 - $5,000",
      "5000-plus": "$5,000+",
    }[value] ?? value
  );
}
