import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility | VIRENZA",
  description: "Accessibility statement for the VIRENZA Landscape Solutions website.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      intro="VIRENZA wants this website to be usable by as many people as possible, including visitors using keyboards, screen readers, mobile devices, and assistive technologies."
      sections={[
        {
          title: "Our Approach",
          body: [
            "We aim to use readable contrast, clear labels, keyboard-friendly controls, meaningful headings, accessible form messages, and responsive layouts.",
            "The website is reviewed as it changes, especially around quote forms, navigation, and interactive tools.",
          ],
        },
        {
          title: "Known Limits",
          body: [
            "Some visual animations, third-party tools, maps, or browser-generated experiences may not be perfect for every device or assistive technology.",
            "We continue to improve the site and prioritize changes that help customers contact us and understand our services.",
          ],
        },
        {
          title: "Need Help?",
          body: [
            "If you have trouble using this website, call 602-435-4418 or email veilllc0555@gmail.com. Please tell us what page you were using and what problem you experienced.",
            "We can provide service information, quote help, or scheduling support by phone or email.",
          ],
        },
      ]}
    />
  );
}
