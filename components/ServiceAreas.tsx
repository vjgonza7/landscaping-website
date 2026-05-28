import { serviceAreas } from "@/lib/serviceAreas";

export default function ServiceAreas() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#d8b76a]">
            Service Areas
          </p>
          <h2
            className="mt-3 font-black leading-none text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
          >
            Greater Phoenix Coverage
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/50">
            City pages help customers and search engines understand where VIRENZA works.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <a
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group border border-white/10 bg-[#10120f] p-6 transition-colors hover:border-[#d8b76a]/45"
            >
              <p className="text-xl font-black text-white">{area.name}</p>
              <p className="mt-3 text-sm leading-7 text-white/48">{area.description}</p>
              <span className="mt-5 inline-flex text-xs font-black uppercase tracking-[0.18em] text-[#d8b76a]">
                View Area →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
