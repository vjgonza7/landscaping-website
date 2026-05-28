import Link from "next/link";

export default function HoaRescue() {
  const issues = [
    "Weeds and overgrowth visible from the street",
    "Dead plants, brown turf, or missing shrubs",
    "Gravel, borders, and turf edges looking messy",
    "Broken irrigation causing dry zones or leaks",
  ];

  return (
    <section className="bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div className="border border-red-500/20 bg-[linear-gradient(135deg,#220808,#10120f_55%,#0a0a0a)] p-8 md:p-12">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-red-300">
            HOA Notice Rescue
          </p>
          <h2
            className="mt-4 max-w-3xl font-black leading-none text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.4rem)" }}
          >
            Got a Yard Warning? We Can Move Fast.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/56">
            HOA letters are stressful because they usually come with a short deadline. VIRENZA can clean up the visible problems, repair irrigation, replace dead plants, and get the yard looking compliant again.
          </p>
          <Link
            href="/?tool=hoa-ready#hoa-ready"
            className="mt-8 inline-flex bg-[#d8b76a] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#f0cf81]"
          >
            Check HOA Readiness
          </Link>
        </div>

        <div className="space-y-3">
          {issues.map((issue, index) => (
            <div key={issue} className="flex items-start gap-4 border border-white/10 bg-[#10120f] p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-red-400/25 bg-red-500/10 text-xs font-black text-red-200">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-white/64">{issue}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
