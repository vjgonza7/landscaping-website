"use client";

import { useMemo, useState } from "react";

type ServiceDef =
  | { label: string; base: [number, number]; sizeRanges?: undefined }
  | { label: string; base?: undefined; sizeRanges: Record<string, [number, number]> };

const services: Record<string, ServiceDef> = {
  irrigation: { label: "Irrigation repair", base: [75, 300] },
  cleanup: { label: "Yard cleanup", base: [100, 400] },
  landscaping: { label: "Landscape refresh", base: [450, 2000] },
  // HOA uses explicit per-size ranges so displayed prices stay predictable
  hoa: {
    label: "HOA notice rescue",
    sizeRanges: {
      small:  [85,  250],
      medium: [150, 450],
      large:  [300, 750],
    },
  },
};

const sizes = {
  small: { label: "Small", factor: 0.75 },
  medium: { label: "Medium", factor: 1 },
  large: { label: "Large", factor: 1.35 },
};

export default function InstantQuoteStarter() {
  const [service, setService] = useState<keyof typeof services>("hoa");
  const [size, setSize] = useState<keyof typeof sizes>("medium");
  const [urgent, setUrgent] = useState(true);

  const estimate = useMemo((): [number, number] => {
    const svc = services[service];
    // Services with explicit size ranges bypass the factor formula
    if (svc.sizeRanges) {
      return svc.sizeRanges[size] as [number, number];
    }
    const factor = sizes[size].factor * (urgent ? 1.1 : 1);
    return svc.base.map((v) => Math.round((v * factor) / 25) * 25) as [number, number];
  }, [service, size, urgent]);

  return (
    <section id="instant-quote" className="bg-[#080808] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#d8b76a]">
            Instant Quote Starter
          </p>
          <h2
            className="mt-4 max-w-2xl font-black leading-none text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
          >
            Get a Rough Range Before We Visit
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/52">
            This is not a final contract, but it helps customers understand the likely project size and helps you receive better quote requests.
          </p>
        </div>

        <div className="border border-white/10 bg-[#10120f] p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Control label="Service">
              <select
                value={service}
                onChange={(event) => setService(event.target.value as keyof typeof services)}
                className="w-full border border-white/10 bg-[#080808] px-4 py-3 text-sm text-white outline-none focus:border-[#d8b76a]"
              >
                {Object.entries(services).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </Control>
            <Control label="Yard Size">
              <select
                value={size}
                onChange={(event) => setSize(event.target.value as keyof typeof sizes)}
                className="w-full border border-white/10 bg-[#080808] px-4 py-3 text-sm text-white outline-none focus:border-[#d8b76a]"
              >
                {Object.entries(sizes).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </Control>
          </div>

          <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 border border-white/10 bg-black/20 p-4">
            <span>
              <span className="block text-sm font-bold text-white">Urgent or HOA notice?</span>
              <span className="mt-1 block text-xs leading-5 text-white/42">
                Choose this for leaks, dead plants, fines, or fast cleanup needs.
              </span>
            </span>
            <input
              type="checkbox"
              checked={urgent}
              onChange={(event) => setUrgent(event.target.checked)}
              className="h-5 w-5 accent-[#d8b76a]"
            />
          </label>

          <div className="mt-8 border border-[#d8b76a]/25 bg-[#d8b76a]/10 p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0cf81]">
              Rough project range
            </p>
            <p className="mt-3 text-4xl font-black text-white">
              ${estimate[0].toLocaleString()} - ${estimate[1].toLocaleString()}
            </p>
            <p className="mt-3 text-xs leading-6 text-white/44">
              Final pricing depends on site access, materials, irrigation condition, disposal, and requested finish level.
            </p>
          </div>

          <a
            href="#quote"
            className="mt-6 flex w-full items-center justify-center bg-[#d8b76a] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#f0cf81]"
          >
            Start My Quote
          </a>
        </div>
      </div>
    </section>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/72">{label}</span>
      {children}
    </label>
  );
}
