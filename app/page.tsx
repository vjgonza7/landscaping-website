import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TransformationStage from "@/components/TransformationStage";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import About from "@/components/About";
import HiddenTools from "@/components/HiddenTools";
import HoaRescue from "@/components/HoaRescue";
import InstantQuoteStarter from "@/components/InstantQuoteStarter";
import QuoteForm from "@/components/QuoteForm";
import ReviewsFaq from "@/components/ReviewsFaq";
import ServiceAreas from "@/components/ServiceAreas";
import StickyContactBar from "@/components/StickyContactBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <div className="relative z-10 bg-[#0a0a0a]">
          <HiddenTools />
          <TransformationStage />
          <Services />
          <HoaRescue />
          <InstantQuoteStarter />
          <BeforeAfter />
          <About />
          <ReviewsFaq />
          <ServiceAreas />
          <QuoteForm />
        </div>
      </main>
      <div className="relative z-10 bg-[#0a0a0a]">
        <Footer />
      </div>
      <StickyContactBar />
    </>
  );
}
