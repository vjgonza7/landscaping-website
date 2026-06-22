"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const filters = [
  { id: "all", label: "All" },
  { id: "irrigation-repair", label: "Irrigation Repair" },
  { id: "yard-cleanup-landscaping", label: "Yard Cleanup + Landscaping" },
  { id: "landscaping", label: "Landscaping" },
  { id: "hoa-rescue", label: "HOA Rescue" },
  { id: "artificial-turf", label: "Artificial Turf" },
] as const;

type FilterId = (typeof filters)[number]["id"];

type Project = {
  id: number;
  title: string;
  category: string;
  filterId: Exclude<FilterId, "all">;
  description: string;
  before: { image: string; label: string };
  after: { image: string; label: string };
  gallery?: string[];
};

const projects: Project[] = [
  {
    id: 4,
    title: "HOA Notice Turnaround",
    category: "HOA Rescue",
    filterId: "hoa-rescue",
    description:
      "Visible HOA issues cleaned up quickly with weeds, debris, and dead shrubs addressed for a compliant frontage.",
    before: {
      image: "/images/virenza-before-after.png",
      label: "Weeds, debris, dead shrubs",
    },
    after: {
      image: "/images/virenza-before-after.png",
      label: "Clean, compliant frontage",
    },
  },
  {
    id: 3,
    title: "Mature Tree Pruning & Cleanup",
    category: "Yard Cleanup + Landscaping",
    filterId: "yard-cleanup-landscaping",
    description:
      "Large overgrown tree trimmed back from the home and roofline with the front yard cleaned for stronger curb appeal.",
    before: {
      image: "/images/projects/mature-tree-pruning-before.jpg",
      label: "Large overgrown tree shading the home and roofline",
    },
    after: {
      image: "/images/projects/mature-tree-pruning-after.jpg",
      label: "Canopy raised, front yard cleaned, improved curb appeal",
    },
    gallery: [
      "/images/projects/mature-tree-pruning-before.jpg",
      "/images/projects/mature-tree-pruning-after.jpg",
    ],
  },
  {
    id: 1,
    title: "House Yard Cleanup",
    category: "Yard Cleanup + Landscaping",
    filterId: "yard-cleanup-landscaping",
    description:
      "Overgrown shrubs and tangled growth cleared to reveal clean, manicured curb appeal ready for any Arizona neighborhood.",
    before: {
      image: "/images/projects/house-yard-before.jpg",
      label: "Overgrown shrubs, tangled growth",
    },
    after: {
      image: "/images/projects/house-yard-after.jpg",
      label: "Trimmed, clean curb appeal",
    },
    gallery: [
      "/images/house_yard_before_after_actual_vertical.jpg",
      "/images/house_yard_combined.jpg",
    ],
  },
  {
    id: 2,
    title: "Commercial Property Cleanup",
    category: "Yard Cleanup + Landscaping",
    filterId: "yard-cleanup-landscaping",
    description:
      "Heavy perimeter overgrowth cleared from a commercial property. Access lanes restored and boundaries defined with a clean, professional finish.",
    before: {
      image: "/images/projects/commercial-before.jpg",
      label: "Heavy overgrowth along perimeter fence",
    },
    after: {
      image: "/images/projects/commercial-after.jpg",
      label: "Brush cleared, clean access restored",
    },
    gallery: [
      "/images/commercial_5886.jpg",
      "/images/commercial_5904.jpg",
      "/images/commercial_5907.jpg",
      "/images/commercial_5910.jpg",
      "/images/commercial_5915.jpg",
    ],
  },
];

export default function BeforeAfter() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [galleryPhoto, setGalleryPhoto] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) => activeFilter === "all" || p.filterId === activeFilter
  );

  const selectedProject =
    selectedIdx !== null && selectedIdx < filtered.length
      ? filtered[selectedIdx]
      : null;

  const openProject = (idx: number, title: string) => {
    console.log("project clicked", title);
    setSelectedIdx(idx);
    setGalleryPhoto(null);
  };

  const close = useCallback(() => {
    setSelectedIdx(null);
    setGalleryPhoto(null);
  }, []);

  const prev = useCallback(() => {
    setSelectedIdx((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
    setGalleryPhoto(null);
  }, [filtered.length]);

  const next = useCallback(() => {
    setSelectedIdx((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
    setGalleryPhoto(null);
  }, [filtered.length]);

  useEffect(() => {
    if (!selectedProject) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedProject, close, prev, next]);

  return (
    <>
    <section id="projects" className="bg-[#070807] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d8b76a]">
            Our Work
          </span>
          <h2
            className="mt-3 font-black leading-none text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.8rem)" }}
          >
            Real Transformations
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/46">
            Every project is a before-and-after story. Click any card to explore.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                close();
              }}
              className={`border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                activeFilter === filter.id
                  ? "border-[#d8b76a] bg-[#d8b76a] text-black"
                  : "border-white/10 text-white/48 hover:border-[#d8b76a]/50 hover:text-[#d8b76a]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="border border-[#d8b76a]/20 bg-[#10120f] p-8 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#d8b76a]">
              No Projects Found
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/48">
              No projects in this category yet. Select another filter to browse
              VIRENZA examples.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => openProject(i, project.title)}
              />
            ))}
          </div>
        )}
      </div>

    </section>

    {/* Portal: renders directly into document.body, escaping any stacking context */}
    {selectedProject &&
      typeof document !== "undefined" &&
      createPortal(
        <ProjectModal
          project={selectedProject}
          idx={selectedIdx!}
          total={filtered.length}
          galleryPhoto={galleryPhoto}
          onGalleryPhoto={setGalleryPhoto}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />,
        document.body
      )}
    </>
  );
}

/* ── Project Card ──────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full cursor-pointer overflow-hidden border border-white/10 bg-[#10120f] text-left transition-colors duration-300 hover:border-[#d8b76a]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b76a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070807]"
    >
      {/* Image panels */}
      <div className="relative h-52 sm:h-56">
        {/* Before */}
        <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r border-black">
          <Image
            src={project.before.image}
            alt={`${project.title} — before`}
            fill
            sizes="(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover brightness-75 saturate-75 transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-2 left-2 z-10 rounded-sm bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/70 ring-1 ring-white/10">
            Before
          </span>
        </div>

        {/* Divider icon */}
        <div className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#d8b76a]/45 bg-[#0e0e0e] shadow-lg">
          <span className="text-xs font-bold text-[#d8b76a]">→</span>
        </div>

        {/* After */}
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
          <Image
            src={project.after.image}
            alt={`${project.title} — after`}
            fill
            sizes="(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-2 right-2 z-10 rounded-sm bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/70 ring-1 ring-[#d8b76a]/20">
            After
          </span>
        </div>

        {/* Hover overlay — pointer-events-none so it never absorbs clicks meant for the button */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <span className="bg-[#d8b76a] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-lg">
            View Project
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-6">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b76a]">
          {project.category}
        </p>
        <h3 className="mb-3 text-base font-bold text-white">{project.title}</h3>
        <div className="space-y-1">
          <p className="text-xs text-white/30">
            <span className="font-medium text-red-400/60">Before:</span>{" "}
            {project.before.label}
          </p>
          <p className="text-xs text-white/30">
            <span className="font-medium text-[#d8b76a]/70">After:</span>{" "}
            {project.after.label}
          </p>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#d8b76a]/30 to-transparent" />
    </button>
  );
}

/* ── Project Modal / Lightbox ───────────────────────────────────────────────── */

function ProjectModal({
  project,
  idx,
  total,
  galleryPhoto,
  onGalleryPhoto,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  idx: number;
  total: number;
  galleryPhoto: string | null;
  onGalleryPhoto: (src: string | null) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasGallery = (project.gallery?.length ?? 0) > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden border border-[#d8b76a]/20 bg-[#0d0f0c] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/5 px-6 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8b76a]">
              {project.category}
            </p>
            <h3 className="mt-0.5 text-lg font-black text-white">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/25">
              {idx + 1} / {total}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center border border-white/10 text-sm text-white/40 transition-colors hover:border-[#d8b76a]/50 hover:text-[#d8b76a]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">
          {/* Before / After images */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Before */}
            <div className="relative aspect-[4/3]">
              <Image
                src={project.before.image}
                alt={`${project.title} — before`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover brightness-75 saturate-75"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Before
                </span>
                <p className="mt-0.5 text-xs text-white/50">
                  {project.before.label}
                </p>
              </div>
            </div>

            {/* After */}
            <div className="relative aspect-[4/3] border-t border-[#d8b76a]/10 sm:border-l sm:border-t-0">
              <Image
                src={project.after.image}
                alt={`${project.title} — after`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b76a]">
                  After
                </span>
                <p className="mt-0.5 text-xs text-white/50">
                  {project.after.label}
                </p>
              </div>
            </div>
          </div>

          {/* Description + gallery */}
          <div className="px-6 py-5">
            <p className="text-sm leading-7 text-white/55">{project.description}</p>

            {hasGallery && (
              <div className="mt-5">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
                  More Photos
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.gallery!.map((src, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        onGalleryPhoto(galleryPhoto === src ? null : src)
                      }
                      aria-label={`View photo ${i + 1}`}
                      className={`relative h-14 w-20 flex-shrink-0 overflow-hidden border transition-colors ${
                        galleryPhoto === src
                          ? "border-[#d8b76a]"
                          : "border-white/10 hover:border-[#d8b76a]/50"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} photo ${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {galleryPhoto && (
                  <div className="relative mt-3 aspect-video overflow-hidden border border-[#d8b76a]/15">
                    <Image
                      src={galleryPhoto}
                      alt={`${project.title} expanded photo`}
                      fill
                      sizes="(min-width: 1024px) 800px, 100vw"
                      className="object-cover"
                    />
                    <button
                      onClick={() => onGalleryPhoto(null)}
                      aria-label="Close photo"
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center bg-black/60 text-[10px] text-white/60 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer navigation */}
        <div className="flex flex-shrink-0 items-center justify-between border-t border-white/5 px-6 py-4">
          <button
            onClick={onPrev}
            disabled={total <= 1}
            className="flex items-center gap-2 border border-white/10 px-5 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white/40 transition-colors hover:border-[#d8b76a]/50 hover:text-[#d8b76a] disabled:cursor-not-allowed disabled:opacity-25"
          >
            ← Prev
          </button>

          <a
            href="#quote"
            onClick={onClose}
            className="bg-[#d8b76a] px-6 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
          >
            Get a Free Quote
          </a>

          <button
            onClick={onNext}
            disabled={total <= 1}
            className="flex items-center gap-2 border border-white/10 px-5 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white/40 transition-colors hover:border-[#d8b76a]/50 hover:text-[#d8b76a] disabled:cursor-not-allowed disabled:opacity-25"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
