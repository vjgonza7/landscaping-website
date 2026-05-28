import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

type LegalSection = {
  title: string;
  body: string[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main className="bg-[#0a0a0a] px-6 pb-20 pt-36 text-white md:pb-28 md:pt-44">
        <article className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d8b76a]">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/58 md:text-lg">
            {intro}
          </p>
          <p className="mt-4 text-sm text-white/36">Last updated: May 25, 2026</p>

          <div className="mt-12 space-y-5">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border border-white/10 bg-[#101010] p-6 md:p-8"
              >
                <h2 className="text-xl font-black text-white">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-white/56 md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <div className="relative z-10 bg-[#0a0a0a]">
        <Footer />
      </div>
    </>
  );
}
