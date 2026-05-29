"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right")
    );
    if (elements.length === 0) return;

    // Pre-mark elements already in the viewport so they never flash invisible
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
    });

    // Activating this attribute makes off-screen elements invisible via CSS
    document.documentElement.setAttribute("data-scroll-ready", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    elements
      .filter((el) => !el.classList.contains("is-visible"))
      .forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute("data-scroll-ready");
    };
  }, []);

  return null;
}
