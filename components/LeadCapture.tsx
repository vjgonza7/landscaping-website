"use client";

import { useState } from "react";

type LeadCaptureProps = {
  service: string;
  message: string;
  title?: string;
};

type LeadState = "idle" | "submitting" | "success" | "error";

export default function LeadCapture({ service, message, title = "Have us take a look" }: LeadCaptureProps) {
  const [state, setState] = useState<LeadState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState("submitting");
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service,
          message,
          honeypot: "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Please try again.");
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="border border-[#d8b76a]/30 bg-[#d8b76a]/10 p-5">
        <p className="text-sm font-bold text-white">Request received.</p>
        <p className="mt-1 text-sm leading-6 text-white/58">
          We&apos;ll reach out to schedule a fast yard assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border border-white/10 bg-black/20 p-5">
      <p className="text-sm font-bold text-white">{title}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          autoComplete="name"
          className="border border-white/10 bg-[#080908] px-3 py-3 text-sm text-white placeholder:text-white/26 focus:border-[#d8b76a] focus:outline-none"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          autoComplete="tel"
          className="border border-white/10 bg-[#080908] px-3 py-3 text-sm text-white placeholder:text-white/26 focus:border-[#d8b76a] focus:outline-none"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          autoComplete="email"
          type="email"
          className="border border-white/10 bg-[#080908] px-3 py-3 text-sm text-white placeholder:text-white/26 focus:border-[#d8b76a] focus:outline-none"
        />
      </div>
      {state === "error" && <p className="text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="bg-[#d8b76a] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81] disabled:opacity-60"
      >
        {state === "submitting" ? "Sending..." : "Get a Quote"}
      </button>
    </form>
  );
}
