"use client";

import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Scottsdale Backyard Overhaul",
    type: "Landscaping",
    before: { label: "Dead grass, overgrown weeds", position: "21% 30%", scale: 1.75 },
    after: { label: "Lush sod, clean borders", position: "76% 30%", scale: 1.75 },
  },
  {
    id: 2,
    title: "Irrigation System Rescue",
    type: "Irrigation Repair",
    before: { label: "3 broken valves, flooded patches", position: "41% 29%", scale: 2.4 },
    after: { label: "Full system restored", position: "67% 30%", scale: 2.55 },
  },
  {
    id: 3,
    title: "Phoenix Front Yard",
    type: "Yard Cleanup + Landscaping",
    before: { label: "Overgrown desert scrub", position: "34% 31%", scale: 2.35 },
    after: { label: "Modern desert xeriscape", position: "73% 34%", scale: 2.35 },
  },
  {
    id: 4,
    title: "HOA Notice Turnaround",
    type: "HOA Rescue",
    before: { label: "Weeds, debris, dead shrubs", position: "18% 36%", scale: 2.35 },
    after: { label: "Clean, compliant frontage", position: "86% 33%", scale: 2.35 },
  },
  {
    id: 5,
    title: "Artificial Turf Refresh",
    type: "Artificial Turf",
    before: { label: "Patchy grass, dusty edges", position: "29% 40%", scale: 2.45 },
    after: { label: "Tidy turf and sharp borders", position: "72% 40%", scale: 2.45 },
  },
];

const filters = ["All", "Irrigation Repair", "Yard Cleanup + Landscaping", "Landscaping", "HOA Rescue", "Artificial Turf"];

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 8,   suffix: " yrs", label: "In Business" },
  { value: 4.9, suffix: "★",  label: "Average Rating", isDecimal: true },
  { value: 100, suffix: "%",  label: "Licensed & Insured" },
];

export default function BeforeAfter() {
  const [active, setActive] = useState("All");
  const visibleProjects = active === "All" ? projects : projects.filter((project) => project.type === active);

  return (
    <section id="projects" className="bg-[#070807] px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="text-[#d8b76a] text-[11px] font-bold tracking-[0.3em] uppercase">
            Our Work
          </span>
          <h2
            className="mt-3 font-black leading-none text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.8rem)" }}
          >
            Real Transformations
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/46">
            Every project is a before-and-after story. Here are a few of ours.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                active === filter
                  ? "border-[#d8b76a] bg-[#d8b76a] text-black"
                  : "border-white/10 text-white/48 hover:border-[#d8b76a]/50 hover:text-[#d8b76a]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProjects.map((p, i) => (
            <div
              key={p.id}
              className={`reveal d${i + 1} card-hover overflow-hidden border border-white/10 bg-[#10120f]`}
            >
              {/* Before / After panels */}
              <div className="relative h-52 sm:h-56">
                <div className="absolute bottom-0 left-0 top-0 flex w-1/2 items-end overflow-hidden border-r border-black/70 p-3">
                  <Image
                    src="/images/virenza-before-after.png"
                    alt={`${p.title} before landscaping work`}
                    fill
                    sizes="(min-width: 768px) 16vw, 50vw"
                    className="object-cover brightness-[0.72] saturate-[0.82]"
                    style={{
                      objectPosition: p.before.position,
                      transform: `scale(${p.before.scale})`,
                      transformOrigin: p.before.position,
                    }}
                  />
                  <span className="relative z-10 rounded-md bg-black/58 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/72 ring-1 ring-white/10">
                    Before
                  </span>
                </div>

                {/* Divider */}
                <div className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#d8b76a]/45 bg-[#0e0e0e] shadow-[0_0_22px_rgba(0,0,0,0.55)]">
                  <span className="text-xs font-bold text-[#d8b76a]">→</span>
                </div>

                <div className="absolute bottom-0 right-0 top-0 flex w-1/2 items-end justify-end overflow-hidden p-3">
                  <Image
                    src="/images/virenza-before-after.png"
                    alt={`${p.title} after landscaping work`}
                    fill
                    sizes="(min-width: 768px) 16vw, 50vw"
                    className="object-cover brightness-[0.94] saturate-[1.08]"
                    style={{
                      objectPosition: p.after.position,
                      transform: `scale(${p.after.scale})`,
                      transformOrigin: p.after.position,
                    }}
                  />
                  <span className="relative z-10 rounded-md bg-black/58 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/72 ring-1 ring-[#d8b76a]/20">
                    After
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b76a]">
                  {p.type}
                </p>
                <h3 className="text-base font-bold text-white mb-3">{p.title}</h3>
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-600">
                    <span className="text-red-400/60 font-medium">Before:</span>{" "}
                    {p.before.label}
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium text-[#d8b76a]/80">After:</span>{" "}
                    {p.after.label}
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#d8b76a]/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Animated stat counter ──────────────────────────────────────────────── */

function StatCard({
  value,
  suffix,
  label,
  isDecimal,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
  delay: number;
}) {
  const displayValue = isDecimal ? value.toFixed(1) : String(value);

  return (
    <div
      className={`reveal d${delay + 1} border border-white/10 bg-[#10120f] p-6 text-center`}
    >
      <div className="text-3xl font-black text-[#d8b76a] md:text-4xl">
        <span>{displayValue}</span>
        <span>{suffix}</span>
      </div>
      <div className="mt-1.5 text-xs font-medium text-white/38">{label}</div>
    </div>
  );
}
