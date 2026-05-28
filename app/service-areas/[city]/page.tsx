import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getServiceArea, serviceAreas } from "@/lib/serviceAreas";

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const area = getServiceArea(params.city);
  if (!area) {
    return {
      title: "Service Area | VIRENZA",
    };
  }

  return {
    title: `${area.name} Landscaping & Irrigation | VIRENZA`,
    description: area.description,
  };
}

export default function ServiceAreaPage({ params }: { params: { city: string } }) {
  const area = getServiceArea(params.city) ?? serviceAreas[0];

  return (
    <>
      <Nav />
      <main className="bg-[#0a0a0a] px-6 pb-20 pt-36 text-white md:pb-28 md:pt-44">
        <article className="mx-auto max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d8b76a]">
            Service Area
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {area.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/58 md:text-lg">
            {area.description}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Irrigation Repair", "Leaks, broken valves, drip lines, controllers, and dry zones."],
              ["HOA Cleanup", "Weeds, overgrowth, debris, dead plants, edges, and curb appeal."],
              ["Landscape Refresh", "Rock, gravel, planting, turf edges, xeriscape updates, and finish work."],
            ].map(([title, body]) => (
              <section key={title} className="border border-white/10 bg-[#10120f] p-6">
                <h2 className="text-lg font-black text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/50">{body}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 border border-[#d8b76a]/25 bg-[#d8b76a]/10 p-8">
            <h2 className="text-2xl font-black text-white">Need help in {area.name}?</h2>
            <p className="mt-3 text-sm leading-7 text-white/56">
              Send a quote request with a few photos and we will help you decide the fastest path to a clean, HOA-ready yard.
            </p>
            <Link
              href="/#quote"
              className="mt-6 inline-flex bg-[#d8b76a] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#f0cf81]"
            >
              Request a Quote
            </Link>
          </div>
        </article>
      </main>
      <div className="relative z-10 bg-[#0a0a0a]">
        <Footer />
      </div>
    </>
  );
}
