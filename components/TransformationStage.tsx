"use client";

import { useEffect, useRef } from "react";

export default function TransformationStage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect reduced-motion — show finished state immediately, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.stage = "3";
      return;
    }

    // No IO support — show finished state immediately
    if (!("IntersectionObserver" in window)) {
      section.dataset.stage = "3";
      return;
    }

    // Start in dead state (animation hasn't played yet)
    section.dataset.stage = "0";

    const timers: ReturnType<typeof setTimeout>[] = [];

    const runAnimation = () => {
      timers.push(setTimeout(() => { section.dataset.stage = "1"; }, 450));
      timers.push(setTimeout(() => { section.dataset.stage = "2"; }, 1450));
      timers.push(setTimeout(() => { section.dataset.stage = "3"; }, 2500));
    };

    // If the section is already in view on load, start immediately
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      runAnimation();
      return () => timers.forEach(clearTimeout);
    }

    // Otherwise wait for the section to scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        runAnimation();
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} id="transformation" className="transformation-stage">
      <div className="stage-sticky">
        <div className="stage-bg" />
        <div className="stage-copy">
          <p className="stage-kicker">Scroll Transformation</p>
          <h2>From Heat Stress to Estate Finish</h2>
          <p>
            A staged look at how irrigation, cleanup, planting, and finish work
            turn an Arizona yard into a polished outdoor space.
          </p>
        </div>

        <div className="stage-visual" aria-hidden="true">
          <svg viewBox="0 0 900 560" className="stage-svg">
            <defs>
              <linearGradient id="stageSky" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#070807" />
                <stop offset="55%" stopColor="#172016" />
                <stop offset="100%" stopColor="#2c2615" />
              </linearGradient>
              <linearGradient id="stageGrass" x1="0" x2="1">
                <stop offset="0%" stopColor="#14301b" />
                <stop offset="54%" stopColor="#2f6739" />
                <stop offset="100%" stopColor="#17331f" />
              </linearGradient>
            </defs>

            <rect width="900" height="560" fill="url(#stageSky)" />
            <rect className="stage-live-lawn" x="0" y="285" width="900" height="275" fill="url(#stageGrass)" />
            <rect className="stage-dead-lawn" x="0" y="285" width="900" height="275" fill="#4a321a" />

            <g className="stage-home">
              <rect x="330" y="165" width="230" height="140" fill="#101910" />
              <polygon points="300,165 445,72 590,165" fill="#070b08" />
              <rect x="410" y="236" width="70" height="69" rx="4" fill="#050605" />
              <rect x="360" y="203" width="48" height="32" rx="3" fill="#27462b" />
              <rect x="496" y="203" width="48" height="32" rx="3" fill="#27462b" />
              <path className="stage-roof-glint" d="M303 166 L445 74 L585 166" fill="none" stroke="#d8b76a" strokeWidth="3" />
            </g>

            <g className="stage-irrigation" fill="none" stroke="#bff8ff" strokeLinecap="round">
              <path d="M450 332 C380 248 308 222 210 218" strokeWidth="2" />
              <path d="M450 332 C526 238 607 208 705 200" strokeWidth="2" />
              <path d="M450 332 C438 260 438 214 450 168" strokeWidth="1.4" />
              {Array.from({ length: 34 }).map((_, i) => (
                <circle
                  key={i}
                  cx={190 + (i * 37) % 540}
                  cy={168 + (i * 29) % 126}
                  r={i % 4 === 0 ? 2.4 : 1.5}
                  fill="#dffcff"
                  opacity="0.72"
                />
              ))}
            </g>

            <g className="stage-plants">
              {[
                [140, 284, 1],
                [230, 276, 0.82],
                [655, 276, 0.94],
                [760, 288, 0.75],
              ].map(([x, y, s], i) => (
                <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
                  <rect x="-7" y="12" width="14" height="48" fill="#553018" />
                  <circle cx="0" cy="0" r="38" fill="#2d6538" />
                  <circle cx="-22" cy="10" r="22" fill="#1e4828" opacity="0.72" />
                  <circle cx="24" cy="12" r="24" fill="#3a7843" opacity="0.72" />
                </g>
              ))}
            </g>

            <g className="stage-dead-plants">
              {[
                [140, 306],
                [230, 296],
                [655, 296],
                [760, 309],
              ].map(([x, y], i) => (
                <g key={i} transform={`translate(${x} ${y})`}>
                  <path d="M0 42 C-8 15 -20 0 -38 -14" stroke="#8a6a37" strokeWidth="7" strokeLinecap="round" />
                  <path d="M0 42 C8 12 24 -2 42 -20" stroke="#7a592a" strokeWidth="7" strokeLinecap="round" />
                  <path d="M0 42 C0 10 -2 -10 -4 -32" stroke="#6d4c21" strokeWidth="6" strokeLinecap="round" />
                </g>
              ))}
            </g>

            <g className="stage-edging" fill="none">
              <path d="M54 430 C220 386 370 404 504 430 C626 454 744 448 846 412" stroke="#d8b76a" strokeWidth="5" />
              <path d="M54 456 C240 414 378 432 510 456 C628 480 746 472 846 438" stroke="#11180f" strokeWidth="26" opacity="0.75" />
            </g>
          </svg>
        </div>

        <div className="stage-steps" aria-hidden="true">
          <span>Assess</span>
          <span>Irrigate</span>
          <span>Restore</span>
          <span>Finish</span>
        </div>
      </div>
    </section>
  );
}
