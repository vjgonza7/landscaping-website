export default function Hero() {
  return (
    <section className="premium-hero relative min-h-[92svh] overflow-hidden bg-[#070807] px-6 pt-28 pb-14 sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(216,183,106,0.16),transparent_32%),linear-gradient(115deg,#070807_0%,#0b100c_48%,#12170f_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0)_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(92svh-10rem)] max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_0.72fr]">
        <div className="max-w-3xl">
          <h1 className="max-w-4xl text-[3rem] font-black leading-[0.92] tracking-normal text-white sm:text-[4.6rem] lg:text-[5.8rem]">
            Outdoor Spaces With Estate-Level Finish
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
            Design-forward landscaping, precise irrigation, and clean installs
            built to look elevated in the Arizona heat.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex items-center justify-center bg-[#d8b76a] px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#f0cf81]"
            >
              Request a Private Quote
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center border border-white/18 bg-black/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/82 backdrop-blur-sm transition-colors hover:border-[#d8b76a]/70 hover:text-white"
            >
              View Transformations
            </a>
          </div>

          <dl className="mt-9 grid max-w-2xl grid-cols-3 border-y border-white/10 py-5">
            <div>
              <dt className="text-2xl font-black text-white">8+</dt>
              <dd className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Years</dd>
            </div>
            <div className="border-x border-white/10 px-5">
              <dt className="text-2xl font-black text-white">500+</dt>
              <dd className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Projects</dd>
            </div>
            <div className="pl-5">
              <dt className="text-2xl font-black text-white">4.9</dt>
              <dd className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">Rating</dd>
            </div>
          </dl>
        </div>

        <div className="hidden border border-white/10 bg-black/24 p-6 shadow-2xl shadow-black/40 backdrop-blur-md lg:block">
          <div className="hero-decal-card relative aspect-[4/5] overflow-hidden border border-[#d8b76a]/25 bg-[linear-gradient(160deg,rgba(216,183,106,0.18),rgba(49,82,59,0.16)_45%,rgba(0,0,0,0.38))] p-6">
            <svg className="hero-decal hero-yard-decal" viewBox="0 0 420 520" aria-hidden="true">
              <defs>
                <linearGradient id="yardSky" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0c140e" />
                  <stop offset="100%" stopColor="#1d2818" />
                </linearGradient>
                <linearGradient id="yardGrass" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#214327" />
                  <stop offset="50%" stopColor="#3f7a43" />
                  <stop offset="100%" stopColor="#1f4428" />
                </linearGradient>
                <radialGradient id="yardGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f0cf81" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#f0cf81" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect x="36" y="128" width="348" height="270" rx="4" fill="url(#yardSky)" opacity="0.95" />
              <rect className="yard-grass" x="36" y="278" width="348" height="120" rx="4" fill="url(#yardGrass)" />
              <path d="M36 322 C120 306 186 318 246 334 C300 348 344 340 384 318" fill="none" stroke="#d8b76a" strokeWidth="4" opacity="0.75" />
              <path d="M36 351 C132 330 201 344 268 360 C318 371 352 361 384 342" fill="none" stroke="#10160f" strokeWidth="22" opacity="0.72" />

              <g className="yard-house">
                <rect x="154" y="206" width="112" height="86" fill="#10190f" />
                <polygon points="136,206 210,152 284,206" fill="#080c08" />
                <rect x="195" y="254" width="34" height="38" rx="3" fill="#050605" />
                <rect x="169" y="226" width="24" height="20" rx="2" fill="#2b4d2d" />
                <rect x="230" y="226" width="24" height="20" rx="2" fill="#2b4d2d" />
                <path d="M140 207 L210 154 L281 207" fill="none" stroke="#d8b76a" strokeWidth="2" opacity="0.52" />
              </g>

              <g className="yard-tree yard-tree-left">
                <rect x="89" y="258" width="8" height="39" fill="#553018" />
                <circle cx="93" cy="238" r="28" fill="#2f6939" />
                <circle cx="74" cy="248" r="17" fill="#1d4427" opacity="0.82" />
              </g>
              <g className="yard-tree yard-tree-right">
                <rect x="325" y="254" width="8" height="43" fill="#553018" />
                <circle cx="329" cy="231" r="31" fill="#377342" />
                <circle cx="350" cy="245" r="19" fill="#1d4427" opacity="0.82" />
              </g>

              <g className="yard-before" opacity="0.62">
                <rect x="36" y="278" width="348" height="120" fill="#5b3c1e" />
                <path d="M78 309 C88 288 102 278 121 267" stroke="#a27b43" strokeWidth="5" strokeLinecap="round" />
                <path d="M309 314 C321 289 337 275 356 264" stroke="#a27b43" strokeWidth="5" strokeLinecap="round" />
                <path d="M94 315 C89 294 79 280 62 268" stroke="#856333" strokeWidth="4" strokeLinecap="round" />
                <path d="M330 318 C328 298 318 281 300 270" stroke="#856333" strokeWidth="4" strokeLinecap="round" />
              </g>

              <g className="yard-spray" fill="none" stroke="#dffcff" strokeLinecap="round">
                <path d="M210 326 C173 270 128 244 67 239" strokeWidth="1.8" />
                <path d="M210 326 C248 266 294 235 358 226" strokeWidth="1.8" />
                <path d="M210 326 C203 274 205 233 219 190" strokeWidth="1.2" opacity="0.66" />
              </g>
              <g className="yard-drops">
                {Array.from({ length: 20 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={74 + (i * 37) % 270}
                    cy={202 + (i * 23) % 88}
                    r={i % 4 === 0 ? 2 : 1.2}
                    fill="#e7fbff"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </g>

              <rect className="yard-sweep" x="34" y="128" width="350" height="270" fill="#d8b76a" opacity="0.08" />
              <circle className="yard-sun" cx="326" cy="158" r="44" fill="url(#yardGlow)" />
            </svg>
            <div className="hero-decal-glow" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#d8b76a]">
                  VIRENZA Standard
                </p>
                <p className="mt-5 text-4xl font-black leading-none text-white">
                  Clean installs. Precise irrigation. Quiet luxury.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-[#d8b76a]/45 bg-black/18 px-1 pt-5">
                <div className="border-l-2 border-[#d8b76a] pl-4">
                  <p className="text-5xl font-black leading-none text-[#f0cf81] drop-shadow-[0_0_18px_rgba(216,183,106,0.22)]">24h</p>
                  <p className="mt-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/62">
                    Response
                  </p>
                </div>
                <div className="border-l-2 border-[#d8b76a] pl-4">
                  <p className="text-5xl font-black leading-none text-[#f0cf81] drop-shadow-[0_0_18px_rgba(216,183,106,0.22)]">AZ</p>
                  <p className="mt-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/62">
                    Climate Built
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
