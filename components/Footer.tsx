export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] px-6 pt-14 pb-28 md:pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 36 36" className="w-9 h-9 flex-shrink-0" aria-hidden="true">
                <rect width="36" height="36" rx="3" fill="#d8b76a" />
                <path d="M7 8 L18 28 L29 8" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="18" y1="14" x2="18" y2="26" stroke="#31523b" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-black text-sm tracking-[0.20em] uppercase text-white">VIRENZA</span>
                <span className="text-[#d8b76a] text-[8px] font-bold tracking-[0.28em] uppercase">Landscape Solutions</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Arizona&apos;s premier landscaping and irrigation company. Serving Phoenix,
              Scottsdale, Mesa, Tempe, and surrounding areas.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                "Irrigation Repair",
                "Landscaping",
                "Yard Cleanups",
                "Sod Installation",
                "Xeriscape Design",
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+16024354418" className="flex items-center gap-2.5 text-gray-500 hover:text-gray-300 text-sm transition-colors group">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#d8b76a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 3.5C3 3.5 4 2 5.5 2c.5 0 1 .3 1.3.8l1.4 2.5c.3.5.2 1.1-.2 1.5L7 7.8c.7 1.3 1.9 2.5 3.2 3.2l1-.9c.4-.4 1-.5 1.5-.2l2.5 1.4c.5.3.8.8.8 1.3 0 1.5-1.5 2.5-1.5 2.5C8 17.5 2.5 12 3 3.5z" />
                  </svg>
                  602-435-4418
                </a>
              </li>
              <li>
                <a href="mailto:veilllc0555@gmail.com" className="flex items-center gap-2.5 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#d8b76a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="16" height="12" rx="2" />
                    <path d="M2 7l8 5 8-5" />
                  </svg>
                  veilllc0555@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500 text-sm">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#d8b76a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 2C7.2 2 5 4.2 5 7c0 4 5 10 5 10s5-6 5-10c0-2.8-2.2-5-5-5z" />
                  <circle cx="10" cy="7" r="1.5" />
                </svg>
                Phoenix, AZ 85001
              </li>
              <li className="flex items-center gap-2.5 text-gray-600 text-sm pt-1">
                <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v4l2.5 2.5" />
                </svg>
                Mon–Sat: 7am – 6pm
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6">
          <nav aria-label="Footer legal links" className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookie-preferences", label: "Cookie Preferences" },
              { href: "/accessibility", label: "Accessibility" },
              { href: "/security", label: "Security" },
              { href: "/service-areas/phoenix", label: "Service Areas" },
              { href: "/sitemap.xml", label: "Sitemap" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-gray-500 underline-offset-4 transition-colors hover:text-[#d8b76a] hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} VIRENZA Landscaping. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs text-center sm:text-right">
            ROC Licensed · Fully Insured · Serving Greater Phoenix
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
