import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HoaReadinessQuiz from "@/components/HoaReadinessQuiz";
import HoaRescue from "@/components/HoaRescue";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";

export const metadata: Metadata = {
  title: "HOA Readiness Check | VIRENZA Landscape Solutions",
  description:
    "Check if your yard meets HOA standards. VIRENZA can clean up weeds, fix irrigation, replace dead plants, and get your yard compliant fast.",
  robots: { index: false, follow: false },
};

export default function HoaCheckPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="pt-[72px]">
        <div className="bg-[#0a0a0a]">
          <HoaReadinessQuiz />
          <HoaRescue />
          <QuoteForm />
        </div>
      </main>
      <div className="bg-[#0a0a0a]">
        <Footer />
      </div>
      <StickyContactBar />
    </>
  );
}
