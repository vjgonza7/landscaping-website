"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Scottsdale Backyard Overhaul",
    type: "Landscaping",
    before: { bg: "from-yellow-950 to-amber-900", label: "Dead grass, overgrown weeds" },
    after:  { bg: "from-green-900 to-emerald-800", label: "Lush sod, clean borders" },
  },
  {
    id: 2,
    title: "Irrigation System Rescue",
    type: "Irrigation Repair",
    before: { bg: "from-orange-950 to-red-900",    label: "3 broken valves, flooded patches" },
    after:  { bg: "from-teal-900 to-cyan-900",     label: "Full system restored" },
  },
  {
    id: 3,
    title: "Phoenix Front Yard",
    type: "Yard Cleanup + Landscaping",
    before: { bg: "from-stone-900 to-stone-800",   label: "Overgrown desert scrub" },
    after:  { bg: "from-green-950 to-lime-900",    label: "Modern desert xeriscape" },
  },
  {
    id: 4,
    title: "HOA Notice Turnaround",
    type: "HOA Rescue",
    before: { bg: "from-red-950 to-stone-900", label: "Weeds, debris, dead shrubs" },
    after: { bg: "from-emerald-950 to-stone-800", label: "Clean, compliant frontage" },
  },
  {
    id: 5,
    title: "Artificial Turf Refresh",
    type: "Artificial Turf",
    before: { bg: "from-yellow-950 to-stone-900", label: "Patchy grass, dusty edges" },
    after: { bg: "from-lime-950 to-green-800", label: "Tidy turf and sharp borders" },
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
              <div className="relative h-44">
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-br ${p.before.bg} flex items-end p-3`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 bg-black/40 px-2 py-1 rounded-md">
                    Before
                  </span>
                </div>

                {/* Divider */}
                <div className="absolute left-1/2 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#d8b76a]/30 bg-[#0e0e0e]">
                  <span className="text-xs font-bold text-[#d8b76a]">→</span>
                </div>

                <div
                  className={`absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-br ${p.after.bg} flex items-end justify-end p-3`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 bg-black/40 px-2 py-1 rounded-md">
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
