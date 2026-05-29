"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/?tool=heat-survival#heat-survival", label: "Heat Predictor" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#070807]/82 shadow-xl shadow-black/25 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" onClick={close} className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 36 36" className="w-9 h-9 flex-shrink-0" aria-hidden="true">
            <rect width="36" height="36" rx="3" fill="#d8b76a" />
            <path d="M7 8 L18 28 L29 8" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="18" y1="14" x2="18" y2="26" stroke="#31523b" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-[0.20em] uppercase text-white">VIRENZA</span>
            <span className="text-[#d8b76a] text-[8px] font-bold tracking-[0.28em] uppercase">Landscape Solutions</span>
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
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-button md:hidden flex flex-col gap-[5px] p-1 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b76a]"
        >
          <span
            className="block w-6 h-[1.5px] bg-white transition-all duration-300"
            style={isOpen ? { transform: "translateY(6.5px) rotate(45deg)" } : undefined}
          />
          <span
            className="block h-[1.5px] bg-white transition-all duration-300"
            style={isOpen ? { opacity: 0, width: 0 } : { width: "1rem" }}
          />
          <span
            className="block w-6 h-[1.5px] bg-white transition-all duration-300"
            style={isOpen ? { transform: "translateY(-6.5px) rotate(-45deg)" } : undefined}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#0b0c0a] px-6 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="py-1 text-sm text-white/58 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={close}
            className="mt-1 bg-[#d8b76a] px-5 py-3 text-center text-sm font-bold text-black"
          >
            Free Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
