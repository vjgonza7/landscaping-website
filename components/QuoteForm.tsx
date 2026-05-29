"use client";

import { useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTOS = 3;
const MAX_PHOTO_SIZE = 4 * 1024 * 1024;

type QuotePhoto = {
  filename: string;
  content: string;
  contentType: string;
};

export default function QuoteForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    urgency: "standard",
    budget: "not-sure",
    smsConsent: false,
    message: "",
  });
  const [photos, setPhotos] = useState<QuotePhoto[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setErrorMsg("");

    if (files.length > MAX_PHOTOS) {
      setError("Please upload no more than 3 yard photos.");
      event.target.value = "";
      return;
    }
    const oversized = files.find((f) => f.size > MAX_PHOTO_SIZE);
    if (oversized) {
      setError("Each photo must be under 4MB.");
      event.target.value = "";
      return;
    }

    const encoded = await Promise.all(
      files.map(
        (file) =>
          new Promise<QuotePhoto>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = typeof reader.result === "string" ? reader.result : "";
              resolve({
                filename: file.name,
                content: result.split(",")[1] ?? "",
                contentType: file.type || "image/jpeg",
              });
            };
            reader.onerror = () => reject(new Error("Photo upload failed."));
            reader.readAsDataURL(file);
          })
      )
    );

    setPhotos(encoded);
    if (state === "error") setState("idle");
  };

  function setError(msg: string) {
    setErrorMsg(msg);
    setState("error");
    requestAnimationFrame(() => errorRef.current?.focus());
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation (mirrors server-side for instant feedback)
    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.service) {
      setError("Please select a service so we can route your request.");
      return;
    }

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photos, honeypot: "" }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setState("success");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="quote" className="bg-[#080808] px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#d8b76a]">
            Free Quote
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Get Your Free Estimate
          </h2>
          <p className="mt-4 text-base text-white/52">
            Tell us about your yard. We&apos;ll respond within 24 hours with a
            no-obligation estimate.
          </p>
          <p className="mt-3 text-sm text-white/34">
            Prefer to talk?{" "}
            <a href="tel:+16024354418" className="text-[#d8b76a] hover:underline underline-offset-2">
              Call (602) 435-4418
            </a>
          </p>
        </div>

        {state === "success" ? (
          <div className="border border-[#d8b76a]/30 bg-[#111111] p-12 text-center">
            <div className="flex justify-center mb-5">
              <div className="flex h-16 w-16 items-center justify-center border border-[#d8b76a]/30 bg-[#d8b76a]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-[#d8b76a]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request received!</h3>
            <p className="text-gray-400">
              We&apos;ll reach out within 24 hours to schedule your free estimate.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Free quote request form"
            className="space-y-5 border border-white/10 bg-[#111111] p-6 sm:p-8"
          >
            <p className="text-xs text-white/34">
              Fields marked <span className="text-[#d8b76a]">*</span> are required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Full Name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(480) 555-0100"
                required
              />
            </div>

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              invalid={state === "error" && errorMsg.toLowerCase().includes("email")}
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="service" className="text-sm font-medium text-gray-300">
                Service Needed <span className="text-[#d8b76a]" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="w-full cursor-pointer appearance-none border border-white/10 bg-[#0a0a0a] px-4 py-3 pr-10 text-sm text-white transition-colors focus:border-[#d8b76a] focus:outline-none"
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  <option value="irrigation">Irrigation Repair</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="cleanup">Yard Cleanup</option>
                  <option value="hoa">HOA Notice Rescue</option>
                  <option value="turf">Artificial Turf / Sod</option>
                  <option value="multiple">Multiple Services</option>
                  <option value="other">Other / Not Sure</option>
                </select>
                <svg
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="urgency" className="text-sm font-medium text-gray-300">
                  Timeline
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={form.urgency}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white transition-colors focus:border-[#d8b76a] focus:outline-none"
                >
                  <option value="standard">Flexible</option>
                  <option value="soon">This week</option>
                  <option value="urgent">Urgent — ASAP</option>
                  <option value="hoa">HOA notice / deadline</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="budget" className="text-sm font-medium text-gray-300">
                  Approximate Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white transition-colors focus:border-[#d8b76a] focus:outline-none"
                >
                  <option value="not-sure">Not sure yet</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1500">$500 – $1,500</option>
                  <option value="1500-5000">$1,500 – $5,000</option>
                  <option value="5000-plus">$5,000+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">
                Describe Your Yard
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="What's going on? Location in AZ, yard size, specific issues, etc."
                className="w-full resize-none border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white transition-colors placeholder:text-white/22 focus:border-[#d8b76a] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="photos" className="text-sm font-medium text-gray-300">
                Yard Photos{" "}
                <span className="text-white/34 font-normal">(optional — helps us estimate faster)</span>
              </label>
              <input
                id="photos"
                name="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-[#d8b76a] file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:tracking-[0.12em] file:text-black"
              />
              <p className="text-xs text-white/34">Up to 3 photos, 4 MB each.</p>
              {photos.length > 0 && (
                <p className="text-xs text-[#d8b76a]">
                  {photos.length} photo{photos.length === 1 ? "" : "s"} ready to send.
                </p>
              )}
            </div>

            <label className="flex items-start gap-3 border border-white/10 bg-black/20 p-4 cursor-pointer">
              <input
                type="checkbox"
                name="smsConsent"
                checked={form.smsConsent}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 accent-[#d8b76a]"
              />
              <span className="text-xs leading-6 text-white/48">
                I agree to receive text messages about my quote request. Message and data
                rates may apply. Reply STOP to opt out.
              </span>
            </label>

            {state === "error" && (
              <div
                ref={errorRef}
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                className="flex items-start gap-3 bg-red-950/40 border border-red-500/30 px-4 py-3 focus:outline-none"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10 3L2 17h16L10 3z" />
                  <line x1="10" y1="9" x2="10" y2="12" />
                  <circle cx="10" cy="14.5" r="0.5" fill="currentColor" />
                </svg>
                <p className="text-red-300 text-sm">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full bg-[#d8b76a] py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81] disabled:opacity-60"
            >
              {state === "submitting" ? "Sending…" : "Send My Free Quote Request →"}
            </button>

            <p className="text-center text-xs text-white/24">
              No spam. No obligation. Just a free estimate from your local AZ crew.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  invalid,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-300">
        {label}{" "}
        {required && (
          <span className="text-[#d8b76a]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={invalid || undefined}
        autoComplete={
          name === "email" ? "email" : name === "phone" ? "tel" : name === "name" ? "name" : undefined
        }
        className={`w-full border bg-[#0a0a0a] px-4 py-3 text-sm text-white transition-colors placeholder:text-white/22 focus:outline-none ${
          invalid
            ? "border-red-500/70 focus:border-red-400"
            : "border-white/10 focus:border-[#d8b76a]"
        }`}
      />
    </div>
  );
}
