import Image from "next/image";

export default function Transformations() {
  return (
    <section
      id="transformations"
      className="relative overflow-hidden bg-[#070807] px-6 py-20 sm:px-10 md:py-28 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(216,183,106,0.1),transparent_28%),linear-gradient(180deg,#0a0a0a_0%,#071008_52%,#0a0a0a_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-9 max-w-3xl md:mb-12">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#d8b76a]">
            Transformations
          </p>
          <h2 className="mt-4 max-w-4xl text-[2.5rem] font-black leading-[0.95] tracking-normal text-white sm:text-[4rem] lg:text-[5.4rem]">
            Real Curb Appeal. Elevated.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            Clean installs, precise trimming, and Arizona-ready landscapes
            shaped with the polished finish VIRENZA is known for.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#d8b76a]/35 bg-black shadow-[0_34px_90px_rgba(0,0,0,0.55),0_0_44px_rgba(216,183,106,0.09)]">
          <Image
            src="/images/virenza-before-after.png"
            alt="VIRENZA before-and-after landscaping transformation showing elevated Arizona curb appeal"
            width={1536}
            height={1024}
            priority={false}
            sizes="(min-width: 1280px) 1152px, calc(100vw - 48px)"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
