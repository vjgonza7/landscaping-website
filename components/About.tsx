const values = [
  {
    title: "Desert Experts",
    body: "We know Arizona's climate, soil, and plants. No generic advice — we design for what actually works here.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22V12m0 0C12 8 9.5 5.5 6 5c0 3.5 2 6.5 6 7zm0 0c0-4 2.5-6.5 6-7-1 3.5-3 6.5-6 7z" />
        <path d="M12 12V7" />
      </svg>
    ),
  },
  {
    title: "Fast Response",
    body: "Broken irrigation? We're out the same day or next day. No weeks-long waits.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Fully Licensed",
    body: "ROC licensed, fully insured. You're covered from the first visit to the final cleanup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: visual */}
          <div className="reveal-left relative pb-8 lg:pb-0">
            {/* Main animated landscape */}
            <div className="about-scene relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#0b120c]">
              <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Animated premium desert landscape">
                <defs>
                  <linearGradient id="aboutSky" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#07100a" />
                    <stop offset="58%" stopColor="#102015" />
                    <stop offset="100%" stopColor="#1c2416" />
                  </linearGradient>
                  <linearGradient id="aboutGrass" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#16351d" />
                    <stop offset="52%" stopColor="#24552d" />
                    <stop offset="100%" stopColor="#17351f" />
                  </linearGradient>
                  <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0cf81" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#f0cf81" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="400" height="155" fill="url(#aboutSky)" />
                <rect className="about-lawn" x="0" y="145" width="400" height="155" fill="url(#aboutGrass)" />
                <rect x="0" y="145" width="400" height="155" fill="url(#aboutGlow)" opacity="0.08" />

                <g className="about-sun">
                  <circle cx="333" cy="43" r="43" fill="#d8b76a" opacity="0.09" />
                  <circle cx="333" cy="43" r="25" fill="#d8b76a" opacity="0.68" />
                </g>

                <g className="about-home">
                  <rect x="138" y="80" width="126" height="82" fill="#101e12" />
                  <polygon points="126,80 201,32 276,80" fill="#081109" />
                  <rect x="178" y="121" width="44" height="41" rx="3" fill="#060b07" />
                  <rect x="150" y="100" width="25" height="18" rx="2" fill="#1c3d22" />
                  <rect x="228" y="100" width="25" height="18" rx="2" fill="#1c3d22" />
                  <path d="M138 162H264" stroke="#d8b76a" strokeOpacity="0.18" strokeWidth="2" />
                </g>

                <g className="about-tree about-tree-left">
                  <rect x="77" y="129" width="7" height="33" fill="#45230f" />
                  <circle cx="81" cy="116" r="21" fill="#265d31" />
                  <circle cx="69" cy="122" r="13" fill="#1e4728" opacity="0.8" />
                </g>
                <g className="about-tree about-tree-right">
                  <rect x="307" y="126" width="7" height="36" fill="#45230f" />
                  <circle cx="311" cy="109" r="24" fill="#2b6335" />
                  <circle cx="326" cy="116" r="15" fill="#1d4427" opacity="0.8" />
                </g>

                <g className="about-blades" stroke="#d8b76a" strokeWidth="2" strokeLinecap="round" opacity="0.5">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <line
                      key={i}
                      x1={i * 10}
                      y1={146}
                      x2={i * 10 + 2}
                      y2={125 - (i % 6) * 2}
                    />
                  ))}
                </g>

                <path
                  className="about-waterline"
                  d="M0 205 Q96 193 196 204 T400 203"
                  stroke="#6ee7f9"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 8"
                  opacity="0.44"
                />

                <g className="about-spray" stroke="#c9f7ff" strokeLinecap="round" opacity="0.7">
                  <path d="M198 168 C178 137 151 115 117 100" strokeWidth="1.4" />
                  <path d="M203 168 C218 134 242 108 278 89" strokeWidth="1.4" />
                  <path d="M201 170 C188 130 182 104 182 74" strokeWidth="1" opacity="0.45" />
                  {Array.from({ length: 22 }).map((_, i) => (
                    <circle
                      key={i}
                      className="about-droplet"
                      cx={130 + (i * 11) % 140}
                      cy={82 + (i * 17) % 72}
                      r={i % 3 === 0 ? 1.3 : 0.9}
                      fill="#d9fbff"
                      style={{ animationDelay: `${i * 0.13}s` }}
                    />
                  ))}
                </g>

              </svg>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-white/[0.03]" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 bg-[#d8b76a] px-6 py-4 text-center font-black text-black shadow-2xl shadow-black/40 sm:-bottom-5 sm:-right-5">
              <div className="text-3xl leading-none">8+</div>
              <div className="text-[11px] font-bold mt-0.5 tracking-wide">Years Serving AZ</div>
            </div>

          </div>

          {/* Right: content */}
          <div className="reveal-right">
            <span className="text-[#d8b76a] text-[11px] font-bold tracking-[0.3em] uppercase">
              About Us
            </span>
            <h2
              className="mt-3 font-black leading-none text-white"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            >
              Built for the<br />Arizona Desert
            </h2>

            <p className="mt-6 text-base leading-8 text-white/48">
              VIRENZA was founded in Phoenix with one mission: give
              Arizona homeowners the outdoor space they deserve. We specialize in
              desert-smart landscaping and irrigation systems that work in extreme
              heat, low rainfall, and rocky soil.
            </p>
            <p className="mt-4 text-base leading-8 text-white/48">
              From Scottsdale to Mesa, our team shows up on time, works clean,
              and treats every yard like our own. No subcontractors, no shortcuts.
            </p>

            {/* Value props */}
            <div className="mt-9 space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-[#d8b76a]/25 bg-[#d8b76a]/10 text-[#d8b76a]">
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{v.title}</h4>
                    <p className="mt-0.5 text-sm leading-7 text-white/40">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#quote"
              className="mt-9 inline-block bg-[#d8b76a] px-8 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81]"
            >
              Work With Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
