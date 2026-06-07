import Image from "next/image";

const FALLBACK_IMAGE = "/images/virenza-before-after.png";

const filters = [
  { id: "all", label: "All" },
  { id: "irrigation-repair", label: "Irrigation Repair" },
  { id: "yard-cleanup-landscaping", label: "Yard Cleanup + Landscaping" },
  { id: "landscaping", label: "Landscaping" },
  { id: "hoa-rescue", label: "HOA Rescue" },
  { id: "artificial-turf", label: "Artificial Turf" },
] as const;

type Filter = (typeof filters)[number];
type FilterId = Filter["id"];
type ProjectType = Exclude<Filter["label"], "All">;

type ImagePanel = {
  label: string;
  position?: string;
  scale?: number;
  image?: string;
};

type Project = {
  id: number;
  title: string;
  type: ProjectType;
  filterId: Exclude<FilterId, "all">;
  before?: ImagePanel;
  after?: ImagePanel;
};

const fallbackPanel: Required<ImagePanel> = {
  label: "Transformation in progress",
  position: "50% 35%",
  scale: 1.75,
  image: FALLBACK_IMAGE,
};

const projects: Project[] = [
  {
    id: 1,
    title: "Scottsdale Backyard Overhaul",
    type: "Landscaping",
    filterId: "landscaping",
    before: { label: "Dead grass, overgrown weeds", position: "21% 30%", scale: 1.75 },
    after: { label: "Lush sod, clean borders", position: "76% 30%", scale: 1.75 },
  },
  {
    id: 2,
    title: "Irrigation System Rescue",
    type: "Irrigation Repair",
    filterId: "irrigation-repair",
    before: { label: "3 broken valves, flooded patches", position: "41% 29%", scale: 2.4 },
    after: { label: "Full system restored", position: "67% 30%", scale: 2.55 },
  },
  {
    id: 3,
    title: "Phoenix Front Yard",
    type: "Yard Cleanup + Landscaping",
    filterId: "yard-cleanup-landscaping",
    before: { label: "Overgrown desert scrub", position: "34% 31%", scale: 2.35 },
    after: { label: "Modern desert xeriscape", position: "73% 34%", scale: 2.35 },
  },
  {
    id: 4,
    title: "HOA Notice Turnaround",
    type: "HOA Rescue",
    filterId: "hoa-rescue",
    before: { label: "Weeds, debris, dead shrubs", position: "18% 36%", scale: 2.35 },
    after: { label: "Clean, compliant frontage", position: "86% 33%", scale: 2.35 },
  },
  {
    id: 5,
    title: "Artificial Turf Refresh",
    type: "Artificial Turf",
    filterId: "artificial-turf",
    before: { label: "Patchy grass, dusty edges", position: "29% 40%", scale: 2.45 },
    after: { label: "Tidy turf and sharp borders", position: "72% 40%", scale: 2.45 },
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 8,   suffix: " yrs", label: "In Business" },
  { value: 4.9, suffix: "★",  label: "Average Rating", isDecimal: true },
  { value: 100, suffix: "%",  label: "Licensed & Insured" },
];

const safeProjects = projects.filter((project) => {
  if (!project?.id || !project.title || !project.type || !project.filterId) return false;
  return filters.some((filter) => filter.id === project.filterId);
});

const filterStyles = filters
  .map((filter) => {
    const hasProjects =
      filter.id === "all" ||
      safeProjects.some((project) => project.filterId === filter.id);
    const hideCards =
      filter.id === "all"
        ? ""
        : `
          #filter-${filter.id}:checked ~ .project-grid .project-card:not([data-filter="${filter.id}"]) {
            display: none;
          }
        `;
    const emptyState = `
      #filter-${filter.id}:checked ~ .project-empty-state {
        display: ${hasProjects ? "none" : "block"};
      }
    `;

    return `
      #filter-${filter.id}:checked ~ .filter-controls label[for="filter-${filter.id}"] {
        border-color: #d8b76a;
        background: #d8b76a;
        color: #000;
      }
      ${hideCards}
      ${emptyState}
    `;
  })
  .join("\n");

function panelWithFallback(panel: Project["before"]): Required<ImagePanel> {
  const scale =
    typeof panel?.scale === "number" && Number.isFinite(panel.scale)
      ? panel.scale
      : fallbackPanel.scale;

  return {
    label: panel?.label || fallbackPanel.label,
    position: panel?.position || fallbackPanel.position,
    scale,
    image: panel?.image || fallbackPanel.image,
  };
}

export default function BeforeAfter() {
  return (
    <section id="projects" className="bg-[#070807] px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="text-[#d8b76a] text-[11px] font-bold tracking-[0.3em] uppercase">
            Our Work
          </span>
          <h2
            className="mt-3 font-black leading-none text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.8rem)" }}
          >
            Real Transformations
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/46">
            Every project is a before-and-after story. Here are a few of ours.
          </p>
        </div>

        <div className="transformations-filter">
          {filters.map((filter) => (
            <input
              key={filter.id}
              id={`filter-${filter.id}`}
              type="radio"
              name="transformation-filter"
              defaultChecked={filter.id === "all"}
              className="sr-only"
            />
          ))}

          <div className="filter-controls mb-8 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <label
                key={filter.id}
                htmlFor={`filter-${filter.id}`}
                className="cursor-pointer border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/48 transition-colors hover:border-[#d8b76a]/50 hover:text-[#d8b76a]"
              >
                {filter.label}
              </label>
            ))}
          </div>

          {/* Project cards */}
          <div className="project-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {safeProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i} />
            ))}
          </div>

          <div className="project-empty-state hidden border border-[#d8b76a]/20 bg-[#10120f] p-8 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#d8b76a]">
              No Projects Found
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/48">
              There are no transformation cards in this category yet. Select
              another filter to keep browsing VIRENZA project examples.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: filterStyles }} />
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const before = panelWithFallback(project.before);
  const after = panelWithFallback(project.after);
  const title = project.title || "VIRENZA Transformation";
  const type = project.type || "Landscaping";

  return (
    <div
      className={`project-card reveal is-visible d${delay + 1} card-hover overflow-hidden border border-white/10 bg-[#10120f]`}
      data-filter={project.filterId}
    >
      {/* Before / After panels */}
      <div className="relative h-52 sm:h-56">
        <ImagePanelView
          alt={`${title} before landscaping work`}
          className="absolute bottom-0 left-0 top-0 flex w-1/2 items-end overflow-hidden border-r border-black/70 p-3"
          imageClassName="brightness-[0.72] saturate-[0.82]"
          label="Before"
          panel={before}
        />

        {/* Divider */}
        <div className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#d8b76a]/45 bg-[#0e0e0e] shadow-[0_0_22px_rgba(0,0,0,0.55)]">
          <span className="text-xs font-bold text-[#d8b76a]">→</span>
        </div>

        <ImagePanelView
          alt={`${title} after landscaping work`}
          className="absolute bottom-0 right-0 top-0 flex w-1/2 items-end justify-end overflow-hidden p-3"
          imageClassName="brightness-[0.94] saturate-[1.08]"
          label="After"
          labelClassName="ring-[#d8b76a]/20"
          panel={after}
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b76a]">
          {type}
        </p>
        <h3 className="text-base font-bold text-white mb-3">{title}</h3>
        <div className="space-y-1.5">
          <p className="text-xs text-gray-600">
            <span className="text-red-400/60 font-medium">Before:</span>{" "}
            {before.label}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium text-[#d8b76a]/80">After:</span>{" "}
            {after.label}
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d8b76a]/30 to-transparent" />
    </div>
  );
}

function ImagePanelView({
  alt,
  className,
  imageClassName,
  label,
  labelClassName = "ring-white/10",
  panel,
}: {
  alt: string;
  className: string;
  imageClassName: string;
  label: string;
  labelClassName?: string;
  panel: Required<ImagePanel>;
}) {
  return (
    <div className={className}>
      <Image
        src={panel.image}
        alt={alt}
        fill
        sizes="(min-width: 768px) 16vw, 50vw"
        className={`object-cover ${imageClassName}`}
        style={{
          objectPosition: panel.position,
          transform: `scale(${panel.scale})`,
          transformOrigin: panel.position,
        }}
      />
      <span
        className={`relative z-10 rounded-md bg-black/58 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/72 ring-1 ${labelClassName}`}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Animated stat counter ──────────────────────────────────────────────── */

function StatCard({
  value,
  suffix,
  label,
  isDecimal,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
  delay: number;
}) {
  const displayValue = isDecimal ? value.toFixed(1) : String(value);

  return (
    <div
      className={`reveal d${delay + 1} border border-white/10 bg-[#10120f] p-6 text-center`}
    >
      <div className="text-3xl font-black text-[#d8b76a] md:text-4xl">
        <span>{displayValue}</span>
        <span>{suffix}</span>
      </div>
      <div className="mt-1.5 text-xs font-medium text-white/38">{label}</div>
    </div>
  );
}
