export type QuoteFormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  urgency: string;
  budget: string;
  smsConsent: boolean;
  photos: QuotePhoto[];
  honeypot: string;
};

export type QuotePhoto = {
  filename: string;
  content: string;
  contentType: string;
};

type ValidationResult =
  | { ok: true; data: QuoteFormData }
  | { ok: false; error: string };

const VALID_SERVICES = ["irrigation", "landscaping", "cleanup", "hoa", "turf", "multiple", "other"];
const VALID_URGENCY = ["standard", "soon", "urgent", "hoa"];
const VALID_BUDGETS = ["not-sure", "under-500", "500-1500", "1500-5000", "5000-plus"];

export function validateQuoteForm(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid form data." };
  }

  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (typeof b.phone !== "string" || !/^\+?[\d\s\-().]{7,20}$/.test(b.phone.trim())) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (typeof b.service !== "string" || !VALID_SERVICES.includes(b.service)) {
    return { ok: false, error: "Please select a service." };
  }
  if (typeof b.message === "string" && b.message.length > 2000) {
    return { ok: false, error: "Message must be under 2000 characters." };
  }
  if (typeof b.urgency === "string" && !VALID_URGENCY.includes(b.urgency)) {
    return { ok: false, error: "Please select a valid timeline." };
  }
  if (typeof b.budget === "string" && !VALID_BUDGETS.includes(b.budget)) {
    return { ok: false, error: "Please select a valid budget range." };
  }

  const photos = parsePhotos(b.photos);
  if (!photos.ok) return { ok: false, error: photos.error };

  return {
    ok: true,
    data: {
      name: (b.name as string).trim(),
      phone: (b.phone as string).trim(),
      email: (b.email as string).trim(),
      service: b.service as string,
      message: typeof b.message === "string" ? b.message.trim() : "",
      urgency: typeof b.urgency === "string" ? b.urgency : "standard",
      budget: typeof b.budget === "string" ? b.budget : "not-sure",
      smsConsent: b.smsConsent === true,
      photos: photos.data,
      honeypot: typeof b.honeypot === "string" ? b.honeypot : "",
    },
  };
}

function parsePhotos(value: unknown): { ok: true; data: QuotePhoto[] } | { ok: false; error: string } {
  if (value === undefined) return { ok: true, data: [] };
  if (!Array.isArray(value)) return { ok: false, error: "Photo upload data is invalid." };
  if (value.length > 3) return { ok: false, error: "Please upload no more than 3 photos." };

  const photos: QuotePhoto[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") {
      return { ok: false, error: "Photo upload data is invalid." };
    }

    const photo = item as Record<string, unknown>;
    if (
      typeof photo.filename !== "string" ||
      typeof photo.content !== "string" ||
      typeof photo.contentType !== "string"
    ) {
      return { ok: false, error: "Photo upload data is invalid." };
    }

    if (!photo.contentType.startsWith("image/")) {
      return { ok: false, error: "Please upload image files only." };
    }
    if (photo.content.length > 5_600_000) {
      return { ok: false, error: "Each photo must be under 4MB." };
    }

    photos.push({
      filename: photo.filename.slice(0, 120),
      content: photo.content,
      contentType: photo.contentType,
    });
  }

  return { ok: true, data: photos };
}
