const services = [
  {
    num: "01",
    title: "Irrigation Repair",
    description:
      "We diagnose and fix broken sprinkler systems, leaking valves, clogged drip lines, and controller issues — fast and done right.",
    features: ["Leak detection", "Valve replacement", "Smart controllers", "System tune-ups"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Landscaping",
    description:
      "Custom desert-friendly landscaping designed for Arizona's climate. From rock gardens to lush grass, we build outdoor spaces that last.",
    features: ["Design & install", "Sod & seeding", "Rock & gravel", "Tree planting"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22V12" />
        <path d="M12 12C12 8 9 5 5 5c0 4 2.5 7 7 7z" />
        <path d="M12 12c0-4 3-7 7-7-1 4-4 7-7 7z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Yard Cleanups",
    description:
      "Seasonal and one-time cleanups to clear debris, trim overgrowth, and get your yard looking sharp fast.",
    features: ["Leaf & debris removal", "Weed control", "Edging & trimming", "Haul away included"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M8.46 8.46L18 18" />
        <path d="M6 9v12" />
        <path d="M9 6h12" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[#d8b76a] text-[11px] font-bold tracking-[0.3em] uppercase">
              What We Do
            </span>
            <h2
              className="mt-3 max-w-3xl font-black leading-none text-white"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.8rem)" }}
            >
              Full-Service<br />Outdoor Care
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/46 md:text-right">
            From a broken sprinkler to a full yard transformation — we handle everything.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card reveal d${i + 1} card-hover relative overflow-hidden border border-white/10 bg-[#10120f] p-8`}
            >
              {/* Giant background number */}
              <span
                aria-hidden="true"
                className="absolute -top-3 -right-1 select-none font-black leading-none text-white/[0.035]"
                style={{ fontSize: "clamp(5rem, 14vw, 10rem)" }}
              >
                {s.num}
              </span>

              {/* Icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#d8b76a]/25 bg-[#d8b76a]/10 text-[#d8b76a]">
                {s.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="mb-7 text-sm leading-7 text-white/46">
                {s.description}
              </p>

              <ul className="space-y-2.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/58">
                    <span className="h-1.5 w-1.5 flex-shrink-0 bg-[#d8b76a]" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b76a]/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center reveal">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 border border-[#d8b76a]/35 px-9 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[#d8b76a] transition-all hover:border-[#d8b76a]/70 hover:bg-[#d8b76a]/5"
          >
            Request Any Service →
          </a>
        </div>
      </div>
    </section>
  );
}
