import Link from "next/link";

const links = [
  { href: "/?tool=heat-survival#heat-survival", label: "Heat Predictor" },
  { href: "/?tool=hoa-ready#hoa-ready", label: "HOA Check" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
];

export default function Nav() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#070807]/82 shadow-xl shadow-black/25 backdrop-blur-xl"
    >
      <input id="mobile-menu-toggle" type="checkbox" className="peer sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* V-leaf icon */}
          <svg viewBox="0 0 36 36" className="w-9 h-9 flex-shrink-0" aria-hidden="true">
            <rect width="36" height="36" rx="3" fill="#d8b76a" />
            {/* Left V stroke */}
            <path d="M7 8 L18 28 L29 8" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Leaf stem accent */}
            <line x1="18" y1="14" x2="18" y2="26" stroke="#31523b" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-[0.20em] uppercase text-white">
              VIRENZA
            </span>
            <span className="text-[#d8b76a] text-[8px] font-bold tracking-[0.28em] uppercase">
              Landscape Solutions
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/48 transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            className="bg-[#d8b76a] px-5 py-2.5 text-sm font-bold text-black shadow-md shadow-black/30 transition-colors hover:bg-[#f0cf81]"
          >
            Free Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <label
          htmlFor="mobile-menu-toggle"
          className="mobile-menu-button md:hidden flex flex-col gap-[5px] p-1 group cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b76a]"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
          role="button"
          tabIndex={0}
        >
          <span className="block w-6 h-[1.5px] bg-white transition-all duration-300" />
          <span className="block w-4 h-[1.5px] bg-white transition-all duration-300" />
          <span className="block w-6 h-[1.5px] bg-white transition-all duration-300" />
        </label>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="md:hidden overflow-hidden max-h-0 opacity-0 transition-all duration-300 peer-checked:max-h-80 peer-checked:opacity-100"
      >
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#0b0c0a] px-6 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-1 text-sm text-white/58 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            className="mt-1 bg-[#d8b76a] px-5 py-3 text-center text-sm font-bold text-black"
          >
            Free Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
