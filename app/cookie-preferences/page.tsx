import type { Metadata } from "next";
import CookiePreferences from "@/components/CookiePreferences";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Cookie Preferences | VIRENZA",
  description: "Manage cookie and tracking preferences for the VIRENZA website.",
};

export default function CookiePreferencesPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#0a0a0a] px-6 pb-20 pt-36 text-white md:pb-28 md:pt-44">
        <article className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d8b76a]">
            Preferences
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Cookie Preferences
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/58 md:text-lg">
            Choose whether optional analytics or marketing cookies can be used on this device. Essential site cookies and local preferences stay active so the website can function.
          </p>
          <p className="mt-4 text-sm text-white/36">Last updated: May 25, 2026</p>
          <div className="mt-12">
            <CookiePreferences />
          </div>
        </article>
      </main>
      <div className="relative z-10 bg-[#0a0a0a]">
        <Footer />
      </div>
    </>
  );
}
